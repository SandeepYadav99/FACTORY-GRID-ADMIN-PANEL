import React, { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import {
  serviceBadgeByUser,
  serviceManufactureAssign,
} from "../../../../../../services/Badge.service";
const initialForm = {
  chooseTopBadge: [],
};
const useAssignBadgeHook = ({ isOpen, handleToggle }) => {
  const [form, setForm] = useState([initialForm]);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [chooseBadges, setChooseBadges] = useState([]);
  const { id } = useParams();
  console.log(form, "Form1");

  useEffect(() => {
    if (!isOpen) {
      setForm([{ chooseTopBadge: [] }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      serviceBadgeByUser({
        id: id,
        row: null,
        order: null,
        query: "",
        query_data: null,
      }).then((res) => {
        if (!res?.error) {
          setChooseBadges(res?.data);
        }
      });
    }
  }, [isOpen]);

  const checkFormValidation = useCallback(() => {
    const errors = {};
    form.forEach((field, index) => {
      if (
        !field.chooseTopBadge ||
        field.chooseTopBadge.length === 0 ||
        field.chooseTopBadge === ""
      ) {
        errors[`chooseTopBadge${index}`] = true;
      } else {
        delete errors[`chooseTopBadge`];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const badgs_id = form?.length > 0 && form?.map((f) => f.chooseTopBadge);
    serviceManufactureAssign({ user_id: id, badges_id: badgs_id }).then(
      (res) => {
        if (!res?.error) {
          handleToggle();
          // window.location.reload();
        }
      }
    );
    setIsSubmitting(false);
  }, [form, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName, index) => {
      let shouldRemoveError = true;
      console.log(index, fieldName, text, "Index");
      const t = [...form];
      if (fieldName === "chooseTopBadge") {
        t[index].chooseTopBadge = text;
        delete errorData[`chooseTopBadge${index}`];
      } else {
        t[fieldName] = text;
      }

      setForm(t);

      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  // const onBlurHandler = useCallback(
  //   (type) => {
  //     if (form?.[type]) {
  //       changeTextData(form?.[type].trim(), type);
  //     }
  //   },
  //   [changeTextData]
  // );
  // const onBlurHandler = useCallback(
  //   (text, fieldName, index) => {
  //     changeTextData(text, fieldName, index);
  //   },
  //   [changeTextData]
  // );

  const addMoreBadge = useCallback(() => {
    setForm([...form, { chooseTopBadge: "" }]);
  }, [form]);

  const deleteBadges = useCallback(
    (index) => {
      if (form.length === 1) {
        return;
      }
      const values = [...form];
      values.splice(index, 1);
      setForm(values);
    },
    [form]
  );

  const handleReset = useCallback(() => {}, []);

  return {
    form,
    addMoreBadge,
    deleteBadges,
    changeTextData,
    handleSubmit,
    chooseBadges,
    errorData,
    handleReset,
  };
};

export default useAssignBadgeHook;

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
  const [fileds, setFileds] = useState([initialForm]);
  const [errorData, setErrorData] = useState({});
  const [chooseBadges, setChooseBadges] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();

  useEffect(() => {
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
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = {};
    fileds.forEach((field, index) => {
      console.log(field, "Filed")
      if (!field.chooseTopBadge || field.chooseTopBadge.length === 0) {
        errors[`chooseTopBadge${index}`] = true;
      } else {
        delete errors[`chooseTopBadge${index}`];
      }
    });
    return errors;
  }, [fileds, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
   
    const badgs_id = fileds?.map((f) => f.chooseTopBadge);
  
    serviceManufactureAssign({ user_id: id, badges_id: badgs_id }).then(
      (res) => {
        if (!res?.error) {
          handleToggle();
        }
      }
    );
    setIsSubmitting(false)
  }, [fileds, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
     await setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, fileds, submitToServer]);

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
      const t = [...fileds];
      if (fieldName === "chooseTopBadge") {
        if(text.length > 0){
          t[index].chooseTopBadge = text;

        }
      } else {
        t[fieldName] = text;
      }

      setFileds(t);

      shouldRemoveError && removeError(fieldName);
    },
    [removeError, fileds, setFileds]
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

  const addMoreBadge = () => {
    setFileds([...fileds, { chooseTopBadge: "" }]);
  };
  const deleteBadges = (index) => {
    if (fileds.length === 1) {
      return;
    }
    const values = [...fileds];
    values.splice(index, 1);
    setFileds(values);
  };

  useEffect(() => {
    if (!isOpen) {
      handleReset();
    }
  }, [isOpen, handleToggle]);

  const handleReset = useCallback(() => {
    setFileds([initialForm]);
    setErrorData({});
  }, [fileds]);

  return {
    fileds,
    addMoreBadge,
    deleteBadges,
    changeTextData,
    handleSubmit,
    chooseBadges,
    errorData
  };
};

export default useAssignBadgeHook;

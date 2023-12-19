/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
// import { isAlphaNumChars, isSpace } from "../libs/RegexUtils";
// import useDebounce from "../../../hooks/DebounceHook";
// import SnackbarUtils from "../../libs/SnackbarUtils";
import Constants from "../../config/constants";
import {
  serviceBadgeCreate,
  serviceBadgeDetail,
  serviceBadgeUpdate,
} from "../../services/Badge.service";
import SnackbarUtils from "../../libs/SnackbarUtils";

// import { serviceGetList } from "../../../services/Common.service";

const initialForm = {
  name: "",
  logo: "",
  apply_to: "",
  logic: "",
};

const useBadgeCreateHook = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);
  const [logos, setLogos] = useState(null);

  const [listData, setListData] = useState({
    ADMIN: [],
    CHAPTERS: [],
    EVENTS: [],
  });

  // useEffect(() => {
  //   "serviceGetList"(["ADMIN", "CHAPTERS", "EVENTS"]).then((res) => {
  //     if (!res.error) {
  //       setListData(res.data);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (empId) {
      serviceBadgeDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;
          console.log(data);
          setForm({
            ...form,
            // id:data._id,
            name: data?.name,
            apply_to: data?.apply_to,
            logic: data?.logic,
            // status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
          setLogos(data?.logo);
        } else {
          // SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"];
    if (!empId) {
      required.push("logo");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("logo", form.logo || logos);
      formData.append("apply_to", form?.apply_to);
      formData.append("logic", form?.logic);

      const req = empId
        ? serviceBadgeUpdate(formData, formData.append("id", empId))
        : serviceBadgeCreate(formData); //
      const res = await req;

      if (!res.error) {
        handleToggleSidePannel();
        window.location.reload();
      } else {
         SnackbarUtils.error(res.response_message
          );
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, empId, handleToggleSidePannel]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer, empId]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "logo") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
      
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  }, [form]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    listData,
    errorData,
    isEdit,
    handleDelete,
    includeRef,
    handleReset,
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    logos,
  };
};

export default useBadgeCreateHook;

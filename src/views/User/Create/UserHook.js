/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import Constants from "../../../config/constants";

import {
  serviceCreateProviderUser,
  serviceGetProviderUserDetail,
  serviceUpdateProviderUser,
} from "../../../services/ProviderUser.service";

const initialForm = {
  name: "",
  image: "",
  contact: "",
  email: "",
  role: "",
  type: "",
  employee_id: "",
  // status: true,
};

const useUserHook = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
  openWorkProfileTab,
}) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);

  const [document, setDocument] = useState(null);
  const [listData, setListData] = useState({
    ADMIN: [],
    CHAPTERS: [],
    EVENTS: [],
  });

  //   useEffect(() => {
  //     serviceGetList(["ADMIN", "CHAPTERS", "EVENTS"]).then((res) => {
  //       if (!res.error) {
  //         setListData(res.data);
  //       }
  //     });
  //   }, []);

  useEffect(() => {
    if (empId) {
      serviceGetProviderUserDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          console.log(data);
          setForm({
            ...form,

            // document: data.document,
            status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          });
          setDocument(data?.document);
        } else {
          SnackbarUtils.error(res?.message);
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
    let required = [
      "name",
      "image",
      "email",
      "contact",
      "role",
   
    ];

   
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

  // const submitToServer = useCallback(async () => {
  //   if (isSubmitting) {
  //     return;
  //   }

  //   setIsSubmitting(true);

  //   try {
  //     const formData = new FormData();

  //     Object.keys(form).forEach((key) => {
  //       if (key !== "document") {
  //         formData.append(
  //           key,
  //           key === "status" ? (form[key] ? "ACTIVE" : "INACTIVE") : form[key]
  //         );
  //       }
  //     });

  //     if (form.document) {
  //       formData.append("document", form?.document);
  //     }

  //     if (empId) {
  //       formData.append("id", empId);
  //     }

  //     const req = empId
  //       ? serviceUpdateProviderUser(formData)
  //       : serviceCreateProviderUser(formData);
  //     const res = await req;

  //     if (!res.error) {
  //       handleToggleSidePannel();
  //       // window.location.reload();
  //     } else {
  //       SnackbarUtils.error(res.message);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }, [
  //   form,
  //   isSubmitting,
  //   setIsSubmitting,
  //   empId,
  //   handleToggleSidePannel,
  //   openWorkProfileTab,
  // ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      //  await submitToServer();
    }
    console.log(form, "Form")
  openWorkProfileTab(form);
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,

    openWorkProfileTab,
  ]);

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
      if (fieldName === "policy_title") {
        // if (!text || (isAlphaNumChars(text) && text.toString().length <= 30)) {
        //   t[fieldName] = text;
        // }
      } else if (fieldName === "code") {
        // if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
        //   t[fieldName] = text.toUpperCase();
        // }
        shouldRemoveError = false;
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
    //checkCodeValidation as dependescy
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
    document,
  };
};

export default useUserHook;

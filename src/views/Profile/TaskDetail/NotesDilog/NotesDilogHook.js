import React, { useCallback, useEffect, useState } from "react";
import { serviceTaskManagementCreate } from "../../../../services/ProviderUser.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import {
  serviceTaskMnagmentNotesCreate,
  serviceTaskMnagmentNotesList,
} from "../../../../services/TaskManage.service";
import { useLocation } from "react-router-dom";

const initialForm = {
  descriptions: "",
};
const useNotesDilogHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [noteDetails, setNoteDetail] = useState(null);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp]
  );

  useEffect(() => {
    handleReset();
  }, [isAcceptPopUp]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      serviceTaskMnagmentNotesList({
        task_id: id ? id : "",
        index: 1,
        row: null,
        order: null,
        query: "",
        query_data: null,
      }).then((res) => {
        if (!res.error) {
          setNoteDetail(res.data);
        } else {
          SnackbarUtils.error(res.message);
        }
      });
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [id]);

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
      if (fieldName === "descriptions") {
        t[fieldName] = text.replace(/^\s+/, "");
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["descriptions"];
    const maxLength = 500;

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0) ||
        form?.[val]?.length > maxLength
      ) {
        errors[val] = true;
      }
    });

    if (form?.descriptions?.length > maxLength) {
      SnackbarUtils.error("Max 500 Characters");
    }
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
    const updateData = {
      title: form?.descriptions,
      task_id: id,
    };

    try {
      const req = serviceTaskMnagmentNotesCreate; // empId ? serviceHubMasterUpdate :
      const res = await req(updateData);
      if (!res.error) {
        serviceTaskMnagmentNotesList({
          task_id: id ? id : "",
          index: 1,
          row: null,
          order: null,
          query: "",
          query_data: null,
        }).then((res) => {
          if (!res.error) {
            setNoteDetail(res.data);
            toggleAcceptDialog();
          } else {
            SnackbarUtils.error(res.message);
          }
        });
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, isAcceptPopUp, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors)?.length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });

    setErrorData({});
  }, [form, setForm, setErrorData]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, errorData, setErrorData]
  );
  console.log(errorData, "Error Data ");
  return {
    form,
    toggleAcceptDialog,
    isAcceptPopUp,
    changeTextData,
    handleSubmit,
    noteDetails,
    errorData,
    onBlurHandler,
  };
};

export default useNotesDilogHook;

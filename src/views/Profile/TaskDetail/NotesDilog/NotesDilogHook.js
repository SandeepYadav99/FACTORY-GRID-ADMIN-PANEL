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

  useEffect(()=>{
    handleReset()
  },[toggleAcceptDialog, isAcceptPopUp])
  
  useEffect(() => {
    serviceTaskMnagmentNotesList({
      task_id: id ? id : "",
      index: 1,
      row: null,
      order: null,
      query: "",
      query_data: null,
    }).then((res) => {
      if (!res.error) {
        setNoteDetail(res.data)
      } else {
        SnackbarUtils.error(res.message);
      }
    });
  }, [id, isAcceptPopUp]);

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
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["descriptions"];
    required.forEach((val) => {
      if (["code"].indexOf(val) < 0) {
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
    const updateData = {
      title: form?.descriptions,
      task_id: id,
    };

    try {
      const req = serviceTaskMnagmentNotesCreate; // empId ? serviceHubMasterUpdate :
      const res = await req(updateData);
      if (!res.error) {
        toggleAcceptDialog()
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, isAcceptPopUp]);

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

  return {
    form,
    toggleAcceptDialog,
    isAcceptPopUp,
    changeTextData,
    handleSubmit,
    noteDetails
  };
};

export default useNotesDilogHook;

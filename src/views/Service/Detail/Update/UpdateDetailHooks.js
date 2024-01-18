/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import {
  serviceServiceCreate,
  serviceDetail,
  serviceServiceUpdate,
} from "../../../../services/Service.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import { actionFetchService } from "../../../../actions/Service.action";
import { useLocation } from "react-router-dom";
const initialForm = {
  name: "",
  logo: "",
  apply_to: "",
  description: "",
  priority: "",
  slug: "",
  is_featured: "",
  status:""
};

const useServiceUpdateHook = ({
  handleToggleSidePannel,
  isSidePanel,
  details,
}) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);
  const [logo, setLogo] = useState(null);
  const [selectedValues, setSelectedValues] = useState("");
  const [listData, setListData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // serviceDetail({ id: id }).then((res) => {
    //   if (!res.error) {
    //     const data = res.data;

    setForm({
      ...form,
      name: details?.name,
      apply_to: details?.apply_to,
      description: details?.description,
      priority: details?.priority,
      is_featured: details?.is_featured,
      slug: details?.slug,
      status: details?.status,
      id: details?._id,
    });
    setLogo(details?.logo);
    // } else {
    //   // SnackbarUtils.error(res?.message);
    // }
    // });
  }, [details]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", ...(details?._id ? [] : ["logo"])];
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
  console.log(form, "form");
  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      console.log(formData, "formData");
      // const fields = ["name","slug", "logo", "apply_to", "description", "priority","is_featured"];
      // fields.forEach((field) => {
      //   formData.append(field, form?.[field]);
      // });
      formData.append("name", form?.name);
      formData.append("slug", form?.name);
      formData.append("logo", form?.logo);
      formData.append("apply_to", form?.apply_to);
      formData.append("description", form?.description);
      formData.append("priority", form?.priority);
      formData.append("is_featured", form?.is_featured);
      formData.append("status", form?.status? "ACTIVE" : "INACTIVE");
      formData.append("id", details?._id );
      // const serviceFunction = empId ? serviceServiceUpdate : serviceServiceCreate;
      const serviceFunction = serviceServiceUpdate;
      const res = await serviceFunction(formData);
      if (!res.error) {
        handleToggleSidePannel();
        dispatch(actionFetchService());
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting,  handleToggleSidePannel]);

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
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "logo") {
        t[fieldName] = text;
      } else if (fieldName === "description") {
        t[fieldName] = text;
      } else if (fieldName === "apply_to") {
        t[fieldName] = text;
      } else if (fieldName === "priority") {
        t[fieldName] = text;
      } else if (fieldName === "is_featured") {
        t[fieldName] = text;}
        else if (fieldName === "status") {
          t[fieldName] = text;
        
      } else if (fieldName === "slug") {
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
  }, [form, setForm]);

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
  
    showPasswordCurrent,
    setShowPasswordCurrent,
    logo,
    selectedValues,
  };
};

export default useServiceUpdateHook;

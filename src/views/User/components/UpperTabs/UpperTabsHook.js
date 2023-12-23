/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import Constants from "../../../../config/constants";

import {
  serviceCreateProviderUser,
  serviceGetProviderUserDetail,
  serviceProviderIsExist,
  serviceUpdateProviderUser,
} from "../../../../services/ProviderUser.service";
import useDebounce from "../../../../hooks/DebounceHook";
import { useLocation } from "react-router-dom";
import { serviceProviderUserManager } from "../../../../services/ProviderUser.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import historyUtils from "../../../../libs/history.utils";
import { isEmail } from "../../../../libs/RegexUtils";

const initialForm = {
  name: "",
  image: "",
  contact: "",
  email: "",
  role: "",
  type: "",
  employee_id: "",
  password: "1231231@admin",
  joining_date: "",
  department: "",
  designation: "",
  manager: "",
  // status: true,
};

const useUpperTabsHook = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,

  values,
}) => {
  const [isLoading] = useState(false);
 
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });

  const includeRef = useRef(null);
  const codeDebouncer = useDebounce(form?.email, 500);
  const [image, setImage] = useState(null);
  const [typeOf, setTypeOf] = useState("");// TypeOfTabs
  const [listData, setListData] = useState(null);
  const [value, setValue] = useState(0);
  
  // access query params id in url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    serviceProviderUserManager().then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      serviceGetProviderUserDetail({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
         
          setForm({
            ...form,
            name: data?.name,
             contact: data?.contact,
            email: data?.email,
            role: data?.role,
             employee_id: data?.employee_id,
            password: data?.password,
            joining_date: data?.joining_date,
            department: data?.department,
            designation: data?.designation,
            manager: data?.manager,
          });
          setImage(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    console.log("first");
  }, [typeOf]);

  // const checkCodeValidation = useCallback(() => {
  //   serviceProviderIsExist({ employee_id: form?.email }).then((res) => {
  //     if (!res.error) {
  //       const errors = JSON.parse(JSON.stringify(errorData));
  //       if (res.data.is_exists) {
  //         errors["email"] = "Admin User Email Exists";
  //         setErrorData(errors);
  //       } else {
  //         delete errors.email;
  //         setErrorData(errors);
  //       }
  //     }
  //   });
  // }, [errorData, setErrorData, form?.email]);

  // useEffect(() => {
  //   if (codeDebouncer) {
  //     checkCodeValidation();
  //   }
  // }, [codeDebouncer]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required;
    if (typeOf === "Work") {
      required = ["designation", "joining_date", "department", "manager"];
    } else {
      required = ["name", "email", "contact", "role", ...(id ? [] : ["image"])];
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
      if (form?.email && !isEmail(form?.email)) {
        // errors["email"] = true;
        errors.email = "Invalid email address";
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, setImage, setTypeOf, typeOf]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form?.name);
      formData.append("image", form?.image);
      formData.append("contact", form?.contact);
      formData.append("email", form?.email);
      formData.append("role", form?.role);
      formData.append("password", form?.password);
      formData.append("employee_id", form?.employee_id);
      formData.append("joining_date", form?.joining_date);
      formData.append("department", form?.department);
      formData.append("designation", form?.designation);
      formData.append("manager", form?.manager);
      const req = id
        ? serviceUpdateProviderUser(formData, formData.append("id", id))
        : serviceCreateProviderUser(formData);
      const res = await req;

      if (!res.error) {
        historyUtils.push("/users");
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
    empId,
    handleToggleSidePannel,
    setImage,
    setTypeOf,
  ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      setValue(1);
    }
    console.log(form, "Form");
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
    setImage,
    setValue,
    setTypeOf,
  ]);

  const handleSubmitWorkTab = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      // SnackbarUtils.error("Somthing went worng")
    } else {
      submitToServer();
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
    image,
    setValue,
    setTypeOf,
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
      console.log(text, fieldName, "Form")
      let shouldRemoveError = true;
      const t = { ...form };
      serviceProviderIsExist({ employee_id: form?.email }).then((res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["email"] = "Admin User Email Exists";
            setErrorData(errors);
          } else {
            delete errors.email;
            setErrorData(errors);
          }
        }
      });
      if (fieldName === "code") {
        // if (!text || (!isSpace(text) && isAlphaNumChars(text))) {
        //   t[fieldName] = text.toUpperCase();
        // }
        shouldRemoveError = false;
      } else if (fieldName === "contact") {
        if (text.length <= 10) {
          t[fieldName] = text; // '+91'+
        }
      } else {
        t[fieldName] = text;
      }

      setForm(t);

      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, errorData, handleSubmitWorkTab, setTypeOf]
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
   
    handleDelete,
    includeRef,
    handleReset,
    empId,
 
    document,
    setTypeOf,
    value,
    setValue,
    handleSubmitWorkTab,
    image,
  };
};

export default useUpperTabsHook;

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [typeOf, setTypeOf] = useState(""); // TypeOfTabs
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
            manager: data?.manager?.id,
          });
          setImage(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    setErrorData({});
  }, [value]);



  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required;

    if (value === 0) {
      required = [
        "name",
        "email",
        "contact",
        "role",
        "employee_id",
        ...(id ? [] : ["image"]),
      ];
    } else if (value === 1) {
      required = [
        "name",
        "designation",
        "joining_date",
        "department",
        "manager",
      ];
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
      if (val === "email" && form?.email && !isEmail(form?.email)) {
        errors.email = "Invalid email address";
      }
    
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, setImage, setTypeOf, typeOf, value]);

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
      SnackbarUtils.error("Please enter values");
    } else {
      setValue((prevValue) => {
        if (prevValue === 0) {
          // Only switch to the second tab if currently on the first tab
          return 1;
        }
        return prevValue;
      });
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
    setImage,
    setValue,
    setTypeOf,
  ]);

  const handleSubmitToSave = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
       SnackbarUtils.error("Please enter values");
    } else {
     
      await submitToServer();
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    submitToServer,
    setImage,
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
//  Check input filed is Exit or not 
  const checkIfExists = useCallback(async (field, value, errorMessage) => {
    const { data, error } = await serviceProviderIsExist({
      [field]: value ? value : null,
    });

    if (!error) {
      setForm((prevForm) => {
        const errors = { ...errorData };
        if (data.is_exists) {
          errors[field] = errorMessage;
           SnackbarUtils.error(errorMessage);
        } else {
          delete errors[field];
        }
        setErrorData(errors);

        return {
          ...prevForm,
          [field]: value,
        };
      });
    }
  }, [setForm, errorData, setErrorData, SnackbarUtils]);


  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (
        fieldName === "email" 
      ) {
        checkIfExists(fieldName, text, `Admin User ${fieldName} Exists`);
      }else  if(
        fieldName === "contact" ){
          checkIfExists(fieldName, text, `Admin User ${fieldName} Exists`);
        } else if( fieldName === "contact"){
          checkIfExists(fieldName, text, `Admin User ${fieldName} Exists`);
        }

      if (fieldName === "code") {
        shouldRemoveError = false;
      } else if (fieldName === "contact") {
        if (text >= 0) {
          t[fieldName] = text;
        }
        // '+91'+
      } else {
        t[fieldName] = text;
      }

      setForm(t);

      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, errorData, setTypeOf]
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

    image,
    handleSubmitToSave,
  };
};

export default useUpperTabsHook;

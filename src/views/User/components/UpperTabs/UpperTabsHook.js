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
  const emailDebouncer = useDebounce(form?.email, 600);
  const empIdDebouncer = useDebounce(form?.employee_id, 500);
  const contactDebouncer = useDebounce(form?.contact, 600);
  const [image, setImage] = useState(null);
  const [typeOf, setTypeOf] = useState(""); // TypeOfTabs
  const [listData, setListData] = useState(null);
  const [value, setValue] = useState(0);
  const [isCodeValidated, setIsCodeValidated] = useState(false);
  const [isEmpIdValidated, setIsEmpIdValidated] = useState(false);
  const [isContactValidated, setIsContactValidated] = useState(false);

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

  const checkCodeValidation = useCallback(() => {
    serviceProviderIsExist({ email: form?.email, id: id ? id : null }).then(
      (res) => {
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
      }
    );
  }, [errorData, setErrorData, form?.email, isCodeValidated, id]);

  useEffect(() => {
    if (emailDebouncer) {
      checkCodeValidation();
    }
  }, [emailDebouncer]);

  const checkEmpIdValidation = useCallback(() => {
    serviceProviderIsExist({
      employee_id: form?.employee_id,
      id: id ? id : null,
    }).then((res) => {
      if (!res.error) {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (res.data.is_exists) {
          errors["employee_id"] = "Admin User Employee Id Exists";
          setErrorData(errors);
        } else {
          delete errors.employee_id;
          setErrorData(errors);
        }
      }
    });
  }, [errorData, setErrorData, form?.employee_id, isEmpIdValidated, id]);

  useEffect(() => {
    if (empIdDebouncer) {
      checkEmpIdValidation();
    }
  }, [empIdDebouncer]);

  const checkContactValidation = useCallback(() => {
    serviceProviderIsExist({ contact: form?.contact, id: id ? id : null }).then(
      (res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["contact"] = "Admin User Contact Exists";
            setErrorData(errors);
          } else {
            delete errors.contact;
            setErrorData(errors);
          }
        }
      }
    );
  }, [errorData, setErrorData, form?.contact, isContactValidated, id]);

  useEffect(() => {
    if (contactDebouncer) {
      checkContactValidation();
    }
  }, [contactDebouncer]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required;

    required = [
      "name",
      "email",
      "contact",
      "role",
      "employee_id",
      ...(value === 1
        ? [
            "name",
            "email",
            "contact",
            "role",
            "employee_id",
            "designation",
            "joining_date",
            "department",
            "manager",
          ]
        : []),
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
  console.log(errorData.contact, "ErrorData");
  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log(errors, "Errors");
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      SnackbarUtils.error("Please enter values");
    } else {
      if (
        errorData.contact !== "Admin User Contact Exists" &&
        errorData?.email !== "Admin User Email Exists" &&
        errorData.employee_id !== "Admin User Employee Id Exists"
      ) {
        setValue(1);
      } else {
        SnackbarUtils.error("Please enter valid values");
      }
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

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };

      if (fieldName === "code") {
        shouldRemoveError = false;
      } else if (fieldName === "contact") {
        console.log(text, "Contact");
        // '+91'+
        t[fieldName] = text;
      } else if (fieldName === "email") {
        console.log(text, "Contact");
        // '+91'+
        t[fieldName] = text;
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
  console.log(errorData, "De");
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

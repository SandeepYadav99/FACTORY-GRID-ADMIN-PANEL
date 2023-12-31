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
// import useContactDebounceHook from "../../../../hooks/ContactDebounceHook";

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
  const emailDebouncer = useDebounce(form.email, 500);
  const empIdDebouncer = useDebounce(form.employee_id, 500);
  const contactDebouncer = useDebounce(form.contact, 500);
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

  // useEffect(() => {
  //   setErrorData({});
  // }, []);

  // const validateField = useCallback(
  //   (field, values, errorKey, existsMessage) => {
  //     if (value === 1) return;
  //     serviceProviderIsExist({ [field]: values, id: id || null }).then(
  //       (res) => {
  //         if (!res.error) {
  //           const errors = { ...errorData };
  //           if (res.data.is_exists) {
  //             errors[errorKey] = existsMessage;
  //           } else {
  //             delete errors[errorKey];
  //           }
  //           setErrorData(errors);
  //         }
  //       }
  //     );
  //   },
  //   [errorData, setErrorData, id, value]
  // );

  const checkCodeValidation = useCallback(() => {
    serviceProviderIsExist({ email: form?.email, id: id ? id : null }).then(
      (res) => {
        if (!res.error) {
          const errors = JSON.parse(JSON.stringify(errorData));
          if (res.data.is_exists) {
            errors["email"] = "Email Already  Exists";
            setErrorData(errors);
          } else {
            delete errors.email;
            setErrorData(errors);
          }
        }
      }
    );
  }, [errorData, setErrorData, form?.email, id]);

  useEffect(() => {
    if (emailDebouncer) {
      checkCodeValidation();
    }
  }, [emailDebouncer]);

  // const checkContactValidation = useCallback(() => {
  //   serviceProviderIsExist({contact: form.contact, id: id ? id : null }).then((res) => {
  //       if (!res.error) {
  //           const errors = JSON.parse(JSON.stringify(errorData));
  //           if (res.data.is_exists) {
  //               errors['contact'] = 'Contact Exists'
  //               setErrorData(errors)
  //           } else {
  //               delete errors.contact;
  //               setErrorData(errors);
  //           }
  //       }
  //   });
  // }, [errorData, setErrorData, form.contact, id]);

  // useEffect(() => {
  // if (contactDebouncer) {
  //   checkContactValidation();
  // }
  // }, [contactDebouncer])

  // const checkCodeValidation = useCallback(() => {
  //   validateField("email", form.email, "email", "Admin User Email Exists");
  // }, [form.email, id]);

  // const checkEmpIdValidation = useCallback(() => {
  //   validateField(
  //     "employee_id",
  //     form.employee_id,
  //     "employee_id",
  //     "Admin User Employee Id Exists"
  //   );
  // }, [form.employee_id, id]);

  // const checkContactValidation = useCallback(() => {
  //   validateField("contact", form.contact, "contact", true);
  // }, [form.contact, id]);

  // useEffect(() => {
  //   if (value === 0) {
  //     if (emailDebouncer) checkCodeValidation();
  //   }
  // }, [emailDebouncer, value]);

  // useEffect(() => {
  //   if (value === 0) {
  //     if (empIdDebouncer) checkEmpIdValidation();
  //   }
  // }, [empIdDebouncer, value]);

  // useEffect(() => {
  //   if (value === 0) {
  //     if (contactDebouncer) checkContactValidation();
  //   }
  // }, [contactDebouncer, value]);

  // useEffect(() => {
  //   if (!isSidePanel) {
  //     handleReset();
  //   }
  // }, [isSidePanel]);

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
        ? ["designation", "joining_date", "department", "manager"]
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
      } else if (["email"].indexOf(val) < 0) {
        delete errors[val];
      } else if (["contact"].indexOf(val) < 0) {
        delete errors[val];
      } else if (["employee_id"].indexOf(val) < 0) {
        delete errors[val];
      }
      if (val === "email" && form?.email && !isEmail(form?.email)) {
        errors.email = "Invalid email address";
      }

      console.log(form, "Contact");
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, setImage, value, setErrorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      const fields = [
        "name",
        "image",
        "contact",
        "email",
        "role",
        "password",
        "employee_id",
        "joining_date",
        "department",
        "designation",
        "manager",
      ];

      fields.forEach((field) => {
        formData.append(field, form?.[field]);
      });

      formData.append("id", id || "");

      const serviceFunction = id
        ? serviceUpdateProviderUser
        : serviceCreateProviderUser;

      const res = await serviceFunction(formData);

      if (!res.error) {
        historyUtils.push("/users");
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
      // Handle errors
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, id]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log(errors, "Errors");
  
      if (Object.keys(errors).length > 0) {
        setErrorData(errors);
        SnackbarUtils.error("Please enter values");
      } else {
        setValue(1);
      }
    
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,
    setImage,
    errorData,
  ]);

  const handleSubmitToSave = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      SnackbarUtils.error("Please enter values");
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer, setImage]);

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
        if (text.length > 3) {
          t[fieldName] = text;
        }
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
    [removeError, form, setForm, errorData]
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
  console.log(errorData, "ErrorData");
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

import { useCallback, useEffect, useState } from "react";

import { serviceGetUserBankDetailStatus } from "../../../../../../../services/CustomersRequest.service";
import SnackbarUtils from "../../../../../../../libs/SnackbarUtils";


const initialForm = {
  comment: "",
};
const useBankDetailHook = ({ isOpen, handleToggle, bankId }) => {
  const [form, setForm] = useState(
   {...initialForm}
  );

  const [errorData, setErrorData] = useState({});
 


  const [isSubmitting, setIsSubmitting] = useState(false);


 
  useEffect(() => {
    if (isOpen) {
     
   
      setErrorData({});
    }
  }, [isOpen]);

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
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
   
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
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

  const submitToServer = useCallback(async() => {
    if (!isSubmitting) {
      setIsSubmitting(true);

      const updateData={
        user_id:bankId,
        bank_detail_status:form?.comment
      }
      try {
        const req = serviceGetUserBankDetailStatus
        const res = await req(updateData);
  
        if (!res.error) {
       handleToggle()
         
        
        } else {
          SnackbarUtils.error(res.message);
        }
      } catch (error) {
       
      } finally {
        setIsSubmitting(false);
      }
   
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
  
  };
};

export default useBankDetailHook;

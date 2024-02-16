/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import {
  serviceServiceCreate,
  serviceDetail,

  serviceServiceUpdate,
} from "../../../services/Service.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import { actionFetchService } from "../../../actions/Service.action";

const initialForm = {
  name: "",
  logo: "",
  apply_to: "",
  description: "",
  priority: "",
  slug:"",
  is_featured:"",
  status:""
};



const useServiceCreateHook = ({ handleToggleSidePannel, isSidePanel, empId }) => {
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
    if (empId) {
      serviceDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;

        
        //   description: "",
        //   priority: "",
          setForm({
            ...form,
            name: data?.name,
            apply_to: data?.apply_to,
            logo: data?.logo,
            description: data?.description,
            priority: data?.priority,
            is_featured:data?.is_featured,
            status:data?.status?"ACTIVE":"INACTIVE",
            slug:data?.slug

          });
          setLogo(data?.logo);
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
    let required = ["name", ...(empId ? [] : ["logo"])];
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
console.log(form,"form")
  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      console.log(formData,"formData")
      // const fields = ["name","slug", "logo", "apply_to", "description", "priority","is_featured"];
      // fields.forEach((field) => {
      //   formData.append(field, form?.[field]);
      // });
      formData.append("name", form?.name);
       formData.append("slug", form?.slug);
      formData.append("logo", form?.logo);
      formData.append("apply_to", form?.apply_to);
      formData.append("description", form?.description);
      formData.append("priority", form?.priority);
      formData.append("is_featured", form?.is_featured);
      formData.append("status", form?.status? "ACTIVE" : "INACTIVE");
      formData.append("id", empId);

 
    
      // const serviceFunction = empId ? serviceServiceUpdate : serviceServiceCreate;
             const serviceFunction =  serviceServiceCreate;
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
        t["slug"] = text.toLowerCase().replace(/ /g, "-");
      } else if (fieldName === "logo") {
        t[fieldName] = text;
      } else if (fieldName === "description") {
        t[fieldName] = text;
      } else if (fieldName === "apply_to") {
        t[fieldName] = text;
      } else if (fieldName === "priority") {
        t[fieldName] = text;
      }
      else if (fieldName === "status") {
        t[fieldName] = text;
      }
      else if (fieldName === "is_featured") {
        t[fieldName] = text;
      }
    
      
      else {
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
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    logo,
    selectedValues,
  };
};

export default useServiceCreateHook;

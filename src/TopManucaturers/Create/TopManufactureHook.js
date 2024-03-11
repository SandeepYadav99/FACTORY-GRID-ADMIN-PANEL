/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import {
  serviceBadgeCreate,
  serviceBadgeDetail,
  serviceBadgeIndustry,
  serviceBadgeUpdate,
} from "../../services/Badge.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import { actionFetchBadge } from "../../actions/Badge.action";
import { serviceTopManufactureSearch } from "../../services/TopManufacture.service";

const initialForm = {
  industry: [],
  business_name:[],
  features_on:false,
  features_on_industry:false,
  priority:"",
  priority1:""
};

const useTopManufactureHook = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);
  const [logos, setLogos] = useState(null);
  const [selectedValues, setSelectedValues] = useState("");
  const [listData, setListData] = useState(null);
  const [businessName, setBusinessName]=useState(null);
  const [listIndustryData, setListIndustryData]=useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    serviceBadgeIndustry({ id: empId }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    serviceTopManufactureSearch({ name: form?.business_name ? form?.business_name  : "flipkart"}).then((res) => {
      if (!res.error) {
        setBusinessName(res.data);
      }
    });
  }, []);

  useEffect(() => {
    serviceBadgeIndustry({ id: empId }).then((res) => {
      if (!res.error) {
        setListIndustryData(res.data);
      }
    });
  }, []);
console.log(businessName, "Name")
  useEffect(() => {
    if (empId) {
      serviceBadgeDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;
          setForm({
            ...form,
            name: data?.name,
            apply_to: data?.apply_to,
            logic: data?.logic,
            industry_id: data?.industries?._id,
          });
          setLogos(data?.logo);
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

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      const fields = ["name", "logo", "apply_to", "logic", "industry_id"];
      fields.forEach((field) => {
        formData.append(field, form?.[field]);
      });
      formData.append("id", empId);
      const serviceFunction = empId ? serviceBadgeUpdate : serviceBadgeCreate;
      const res = await serviceFunction(formData);
      if (!res.error) {
        handleToggleSidePannel();
        dispatch(actionFetchBadge());
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
      if (fieldName === "Industry_Specific") {
        setSelectedValues(text);
      }
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "logo") {
        t[fieldName] = text;
      } else if (fieldName === "category") {
        t[fieldName] = text;
      } else if (fieldName === "industry_id") {
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
    empId,
    showPasswordCurrent,
    setShowPasswordCurrent,
    logos,
    selectedValues,
    businessName,
    listIndustryData
  };
};

export default useTopManufactureHook;

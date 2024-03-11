/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import {
  serviceBadgeCreate,
  serviceBadgeDetail,
  serviceBadgeIndustry,
  serviceBadgeUpdate,
} from "../../../services/Badge.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import {
  serviceCreateTopManufacture,
  serviceTopManufactureSearch,
  serviceUpdateTopManufacture,
} from "../../../services/TopManufacture.service";

const initialForm = {
  industry: "",
  business_name: "",
  features_on: false,
  features_on_industry: false,
  priority: "",
  priority1: "",
};

const useTopManufactureHook = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
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
  const [businessName, setBusinessName] = useState(null);
  const [fetchedBusinessName, setFetchedbusinessName] = useState(null);
  const [listIndustryData, setListIndustryData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    serviceBadgeIndustry({ id: empId }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  // useEffect(() => {
  //   setFetchedAssinedUser(profileDetails);
  // }, [fetchedAssignedUser]);
  useEffect(() => {
    if (!isSidePanel) return;
    serviceTopManufactureSearch({
      name: form?.business_name
        ? form?.business_name?.company_name
        : form?.business_name,
      industry_id: form?.industry?.id,
    }).then((res) => {
      if (!res.error) {
        setBusinessName(res.data);
      }
    });
  }, [isSidePanel]);

  useEffect(() => {
    serviceBadgeIndustry({ id: empId }).then((res) => {
      if (!res.error) {
        setListIndustryData(res.data);
      }
    });
  }, []);

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
    let required = ["industry"];
  
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
    const industryID =
      Array.isArray(form.industry) && form.industry.length > 0
        ? form.industry.map((item) => item.id || item._id)
        : [];

    try {
      const formData = {
        industry_id: form?.industry?.id,
        business_id: "65709e782460477a596cc512",
        // business_name:form?.business_name,
        home_priority: form?.priority,
        industry_priority: form?.priority1,
        is_featured_home: form?.features_on,
        is_featured_industry: form?.features_on_industry,
      };
      const serviceFunction = empId
        ? serviceUpdateTopManufacture
        : serviceCreateTopManufacture;
      const res = await serviceFunction(formData);
      if (!res.error) {
        handleToggleSidePannel();
        // dispatch(actionFetchBadge());
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
      if (fieldName === "Ind") {
        setSelectedValues(text);
      }
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "industry") {
        console.log(text, "Industry");
        t[fieldName] = text;
        // t[fieldName] = text?.filter((item, index, self) => {
        //   return  index === self.findIndex((i) => i.id === item.id && i._id === item._id)

        // });
      } else if (fieldName === "business_name") {
        t[fieldName] = text;
      } else if (fieldName === "features_on") {
        t[fieldName] = text;
      } else if (fieldName === "features_on_industry") {
        t[fieldName] = text;
      } else if (fieldName === "priority") {
        t[fieldName] = text;
      } else if (fieldName === "priority1") {
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
    listIndustryData,
  };
};

export default useTopManufactureHook;

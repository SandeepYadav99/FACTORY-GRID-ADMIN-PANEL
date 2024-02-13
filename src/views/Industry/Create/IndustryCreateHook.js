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
import { actionFetchBadge } from "../../../actions/Badge.action";

const initialForm = {
    _id: "",
    is_featured: false,
    is_kyc: false,
    status: "ACTIVE",
    name: "",
    description: "",
    slug: "",
    createdAt: "",
    logo: "", 
    banner: "", 
    total_categories: 0,
    tags: [],
    kyc: [],
};

const useIndustryCreateHook = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading] = useState(false);

  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);

 
  const [coming_soon, setComingSoon] = useState(false);
  const [type, setType] = useState("GENERAL");

  const [included, setIncluded] = useState(null);
  const [questionnaire, setQuestionnaire] = useState([]);

  const [is_kyc, setIsKyc] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [listData, setListData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    serviceBadgeIndustry({ id: empId }).then((res) => {
      if (!res.error) {
        setListData(res.data);
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
           
          });
      
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
      const fields = ["name", ];
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
    questionnaire
  };
};

export default useIndustryCreateHook;

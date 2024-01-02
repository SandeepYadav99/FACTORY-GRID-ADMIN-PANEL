/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import {
  serviceBadgeCreate,
  serviceBadgeDetail,
  serviceBadgeIndustry,
  serviceBadgeUpdate,
} from "../../../services/Badge.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { serviceHubMasterCreate, serviceHubMasterDetail, serviceHubMasterUpdate } from "../../../services/HubMaster.service";

const initialForm = {
  name: "",
  geofence:"",
  industry_id: "",
  featured:false
};

const useHubMasterCreateHook = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const [isLoading] = useState(false);
  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit] = useState(false);
  const includeRef = useRef(null);
  const [logos, setLogos] = useState(null);
  const [selectedValues, setSelectedValues] = useState("");
  const [geofence, setGeoFence] = useState([
   
]);
  const [listData, setListData] = useState(null);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  useEffect(() => {
    serviceBadgeIndustry({ id: empId }).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (empId) {
      serviceHubMasterDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;

          setForm({
            ...form,
           
            name: data?.name,
         
            industry_id: data?.industries?._id,
            featured:data?.featured,
            geofence:data?.geofence
            // status: data?.status === Constants.GENERAL_STATUS.ACTIVE,
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

  const handleCoordinate = useCallback(
    (data) => {
   
      setGeoFence([0,0]);
  
    },
    [ setGeoFence]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"];

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

  const submitToServer = useCallback( () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const updateData ={
      name:form?.name,
      industry_id:form?.industry_id,
      geofence:"geofence",
      featured:form?.featured
    }
    if (empId) {
      updateData.id = empId 
    }

    const req = empId
      ? serviceHubMasterUpdate(updateData)
      : serviceHubMasterCreate(updateData); //
    const res =  req;

    if (!res.error) {
      handleToggleSidePannel();
      // window.location.reload();
    } else {
      SnackbarUtils.error(res.response_message);
    }

    setIsSubmitting(false);
  }, [form, isSubmitting, setIsSubmitting, empId, handleToggleSidePannel]);

  const handleSubmit = useCallback( () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
       submitToServer();
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
    geofence,
    setGeoFence,
    handleCoordinate
  };
};

export default useHubMasterCreateHook;

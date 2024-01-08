/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect,  useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceHubMasterCreate,
  serviceHubMasterDetail,
  serviceHubMasterUpdate,
} from "../../../services/HubMaster.service";
import constants from "../../../config/constants";
import { useDispatch } from "react-redux";
import {
  actionDeleteMasterDelete,
  actionFetchHubMaster,
} from "../../../actions/HubMaster.action";

const initialForm = {
  name: "",
  geofence: "",
  industry_id: [],
  featured: false,
  status: false,
};

const useAddTaskCreate = ({ handleSideToggle, isSidePanel, empId }) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [geofenceCoordinates, setGeofenceCoordinates] = useState([]);
  const [listData, setListData] = useState(null);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const dispatch = useDispatch();



  useEffect(() => {
    if (empId) {
      serviceHubMasterDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;
          
          setForm({
            ...form,
            name: data?.name,
            industry_id: data?.industryData,
            featured: data?.featured === "YES",
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
          setGeofenceCoordinates(data?.geofence);
        } else {
          setGeofenceCoordinates([]);
        }
      });
    }
  }, [empId]);


  
  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }  
  }, [handleSideToggle,  isSidePanel]);

  
  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp, empId]
  );

  
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "industry_id"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
        SnackbarUtils.error("Please enter values")
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
      Array.isArray(form.industry_id) && form.industry_id.length > 0
        ? form.industry_id.map((item) => item.id || item._id)
        : [];

    const updateData = {
      name: form?.name,
      industry_id: industryID,
      geofence: geofenceCoordinates, // ? geofenceCoordinates : []
      featured: form?.featured ? "YES" : "NO",
      status: form?.status ? "ACTIVE" : "INACTIVE",
    };

    if (empId) {
      updateData.id = empId;
    }

    try {
      const req = empId ? serviceHubMasterUpdate : serviceHubMasterCreate;
      const res = await req(updateData);

      if (!res.error) {
        handleSideToggle();
        dispatch(actionFetchHubMaster(1));
        //window.location.reload();
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
    handleSideToggle,
    geofenceCoordinates,
    dispatch,
  ]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    submitToServer,
    empId,
    errorData,
    geofenceCoordinates,
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
      console.log(text, "Text")
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "industry_id") {
        
        t[fieldName] = text?.filter((item, index, self) => {
          return  index === self.findIndex((i) => i.id === item.id && i._id === item._id)
          
        });
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, listData]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, errorData, setErrorData]
  );

  const suspendItem = useCallback(async () => {
    dispatch(actionDeleteMasterDelete(empId));
    dispatch(actionFetchHubMaster(1));
    handleSideToggle();
    setIsAcceptPopUp((e) => !e);
  }, [empId,  isAcceptPopUp, dispatch]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
  
    setErrorData({});
  }, [form, setForm,  setErrorData]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    listData,
    errorData,
    handleReset,
    empId,
    geofenceCoordinates,
    setGeofenceCoordinates,
   
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
  };
};

export default useAddTaskCreate;

/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect,  useState } from "react";
import { serviceBadgeIndustry } from "../../../services/Badge.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceMilestoneCreate,
  serviceMilestoneDetail,
  serviceMilestoneUpdate,
} from "../../../services/MileStone.service";
import constants from "../../../config/constants";
import { useDispatch } from "react-redux";
import {
  actionDeleteMasterDelete,
  actionFetchMilestone,
} from "../../../actions/Milestone.action";

const initialForm = {
  name: "",
  title: "",
  description: "",
  form_action:[],
  manufacturer_action:[],
  industry_id: [],
  is_publically: false,
  status: false,

};

const useMILESTONECreateHook = ({ handleSideToggle, isSidePanel, empId }) => {
  const [errorData, setErrorData] = useState({});
  const [state, setState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [geofenceCoordinates, setGeofenceCoordinates] = useState([]);
  const [listData, setListData] = useState(null);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
   const [questionnaire, setQuestionnaire] = useState([]);
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
      serviceMilestoneDetail({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;
          
          setForm({
            ...form,
            name: data?.name,
            description: data?.description,
            title: data?.title,
            industry_id: data?.industryData,
            questionnaire: data?.form_action,
            // questionnaire: data?.manufacturer_action,
            is_publically: data?.is_publically === true,
            status: data?.status === constants.GENERAL_STATUS.ACTIVE,
          });
        
        } 
      });
    }
  }, [empId, listData]);


  
  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }  
  }, [handleSideToggle,  isSidePanel]);

  const handleCoordinate = useCallback(
    (data) => {
      setGeofenceCoordinates(data);
    },
    [geofenceCoordinates]
  );
  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp, empId]
  );

  const handleQuestionnaire = useCallback(
    (data) => {
      setQuestionnaire(data)
      if (!isSidePanel) {
        handleReset();
      } 
     
    },[setQuestionnaire,isSidePanel]
   
  );
  
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "industry_id","title","description"];
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
      title: form?.title,
      description: form?.description,
      industry_id: industryID,
      form_action:questionnaire ? questionnaire :"",
      manufacturer_action: form?.manufacturer_action,
      is_publically: form?.is_publically ? true : false,
      status: form?.status ? "ACTIVE" : "INACTIVE",
    };

    if (empId) {
      updateData.id = empId;
    }

    try {
      const req = empId ? serviceMilestoneUpdate : serviceMilestoneCreate;
      const res = await req(updateData);

      if (!res.error) {
        handleSideToggle();
        dispatch(actionFetchMilestone(1));
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

      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      }else if (fieldName === "title") {
        t[fieldName] = text;
      } 
      else if (fieldName === "description") {
        t[fieldName] = text;
      } 
      else if (fieldName === "form_action") {
        t[fieldName] = text;
      } 
     else if (fieldName === "manufacturer_action") {
        t[fieldName] = text;
      } 
      else if (fieldName === "questionnaire") {
        t[fieldName] = text;
        console.log(text,"text")
      } 
      
       else if (fieldName === "industry_id") {
     
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
    dispatch(actionFetchMilestone(1));
    handleSideToggle();
    setIsAcceptPopUp((e) => !e);
  }, [empId, handleCoordinate, isAcceptPopUp, dispatch]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setGeofenceCoordinates([]);
    setErrorData({});
  }, [form, setForm, geofenceCoordinates, setErrorData]);

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
    handleCoordinate,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
    questionnaire,
    handleQuestionnaire
  };
};

export default useMILESTONECreateHook;

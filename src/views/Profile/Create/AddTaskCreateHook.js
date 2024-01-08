/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
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
import {
  serviceProviderUserManager,
  serviceTaskManagementCreate,
} from "../../../services/ProviderUser.service";

const initialForm = {
  title: "",
  description: "",
  due_date: "",
  category: [],
  type: "",
  priority: "",
  associated_user: "",
  associated_task: "",
  // comment:"",
  // status: true,
  assigned_to: "",
};

const useAddTaskCreate = ({ handleSideToggle, isSidePanel, empId }) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [geofenceCoordinates, setGeofenceCoordinates] = useState([]);
  const [listData, setListData] = useState(null);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    serviceProviderUserManager().then((res) => {
      if (!res.error) {
        setListData(res.data);
        setFilteredUsers(res.data);
      }
    });
  }, []);

  const handleSearchUsers = useCallback(
    (searchText) => {
      if (!searchText) {
        setFilteredUsers(listData);
      } else {
        const filtered = listData.filter((user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filtered);
      }
    },
    [listData]
  );
  // useEffect(() => {
  //   if (empId) {
  //     serviceHubMasterDetail({ id: empId }).then((res) => {
  //       if (!res.error) {
  //         const data = res.data;

  //         setForm({
  //           ...form,
  //           name: data?.name,
  //           industry_id: data?.industryData,
  //           featured: data?.featured === "YES",
  //           status: data?.status === constants.GENERAL_STATUS.ACTIVE,
  //         });
  //         setGeofenceCoordinates(data?.geofence);
  //       } else {
  //         setGeofenceCoordinates([]);
  //       }
  //     });
  //   }
  // }, [empId]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [handleSideToggle, isSidePanel]);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp, empId]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["assigned_to", "type", "title", "description", "priority", "due_date", "category"]; // "name", "description", "due_date", "task_type", "comment"
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
        SnackbarUtils.error("Please enter values");
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
      Array.isArray(form.category) && form.category.length > 0
        ? form.category.map((item) => item.id || item._id)
        : [];

    const updateData = {
      title: form?.title,
      description: form?.description,
      due_date: form?.due_date,
      category: industryID,
      type: form?.type,
      priority: form?.priority,
      associated_user: "658e6ae02d64c05214b8e1c7",
      associated_task: "658e6ae02d64c05214b8e1c7",
      comment: "Task",
      // is_completed: form?.status ? true : false,
      assigned_to: form?.assigned_to,
    };

    if (empId) {
      updateData.id = empId;
    }

    try {
      const req = serviceTaskManagementCreate; // empId ? serviceHubMasterUpdate :
      const res = await req(updateData);

      if (!res.error) {
        handleSideToggle();
        // dispatch(actionFetchHubMaster(1));
        // window.location.reload();
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
      } else if (fieldName === "category") {
        t[fieldName] = text.id;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm, listData]
  );

  // else if (fieldName === "industry_id") {

  //   t[fieldName] = text?.filter((item, index, self) => {
  //     return  index === self.findIndex((i) => i.id === item.id && i._id === item._id)

  //   });
  // }
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
  }, [empId, isAcceptPopUp, dispatch]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });

    setErrorData({});
  }, [form, setForm, setErrorData]);

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
    handleSearchUsers,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
    filteredUsers
  };
};

export default useAddTaskCreate;

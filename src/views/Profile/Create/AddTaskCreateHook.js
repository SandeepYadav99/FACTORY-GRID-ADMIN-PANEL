/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import {
  actionDeleteMasterDelete,
  actionFetchHubMaster,
} from "../../../actions/HubMaster.action";
import {
  serviceSearchAssignto,
  serviceSearchTask,
  serviceSearchUser,
  serviceTaskManagementCreate,
} from "../../../services/ProviderUser.service";
import { serviceSearchCategory } from "../../../services/TaskManage.service";

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

const useAddTaskCreate = ({
  handleSideToggle,
  isSidePanel,
  empId,
  handleCreatedTask,
  profileDetails,
}) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [listData, setListData] = useState(null);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [filteredTask, setFilteredTask] = useState(null);
  const [filteredAssignedTo, setFilteredAssignedTo] = useState(null);
  const [fetchedAssignedUser, setFetchedAssinedUser] = useState(null);
  const [categoryLists, setCategoryLists] = useState(null);
  const dispatch = useDispatch();
  console.log(form, "Form");
  useEffect(() => {
    if (!isSidePanel) return;
    serviceSearchCategory().then((res) => {
      if (!res.error) {
        setCategoryLists(res?.data)
      }
    });
  }, [form?.assigned_to, isSidePanel]);

  useEffect(() => {
    setFetchedAssinedUser(profileDetails);
  }, [fetchedAssignedUser]);

  useEffect(() => {
    if (!isSidePanel) return;
    serviceSearchAssignto({
      query: form?.assigned_to ? form?.assigned_to?.name : form?.assigned_to,
    }).then((res) => {
      if (!res.error) {
        setFilteredAssignedTo(res.data);
      }
    });
  }, [form?.assigned_to, isSidePanel]);

  useEffect(() => {
    if (!isSidePanel) return;
    serviceSearchTask({
      query: form?.associated_task
        ? form?.associated_task?.title
        : form?.associated_task,
    }).then((res) => {
      if (!res.error) {
        setFilteredTask(res.data);
      }
    });
  }, [form?.associated_task, isSidePanel]);

  useEffect(() => {
    if (!isSidePanel) return;
    serviceSearchUser({
      query: form?.associated_user
        ? form?.associated_user?.first_name
        : form?.associated_user,
    }).then((res) => {
      if (!res.error) {
        setFilteredUsers(res.data);
      } else {
        setFilteredUsers(null);
      }
    });
  }, [form?.associated_user, isSidePanel]);

  const handleSearchUsers = useCallback((searchText) => {}, []);

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
    let required = [
      "type",
      "title",
      "description",
      "priority",
      "due_date",
      "category",
    ]; // "name", "description", "due_date", "task_type", "comment"
    if (!fetchedAssignedUser) {
      required.push("assigned_to");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
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
  console.log( Array.isArray(form.category) && form?.category?.length > 0
  ? form?.category?.map((item) => item) // item.id || item._id
  : [], "Form");
  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const industryID =
      Array.isArray(form.category) && form?.category?.length > 0
        ? form?.category?.map((item) => item) // item.id || item._id
        : [];

    const updateData = {
      title: form?.title,
      description: form?.description,
      due_date: form?.due_date,
      category: industryID,
      type: form?.type,
      priority: form?.priority,
      associated_user: form?.associated_user?._id,
      associated_task: form?.associated_task?._id,
      comment: "Task",
      // is_completed: form?.status ? true : false,
      assigned_to: form?.assigned_to?._id || fetchedAssignedUser?.id,
    };

    if (empId) {
      updateData.id = empId;
    }

    try {
      const req = serviceTaskManagementCreate; // empId ? serviceHubMasterUpdate :
      const res = await req(updateData);

      if (!res.error) {
        handleSideToggle();
        handleCreatedTask();
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, empId, handleSideToggle, dispatch]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors)?.length > 0) {
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
        t[fieldName] = text;
      } else if (fieldName === "associated_task") {
        t[fieldName] = text;
      } else if (fieldName === "assigned_to") {
        t[fieldName] = text;
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
    categoryLists,
    handleSearchUsers,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
    filteredUsers,
    filteredTask,
    filteredAssignedTo,
    fetchedAssignedUser,
  };
};

export default useAddTaskCreate;

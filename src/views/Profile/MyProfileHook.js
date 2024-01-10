import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  serviceProfileDetail,
  serviceTaskFilterByUser,
  serviceTaskMnagment,
  serviceTaskMnagmentByUser,
} from "../../services/ProviderUser.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import { serviceTaskMnagmentUpdateStatus } from "../../services/TaskManage.service";
import SnackbarUtils from "../../libs/SnackbarUtils";

const useMyProfileHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [taskLists, setTaskList] = useState(null);
  const [taskCreated, setTaskCreated] = useState(false);
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);

  useEffect(() => {
    setIsLoading(true);
    serviceProfileDetail({ id: id ? id : userObject?.user?.id })
      .then((res) => {
        if (!res?.error) {
          setProfileDetails(res?.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  // const updateTaskManagement = () => {
  //   serviceTaskMnagment({
  //     index: 1,
  //     row: null,
  //     order: null,
  //     query: "",
  //     query_data: null,
  //   })
  //     .then((res) => {
  //       if (!res?.error) {
  //         setTaskList(res?.data);
  //       }
  //     })
  //     .finally(() => {});
  // };
  const updateTaskManagement = () => {
    serviceTaskMnagmentByUser({
      id: id ? id : userObject?.user?.id,
    })
      .then((res) => {
        if (!res?.error) {
          setTaskList(res?.data);
        }
      })
      .finally(() => {});
  };
  useEffect(() => {
    updateTaskManagement();
  }, [taskCreated]);

  const markAsCompleted = (data) => {
    serviceTaskMnagmentUpdateStatus({
      is_completed: true,
      id: data?.id ? data?.id : "",
    }).then((res) => {
      if (!res.error) {
        updateTaskManagement();
      }
    });
  };

  const completedHandler = (data) => {
    serviceTaskMnagmentUpdateStatus({
      is_completed: false,
      id: data?.id ? data?.id : "",
    }).then((res) => {
      if (!res.error) {
        updateTaskManagement();
      }
    });
  };

  const handleCreatedTask = () => {
    setTaskCreated(true);
  };
  const handleEdit = useCallback((profile) => {
    historyUtils.push(`${RouteName.USER_PROFILE}?id=${profile?.id}`);
  });

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel] // , profileId, id,  userObject?.user?.id
  );

  const handleDetailPage = useCallback((data) => {
    historyUtils.push(`${RouteName.TASK_DETAIL}?id=${data?.id}`);
  }, []);

  const filterCompltedTask = (event) => {
    const newValue = event.target.value;
    const queryValue = newValue === "PENDING" ? false : true;
    serviceTaskFilterByUser({
      is_completed: queryValue,
      user_id: id ? id : userObject?.user?.id,
    })
      .then((res) => {

        if (!res?.error) {
          // updateTaskManagement();
          setTaskList(res?.data);
        }else{
          SnackbarUtils.error(res.message)
        }
      })
      .finally(() => {});
  };

  return {
    profileDetails,
    handleEdit,
    isLoading,
    isSidePanel,
    handleSideToggle,
    profileId,
    handleDetailPage,
    taskLists,
    taskCreated,
    setTaskCreated,
    handleCreatedTask,
    markAsCompleted,
    completedHandler,
    filterCompltedTask,
  };
};

export default useMyProfileHook;

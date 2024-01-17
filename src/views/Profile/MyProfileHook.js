import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  serviceProfileDetail,
  serviceTaskFilterByUser,
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
  const [filterValue, setFilterValue] = useState(""); // PENDING

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

  const updateTaskManagement = () => {
    // setTimeout(() => {
      serviceTaskMnagmentByUser({
        id: id ? id : userObject?.user?.id,
      })
        .then((res) => {
          if (!res?.error) {
            setTaskList(res?.data);
          }
        })
        .finally(() => {});
    // }, 3000);
  };
  useEffect(() => {
    updateTaskManagement();
  }, [taskCreated, id]);

  const markAsCompleted = useCallback(
    (data) => {
      serviceTaskMnagmentUpdateStatus({
        is_completed: true,
        id: data?.id ? data?.id : "",
      }).then((res) => {
        if (!res.error) {
          if (filterValue) {
          
              serviceTaskFilterByUser({
                is_completed: false,
                user_id: id ? id : userObject?.user?.id,
              })
                .then((res) => {
                  if (!res?.error) {
                    // updateTaskManagement();
                    setTaskList(res?.data);
                  } else {
                    SnackbarUtils.error(res.message);
                  }
                })
                .finally(() => {});
           
          } else {
            setTaskList((tasks) => {
              return tasks.map((task) =>
                task.id === data.id ? { ...task, is_completed: true } : task
              );
            });
          }
        }
      });
    },
    [taskCreated, filterValue]
  );

  const completedHandler = useCallback(
    (data) => {
      serviceTaskMnagmentUpdateStatus({
        is_completed: false,
        id: data?.id ? data?.id : "",
      }).then((res) => {
        if (!res.error) {
          if(filterValue){
           
              serviceTaskFilterByUser({
                is_completed: true,
                user_id: id ? id : userObject?.user?.id,
              })
                .then((res) => {
                  if (!res?.error) {
                    // updateTaskManagement();
                    setTaskList(res?.data);
                  } else {
                    SnackbarUtils.error(res.message);
                  }
                })
                .finally(() => {});
        
          }else {
            setTaskList((tasks) => {
              return tasks.map((task) =>
                task.id === data.id ? { ...task, is_completed: false } : task
              );
            });
          }
        
        }
      });
    },
    [taskCreated, filterValue]
  );

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

  const filterCompltedTask = useCallback(
    (event) => {
      const newValue = event.target.value;
      console.log(newValue, "Vlaue is ");
      setFilterValue(newValue);
      const queryValue = newValue === "PENDING" ? false : true;
     
        serviceTaskFilterByUser({
          is_completed: queryValue,
          user_id: id ? id : userObject?.user?.id,
        })
          .then((res) => {
            if (!res?.error) {
              // updateTaskManagement();
              setTaskList(res?.data);
            } else {
              SnackbarUtils.error(res.message);
            }
          })
          .finally(() => {});
     
    },
    [filterValue]
  );

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
    filterValue,
    id
  };
};

export default useMyProfileHook;

import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { serviceProfileDetail } from "../../services/ProviderUser.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";

const useMyProfileHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [profileId, setProfileId]=useState(null)
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

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

  const handleEdit = useCallback((profile) => {
    historyUtils.push(`${RouteName.USER_PROFILE}?id=${profile?.id}`);
  });
  
  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
   
    },
    [ setSidePanel] // , profileId, id,  userObject?.user?.id
  );

  const handleEditTask = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      // setEditId(data?.id);
      // setEditData(data);
    },
    [ setSidePanel, ]
  );
  return {
    profileDetails,
    handleEdit,
    isLoading,
    isSidePanel,
    handleSideToggle,
    profileId
  };
};

export default useMyProfileHook;

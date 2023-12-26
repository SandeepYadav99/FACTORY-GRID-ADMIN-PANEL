import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { serviceProfileDetail } from "../../services/ProviderUser.service";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";

const useMyProfileHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);

  // access query params id in url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    serviceProfileDetail({ id: id }).then((res) => {
   
      if (!res?.error) {
        setProfileDetails(res?.data);
      }
    });
  }, [id]);

  const handleEdit =useCallback((profile)=>{
    historyUtils.push(`${RouteName.USER_PROFILE}?id=${profile?.id}`);
  })
  return {
    profileDetails,
    handleEdit
  };
};

export default useMyProfileHook;

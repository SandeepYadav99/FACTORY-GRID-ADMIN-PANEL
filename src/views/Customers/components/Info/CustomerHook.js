import React, { useEffect, useState } from "react";
import { serviceGetCustomersProfile } from "../../../../services/CustomersRequest.service";
import { useParams } from "react-router-dom";

const useCustomerHook = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    serviceGetCustomersProfile({ id: id }).then((res) => {
     
      if (!res || !res.error) {
        setUserProfile(res && res.data);
      }
      
    });
  }, [id]);

  return {
    userProfile,
  };
};

export default useCustomerHook;

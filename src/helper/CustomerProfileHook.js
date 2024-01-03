import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceGetCustomersProfile } from "../services/CustomersRequest.service";


const useCustomerProfileHook = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    serviceGetCustomersProfile({ id: id }).then((res) => {
      if (!res || !res.error) {
        setUserProfile(res && res.data);
     
      }
    }).finally(()=>{
      setIsLoading(false)
    })
  }, [id]);

  const renderInterestArea = useCallback((interest_area) => {
    const interest_area_list =
      interest_area && interest_area.map((area) => area);

    return interest_area_list;
  }, []);
  
  return {
    userProfile,
    renderInterestArea,
    isLoading
  };
};

export default useCustomerProfileHook;

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceGetCustomersProfile } from "../services/CustomersRequest.service";

const useCustomerProfileHook = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    serviceGetCustomersProfile({ id: id }).then((res) => {
      if (!res || !res.error) {
        setUserProfile(res && res.data);
      }
    });
  }, [id]);

  const renderInterestArea = useCallback((interest_area) => {
    const interest_area_list =
      interest_area && interest_area.map((area) => area);

    return interest_area_list;
  }, []);
  return {
    userProfile,
    renderInterestArea,
  };
};

export default useCustomerProfileHook;

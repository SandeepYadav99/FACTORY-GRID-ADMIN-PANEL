import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serviceGetCustomersProfile } from "../services/CustomersRequest.service";
import { useLocation } from "react-router-dom";

const useCustomerProfileHook = () => {
  const [userProfile, setUserProfile] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    serviceGetCustomersProfile({ id: id })
      .then((res) => {
        if (!res || !res.error) {
          setUserProfile(res && res.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, isOpenDialog]);

  useEffect(() => {
    const storedValue = localStorage.getItem("activeTabIndex");
    if (storedValue !== null) {
      setValue(parseInt(storedValue, 10));
    }
  }, []);

  const renderInterestArea = useCallback((interest_area) => {
    const interest_area_list =
      interest_area && interest_area.map((area) => area);

    return interest_area_list;
  }, []);

  const toggleIsOpenDialog = useCallback(
    (data) => {
      setIsOpenDialog((e) => !e);
      // setExpireLetter(data?.id)
    },
    [value]
  );
  useEffect(() => {
    const storedValue = localStorage.getItem("activeTabIndex");
    if (storedValue !== null) {
      setValue(parseInt(storedValue, 10));
    }
  }, []);
  useEffect(() => {
    return () => {
  
      localStorage.removeItem("activeTabIndex");
    };
  }, []);
  const handleSuspendBtn = () => {};

  const handleChange = useCallback(
    (event, newValue) => {
  
      setValue(newValue)
      localStorage.setItem("activeTabIndex", newValue);
    },
    [value]
  );

  return {
    userProfile,
    renderInterestArea,
    isLoading,
    value,
    isOpenDialog,
    toggleIsOpenDialog,
    handleChange,
    handleSuspendBtn,
  };
};

export default useCustomerProfileHook;

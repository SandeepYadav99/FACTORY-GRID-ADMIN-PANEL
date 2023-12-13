import React, { useEffect, useState } from "react";
import { serviceGetCustomersProfile } from "../../../../services/CustomersRequest.service";
import { useParams } from "react-router-dom";

const useCustomerHook = () => {
  const [userProfile, setUserProfile] = useState([]);
  



  
  useEffect(() => {
    serviceGetCustomersProfile({ id: "6579aca8dd0cc9bd7fecbf04" }).then((res) => {
    console.log(res)
    });
  }, []);
  
  return {
    userProfile,
  };
};

export default useCustomerHook;

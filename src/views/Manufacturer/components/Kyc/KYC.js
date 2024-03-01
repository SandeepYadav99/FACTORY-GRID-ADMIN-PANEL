import React, { useCallback, useState } from "react";
import styles from "./Style.module.css";
import BusinessKYC from "./BusinessKyc/BusinessKYC";
import IndustrySpecific from "./IndustrySpecific/IndustrySpecific";
import RepresentativeKYCDetail from "./RepresentativeKYCDetails/RepresentativeKYCDetail";


const KYC = ({userProfile, isLoading, value}) => {

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const toggleIsOpenDialog = useCallback(
    (data) => {
      setIsOpenDialog((e) => !e);
      // setExpireLetter(data?.id)
    },
    []
  );

  return (
    <>
      <BusinessKYC userProfile={userProfile?.kyc} isOpenDialog={isOpenDialog} value={value} toggleIsOpenDialog={toggleIsOpenDialog} isLoading={isLoading}/>
      <RepresentativeKYCDetail userProfile={userProfile?.representativekycs}/>
      <IndustrySpecific/>
    </>
  );
};

export default KYC;

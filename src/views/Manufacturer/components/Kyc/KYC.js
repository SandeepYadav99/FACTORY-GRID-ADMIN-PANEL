import React, { useCallback, useState } from "react";
import styles from "./Style.module.css";
import BusinessKYC from "./BusinessKyc/BusinessKYC";
import IndustrySpecific from "./IndustrySpecific/IndustrySpecific";
import RepresentativeKYCDetail from "./RepresentativeKYCDetails/RepresentativeKYCDetail";


const KYC = ({userProfile}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const toggleIsOpenDialog = useCallback(
    (data) => {
      setIsOpenDialog((e) => !e);
      // setExpireLetter(data?.id)
    },
    []
  );
  return (
    <div>
      <BusinessKYC userProfile={userProfile?.kyc} isOpenDialog={isOpenDialog} toggleIsOpenDialog={toggleIsOpenDialog}/>
      <RepresentativeKYCDetail userProfile={userProfile?.representativekycs}/>
      <IndustrySpecific/>
    </div>
  );
};

export default KYC;

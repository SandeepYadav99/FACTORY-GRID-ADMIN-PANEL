import React from "react";
import styles from "./Style.module.css";
import BusinessKYC from "./BusinessKyc/BusinessKYC";
import IndustrySpecific from "./IndustrySpecific/IndustrySpecific";
import RepresentativeKYCDetail from "./RepresentativeKYCDetails/RepresentativeKYCDetail";


const KYC = ({userProfile}) => {
 
  return (
    <div>
      <BusinessKYC userProfile={userProfile?.kyc}/>
      <RepresentativeKYCDetail userProfile={userProfile?.representativekycs}/>
      <IndustrySpecific/>
    </div>
  );
};

export default KYC;

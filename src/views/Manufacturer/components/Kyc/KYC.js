import React from "react";
import styles from "./Style.module.css";
import BusinessKYC from "./BusinessKyc/BusinessKYC";
import IndustrySpecific from "./IndustrySpecific/IndustrySpecific";
import RepresentativeKYCDetail from "./RepresentativeKYCDetails/RepresentativeKYCDetail";


const KYC = () => {
  return (
    <div>
      <BusinessKYC />
      <RepresentativeKYCDetail/>
      <IndustrySpecific/>
    </div>
  );
};

export default KYC;

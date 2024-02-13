import React from "react";
import styles from "../../Style.module.css";
import { ButtonBase } from "@material-ui/core";
const CompanyProfile = ({ userProfile }) => {

  const brochureHandler =()=>{
     const newTab = userProfile?.company_profile;
     window.open(newTab, "_blank")
  }
  
  return (
    <div className={styles.plain}>
      <div className={styles.accountFlex}>
        <div className={styles.headings}>Company Profile</div>
        <div>
          <span className={styles.brochure}>Brochure</span>
          <ButtonBase className={styles.view} onClick={brochureHandler}>(View File)</ButtonBase>
        </div>
      </div>
      <div className={styles.key}>Specialization</div>
      <div className={styles.val}>
        {userProfile && userProfile.company_specialization}
        {/* About the company all information will come here */}
      </div>
      <br />
      <div className={styles.key}>About Company</div>
      <div className={styles.val}>
        {userProfile && userProfile.about_company}
        {/* About the company all information will come here */}
      </div>
    </div>
  );
};

export default CompanyProfile;

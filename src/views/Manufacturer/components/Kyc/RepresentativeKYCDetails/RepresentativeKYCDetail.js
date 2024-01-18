import React from "react";
import styles from "./Style.module.css";
import { VerifiedUser } from "@material-ui/icons";
const RepresentativeKYCDetail = () => {
  return (
   

<div>
<div className={styles.plainPaper}>
  <div className={styles.newContainer}>
    <div className={styles.headerTitle}>
      <span>
        <b>Representative KYC Details</b>
      </span>
    </div>
    <div className={styles.gaps} />
    <div className={styles.kycContainer}>
      <div>
        <div className={styles.title}>Name</div>
        <div>
          <div>
            3390AE9800134 
          </div>
        </div>
      </div>

      <div>
        <div className={styles.title}>Designation</div>
        <div>
          <div>
            3390AE9800134 
          </div>
        </div>
      </div>

      <div>
        <div className={styles.title}>Designation</div>
        <div>
          <div>abhaypanfile.jpg</div>
        </div>
      </div>

      <div>
        <div className={styles.title}>PAN File</div>
        <div>
          <a>N/A</a>
        </div>
      </div>
    </div>
    <div className={styles.gaps} />
    <div className={styles.kyc2}>
      <div>
        <div className={styles.title}>Aadhar Number</div>
        <div>
          <div>3390AE9800134</div>
        </div>
      </div>

      <div>
        <div className={styles.title}>Aadhar Front</div>
        <div>
          <a href="#">3390AE9800134</a>
        </div>
      </div>
      <div>
        <div className={styles.title}>Aadhar Front</div>
        <div>
          <a href="#">3390AE9800134</a>
        </div>
      </div>
    </div>
  </div>
  <div className={styles.gaps} />
</div>
</div>

  );
};

export default RepresentativeKYCDetail;

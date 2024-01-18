import React from "react";
import styles from "./Style.module.css";
import { VerifiedUser } from "@material-ui/icons";

const IndustrySpecific = () => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headerTitle}>
            <span>
              <b>Industry Specific (Pharmaceuticals)</b>
            </span>
          </div>

          <div className={styles.headerTitle2}>
            <span>Manufacturing License</span>
          </div>
          <div className={styles.gaps} />

          <div className={styles.kycContainer}>
            <div>
              <div className={styles.title}>License Number</div>
              <div>
                <div>3390AE9800134</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>Issuing State</div>
              <div>
                <div>3390AE9800134</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>License File</div>
              <div>
                <div>manufacturelicense.jpg</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>Validity</div>
              <div>
                <div>01/02/2020 - 01/02/2024</div>
              </div>
            </div>
          </div>
          <div className={styles.gaps} />
          <div className={styles.headerTitle3}>
            <span>
              <div className={styles.headerTitle3}>
                <span>Other Documents</span>
              </div>
            </span>
          </div>
         
          <div className={styles.kyc2}>
            <div>
              <div className={styles.title}>Drug License Number</div>
              <div>
                <div>3390AE9800134</div>
              </div>
            </div>
            <div>
              <div className={styles.title}>Pollution NOC</div>
              <div>
                <div>nocfile.pdf</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gaps} />
      </div>
    </div>
  );
};

export default IndustrySpecific;

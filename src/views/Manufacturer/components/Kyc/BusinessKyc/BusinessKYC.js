import React from "react";
import styles from "./Style.module.css";
import { VerifiedUser } from "@material-ui/icons";
const BusinessKYC = () => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headerTitle}>
            <span>
              <b>Business KYC</b>
            </span>
          </div>
          <div className={styles.gaps}/>
          <div className={styles.kycContainer}>
            <div>
              <div className={styles.title}>GST No.</div>
              <div>
                <div>
                  3390AE9800134 <VerifiedUser fontSize="small" />{" "}
                </div>
              </div>
            </div>

            <div>
              <div  className={styles.title}>PAN No.</div>
              <div>
                <div>
                  3390AE9800134 <VerifiedUser fontSize="small" />{" "}
                </div>
              </div>
            </div>

            <div>
              <div  className={styles.title}>PAN File</div>
              <div>
                <div>abhaypanfile.jpg</div>
              </div>
            </div>

            <div>
              <div  className={styles.title}>PAN File</div>
              <div>
                <div>N/A</div>
              </div>
            </div>
          </div>
          <div className={styles.gaps}/>
          <div>
            <div  className={styles.title}>CIN No.</div>
            <div>
              <div>
                3390AE9800134 <VerifiedUser fontSize="small" />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gaps} />
      </div>
    </div>
  );
};

export default BusinessKYC;

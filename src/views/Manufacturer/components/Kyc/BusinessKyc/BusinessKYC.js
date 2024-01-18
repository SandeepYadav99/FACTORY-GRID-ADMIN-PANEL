import React from "react";
import styles from "./Style.module.css";
import { VerifiedUser } from "@material-ui/icons";
const BusinessKYC = ({ userProfile }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headerTitle}>
            <span>
              <b>Business KYC</b>
            </span>
          </div>
          <div className={styles.gaps} />
          <div className={styles.kycContainer}>
            <div>
              <div className={styles.title}>GST No.</div>
              <div>
                <div>
                  {userProfile?.gst_number}{" "}
                  {userProfile?.gst_verified ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN No.</div>
              <div>
                <div>
                  {userProfile?.pan_number}{" "}
                  {userProfile?.pan_verified ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN File</div>
              <div>
                <a href={userProfile?.pan_file}>abhaypanfile.jpg</a>
              </div>
            </div>

            <div>
              <div className={styles.title}>MSME No.</div>
              <div>
                <div>
                  {userProfile?.msme_number || "N/A"}{" "}
                  {userProfile?.msme_verified ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gaps} />
          <div>
            <div className={styles.title}>CIN No.</div>
            <div>
              <div>
                <div>
                  {userProfile?.cin_number}{" "}
                  {userProfile?.cin_verified ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    ""
                  )}
                </div>
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

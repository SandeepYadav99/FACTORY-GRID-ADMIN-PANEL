import React from "react";
import styles from "./Style.module.css";
import { VerifiedUser } from "@material-ui/icons";
import Review from "../../../../../assets/img/sent_blue.svg"
const BusinessKYC = ({ userProfile }) => {
  console.log(userProfile, "KYC")
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
                  {userProfile?.cin_number_status === "VERIFIED" ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                   <img src={Review} height={15}/>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN No.</div>
              <div>
                <div>
                  {userProfile?.pan_number}{" "}
                  {userProfile?.gst_number_status === "VERIFIED" ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    <img src={Review} height={15}/>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN File</div>
              <div>
                {userProfile?.gst_verified ?  <a href={userProfile?.pan_file} target="_blank">Pan File</a> : "N/A"}
               
              </div>
            </div>

            <div>
              <div className={styles.title}>MSME No.</div>
              <div>
                <div>
                  {userProfile?.msme_number || "N/A"}{" "}
                  {userProfile?.pan_file_status === "VERIFIED" ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    <img src={Review} height={15}/>
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
                  {userProfile?.cin_number_status === "VERIFIED"? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    <img src={Review} height={15}/>
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

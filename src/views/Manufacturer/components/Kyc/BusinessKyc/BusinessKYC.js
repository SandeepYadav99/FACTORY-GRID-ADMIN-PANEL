import React from "react";
import styles from "./Style.module.css";

import TooltipPopup from "./TooltipPopup/TooltipPopup";
const BusinessKYC = ({
  userProfile,
  toggleIsOpenDialog,
  isOpenDialog,
  isLoading,
  value,
}) => {
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

              <div className={styles.sub_kycContainer}>
                <div>{userProfile?.gst_number} </div>
                <div style={{ marginLeft: "10px" }}>
                  <TooltipPopup
                    title={userProfile?.gst_number_status}
                    type={"gst_number_status"}
                    id={userProfile?.id}
                    isLoading={isLoading}
                  ></TooltipPopup>
                </div>
                {/* {userProfile?.cin_number_status === "VERIFIED" ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                   <img src={Review} height={15}/>
                  )} */}
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN No.</div>
              <div className={styles.sub_kycContainer}>
                <div>{userProfile?.pan_number} </div>
                <div style={{ marginLeft: "10px" }}>
                  <TooltipPopup
                    title={userProfile?.gst_number_status}
                    type={"gst_number_status"}
                    id={userProfile?.id}
                    isLoading={isLoading}
                  ></TooltipPopup>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN File</div>
              <div>
                {userProfile?.gst_verified ? (
                  <a href={userProfile?.pan_file} target="_blank">
                    Pan File
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
            </div>

            <div>
              <div className={styles.title}>MSME No.</div>
              <div className={styles.sub_kycContainer}>
                <div>{userProfile?.msme_number || "N/A"} </div>
                <div style={{ marginLeft: "10px" }}>
                  <TooltipPopup
                    title={userProfile?.pan_file_status}
                    type={"pan_file_status"}
                    id={userProfile?.id}
                    isLoading={isLoading}
                  ></TooltipPopup>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.gaps} />
          <div>
            <div className={styles.title}>CIN No.</div>
            <div>
              <div className={styles.sub_kycContainer}>
                <div>{userProfile?.cin_number} </div>
                <div style={{ marginLeft: "10px" }}>
                  <TooltipPopup
                    title={userProfile?.cin_number_status}
                    type={"cin_number_status"}
                    id={userProfile?.id}
                  ></TooltipPopup>
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

import React from "react";
import styles from "./styles.module.css";
import { Delete, VerifiedUser } from "@material-ui/icons";
import Review from "../../../../assets/img/sent_blue.svg";
import ic_add from "../../../../assets/img/ic_add.png";
import { ButtonBase } from "@material-ui/core";
import ConfirmationPopup from "./components/ConfirmationPopup";
import useBadgesHook from "./BadgesHook";
const Badges = ({ userProfile }) => {
  const {toggleIsOpenDialog, isOpenDialog}=useBadgesHook()
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headerTitle}>
            <span>
              <b>Badge Details</b>
            </span>
          </div>
          <div className={styles.gaps} />
          <div className={styles.kycContainer}>
            <div className={styles.card_badges}>
              <div>
                <img src={ic_add} alt="..." />
                <p>
                  <b> Top Manufacturer</b>
                  <br />
                  Abhishek Singh | 11/10/2023
                </p>
              </div>
              <ButtonBase className={styles.action_button} onClick={toggleIsOpenDialog}>
                <Delete fontSize="small" />
                Delete
              </ButtonBase>
            </div>

            <div>
              <div className={styles.title}>PAN No.</div>
              <div>
                <div>
                  {userProfile?.pan_number}{" "}
                  {userProfile?.gst_number_status === "VERIFIED" ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    <img src={Review} height={15} />
                  )}
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
              <div>
                <div>
                  {userProfile?.msme_number || "N/A"}{" "}
                  {userProfile?.pan_file_status === "VERIFIED" ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    <img src={Review} height={15} />
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
                  {userProfile?.cin_number_status === "VERIFIED" ? (
                    <VerifiedUser fontSize="small" style={{ color: "green" }} />
                  ) : (
                    <img src={Review} height={15} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gaps} />
      </div>
      <ConfirmationPopup
        candidateId={userProfile?._id}
        isOpen={isOpenDialog}
        handleToggle={toggleIsOpenDialog}
        status={userProfile?.status}
      />
    </div>
  );
};

export default Badges;

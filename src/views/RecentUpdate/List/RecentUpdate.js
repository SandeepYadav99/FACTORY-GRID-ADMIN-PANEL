import React from "react";
import styles from "./Style.module.css";
import {

  CachedOutlined,

} from "@material-ui/icons";
import Review from "../../../assets/img/sent_blue.svg";
import { ButtonBase } from "@material-ui/core";
import StatusPill from "../../../FormFields/Status/StatusPill.component";
import StatusPopUp from "./Components/StatusPopUp";
import useRecentUpdateHook from "./RecentUpdateHook";
const RecentUpdate = ({ isOpen, handleToggle, formValue }) => {
  const {
    
    toggleRejectDialog,
    isRejectPopUp,

  } = useRecentUpdateHook({ isOpen, handleToggle, formValue });

  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.container}>
            <div className={styles.kycContainer}>
              <div className={styles.subKycContainer}>
                <img src={Review} height={115} width={115} alt="" />
                <div className={styles.content}>
                  <p className={styles.contentGap}>
                    <span className={styles.contentTitle}>
                      Morepen gets USFDA Approval for Fexodanine Expected to
                      start export in Q4'FY22
                    </span>{" "}
                    <br />
                    <div className={styles.gaps1}></div>
                    <span className={styles.contentTitle1}>
                      We specializes in the development of precision medicines
                      tailored to individual patient profiles. Our cutting-edge
                      research in genomics and personalized therapies allows us
                      to address the unique genetic makeup of patients,
                      maximizing treatment efficacy while minimizing side
                      effects.
                    </span>
                  </p>

                  <div className={styles.links}>
                    <a href="#">#Achivement</a>
                  </div>
                </div>
              </div>

              <div>
                <StatusPill status={"VISIBLE"} style={{ color: "#20C997" }} />
                <div className={styles.gaps}></div>
                <span className={styles.footer_date}>09-01-2024</span>
                
              </div>
            </div>

            <div className={styles.footer_content}>
              <ButtonBase className={styles.action_button} onClick={() => toggleRejectDialog()}>
                <CachedOutlined fontSize="small" /> Update Status
              </ButtonBase>
            </div>
          </div>
        </div>
        <div className={styles.gaps} />
        <div className={styles.newContainer}>
          <div className={styles.container}>
            <div className={styles.kycContainer}>
              <div className={styles.subKycContainer}>
                <img src={Review} height={115} width={115} alt="" />
                <div className={styles.content}>
                  <p className={styles.contentGap}>
                    <span className={styles.contentTitle}>
                      Morepen gets USFDA Approval for Fexodanine Expected to
                      start export in Q4'FY22
                    </span>{" "}
                    <br />
                    <div className={styles.gaps1}></div>
                    <span className={styles.contentTitle1}>
                      We specializes in the development of precision medicines
                      tailored to individual patient profiles. Our cutting-edge
                      research in genomics and personalized therapies allows us
                      to address the unique genetic makeup of patients,
                      maximizing treatment efficacy while minimizing side
                      effects.
                    </span>
                  </p>

                  <div className={styles.links}>
                    <a href="#">#Achivement</a>
                  </div>
                </div>
              </div>

              <div>
                <StatusPill status={"SUSPENDED"} style={{ color: "#FF0000" }} />
                <div className={styles.gaps}></div>
                <div>
                  <span className={styles.footer_date}>09-01-2024</span>
                </div>
              </div>
            </div>

            <div className={styles.footer_content}>
              <ButtonBase className={styles.action_button} onClick={() => toggleRejectDialog()}>
                <CachedOutlined fontSize="small" /> Update Status
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      <StatusPopUp
        // handleConfirm={handleRejectApi}
        handleDialog={toggleRejectDialog}
        isOpen={isRejectPopUp}
      />
    </div>
  );
};

export default RecentUpdate;

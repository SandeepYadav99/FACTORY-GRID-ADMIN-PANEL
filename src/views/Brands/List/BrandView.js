import React from "react";
import styles from "./Style.module.css";
import { AccessAlarm, Delete, VerifiedUser, Watch } from "@material-ui/icons";
import Review from "../../../assets/img/sent_blue.svg";
import { ButtonBase } from "@material-ui/core";
import StatusPill from "../../../FormFields/Status/StatusPill.component";
const BrandView = ({ userProfile }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.container}>
            <div className={styles.kycContainer}>
              <div className={styles.subKycContainer}>
                <img src={Review} height={73} width={73} alt="" />
                <div className={styles.content}>
                  <p>Pharmacy Brand</p>

                  <a href="#">View Authority Letter</a>
                  <div className={styles.gaps1}></div>
                  <a href="#">View Trademark Certficate</a>
                </div>
              </div>
             <div>
             <StatusPill status={"VERIFIED"} style={{color:"#20C997"}}/>
             </div>
            </div>
            <div className={styles.gaps}></div>
            <div className={styles.footer_content}>
              <div>
                <span className={styles.footer_date}>09-01-2024</span>

                <div className={styles.gaps1}></div>
                <span className={styles.addon_footer}>
                  <AccessAlarm fontSize="small" />
                </span>
                <span className={styles.addon_footer_text}>Added On</span>
              </div>

              <div className={styles.footer_right}>
                <span className={styles.footer_date}>09-01-2024</span>
                <div className={styles.gaps1}></div>
                <span className={styles.addon_footer}>
                  <AccessAlarm fontSize="small" />
                </span>
                <span className={styles.addon_footer_text}>
                  Last Updated On
                </span>
              </div>
              <ButtonBase className={styles.action_button} onClick={() => {}}>
                <Delete fontSize="small" />
                Remove
              </ButtonBase>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.kycContainer}>
              <div className={styles.subKycContainer}>
                <img src={Review} height={73} width={73} alt="" />
                <div className={styles.content}>
                  <p>Health Logo</p>

                  <a href="#">View Authority Letter</a>
                  <div className={styles.gaps1}></div>
                  <a href="#">View Trademark Certficate</a>
                </div>
              </div>
             <div>
             <StatusPill status={"REVIEW"} style={{color:"#FA8B0C"}}/>
             </div>
            </div>
            <div className={styles.gaps}></div>
            <div className={styles.footer_content}>
              <div>
                <span className={styles.footer_date}>09-01-2024</span>

                <div className={styles.gaps1}></div>
                <span className={styles.addon_footer}>
                  <AccessAlarm fontSize="small" />
                </span>
                <span className={styles.addon_footer_text}>Added On</span>
              </div>

              <div className={styles.footer_right}>
                <span className={styles.footer_date}>09-01-2024</span>
                <div className={styles.gaps1}></div>
                <span className={styles.addon_footer}>
                  <AccessAlarm fontSize="small" />
                </span>
                <span className={styles.addon_footer_text}>
                  Last Updated On
                </span>
              </div>
              <ButtonBase className={styles.action_button} onClick={() => {}}>
                <Delete fontSize="small" />
                Remove
              </ButtonBase>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.kycContainer}>
              <div className={styles.subKycContainer}>
                <img src={Review} height={73} width={73} alt="" />
                <div className={styles.content}>
                  <p>Brand Name</p>

                  <a href="#">View Authority Letter</a>
                  <div className={styles.gaps1}></div>
                  <a href="#">View Trademark Certficate</a>
                </div>
              </div>
             <div>
             <StatusPill status={"REJECTED"} style={{color:"#FF0000"}}/>
             </div>
            </div>
            <div className={styles.gaps}></div>
            <div className={styles.footer_content}>
              <div>
                <span className={styles.footer_date}>09-01-2024</span>

                <div className={styles.gaps1}></div>
                <span className={styles.addon_footer}>
                  <AccessAlarm fontSize="small" />
                </span>
                <span className={styles.addon_footer_text}>Added On</span>
              </div>

              <div className={styles.footer_right}>
                <span className={styles.footer_date}>09-01-2024</span>
                <div className={styles.gaps1}></div>
                <span className={styles.addon_footer}>
                  <AccessAlarm fontSize="small" />
                </span>
                <span className={styles.addon_footer_text}>
                  Last Updated On
                </span>
              </div>
              <ButtonBase className={styles.action_button} onClick={() => {}}>
                <Delete fontSize="small" />
                Remove
              </ButtonBase>
            </div>
          </div>
        </div>
        <div className={styles.gaps} />
      </div>
    </div>
  );
};

export default BrandView;

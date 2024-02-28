import React from "react";
import styles from "./Style.module.css";
import { VerifiedUser } from "@material-ui/icons";
import Review from "../../../assets/img/sent_blue.svg";
const BrandView = ({ userProfile }) => {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.kycContainer}>
            <div>
                <img src="" alt=""/>
                <p>
                Pharmacy Brand
                </p>
                <a>
                View Authority Letter
                </a>
                <a>
                View Trademark Certficate
                </a>
            </div>
            <div>VERIFIED</div>
          </div>
        </div>
        <div className={styles.gaps} />
      </div>
    </div>
  );
};

export default BrandView;

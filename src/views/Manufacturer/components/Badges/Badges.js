import React from "react";
import styles from "./styles.module.css";
import { Add, Delete, VerifiedUser } from "@material-ui/icons";
import Review from "../../../../assets/img/sent_blue.svg";
import ic_add from "../../../../assets/img/ic_add.png";
import { ButtonBase } from "@material-ui/core";
import ConfirmationPopup from "./components/ConfirmationPopup";
import useBadgesHook from "./BadgesHook";
const Badges = ({ userProfile }) => {
  const { toggleIsOpenDialog, isOpenDialog , types} = useBadgesHook();
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headerTitle}>
            <span>
              <b>Badge Details</b>
            </span>
          
              <ButtonBase className={styles.addTask} onClick={()=>toggleIsOpenDialog("Assign Badge")}>
                <Add/> ASSIGN BADGE
              </ButtonBase>
          
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
              <ButtonBase
                className={styles.action_button}
                onClick={()=>toggleIsOpenDialog("Delete")}
              >
                <Delete fontSize="small" />
                Delete
              </ButtonBase>
            </div>
            <div className={styles.card_badges}>
              <div>
                <img src={ic_add} alt="..." />
                <p>
                  <b> Top Manufacturer</b>
                  <br />
                  Abhishek Singh | 11/10/2023
                </p>
              </div>
              <ButtonBase
                className={styles.action_button}
                onClick={()=>toggleIsOpenDialog("Delete")}
              >
                <Delete fontSize="small" />
                Delete
              </ButtonBase>
            </div>
            <div className={styles.card_badges}>
              <div>
                <img src={ic_add} alt="..." />
                <p>
                  <b> Top Manufacturer</b>
                  <br />
                  Abhishek Singh | 11/10/2023
                </p>
              </div>
              <ButtonBase
                className={styles.action_button}
                onClick={()=>toggleIsOpenDialog("Delete")}
              >
                <Delete fontSize="small" />
                Remove
              </ButtonBase>
            </div>

          </div>
          <div className={styles.kycContainer1}>
            <div className={styles.card_badges}>
              <div>
                <img src={ic_add} alt="..." />
                <p>
                  <b> Top Manufacturer</b>
                  <br />
                  Abhishek Singh | 11/10/2023
                </p>
              </div> 
              <ButtonBase
                className={styles.action_button}
                onClick={()=>toggleIsOpenDialog("Delete")}
              >
                <Delete fontSize="small" />
                Delete
              </ButtonBase>
            </div>
            <div className={styles.card_badges}>
              <div>
                <img src={ic_add} alt="..." />
                <p>
                  <b> Top Manufacturer</b>
                  <br />
                  Abhishek Singh | 11/10/2023
                </p>
              </div>
              <ButtonBase
                className={styles.action_button}
                onClick={()=>toggleIsOpenDialog("Delete")}
              >
                <Delete fontSize="small" />
                Delete
              </ButtonBase>
            </div>
            <div className={styles.card_badges}>
              <div>
                <img src={ic_add} alt="..." />
                <p>
                  <b> Top Manufacturer</b>
                  <br />
                  Abhishek Singh | 11/10/2023
                </p>
              </div>
              <ButtonBase
                className={styles.action_button}
                onClick={()=>toggleIsOpenDialog("Delete")}
              >
                <Delete fontSize="small" />
                Remove
              </ButtonBase>
            </div>

          </div>
        </div>
      </div>
      <ConfirmationPopup
        candidateId={userProfile?._id}
        isOpen={isOpenDialog}
        handleToggle={toggleIsOpenDialog}
        status={userProfile?.status}
        types={types}
      />
    </div>
  );
};

export default Badges;

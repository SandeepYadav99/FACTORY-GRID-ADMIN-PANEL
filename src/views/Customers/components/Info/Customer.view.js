import React from "react";

import { ButtonBase } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import InboxIcon from "@material-ui/icons/Inbox";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styles from "./style.module.css";
import ActivityInfo from "./component/ActivityInfo";
import useCustomerHook from "./CustomerHook";

const CustomerComponent = () => {
  const { userProfile } = useCustomerHook();
  console.log(userProfile, "Profile Value");
  return (
    <div>
      <div className={styles.btn}></div>
      <div className={styles.profileFlex}>
        <div className={styles.leftSection}>
          <div className={styles.plain}>
            <div className={styles.profileContainer}>
              <img src={userProfile.image} alt="" />
              <div className={styles.name}>
                {userProfile.first_name} {userProfile.last_name}{" "}
              </div>
              <div className={styles.position}>Designation</div>
              <div className={styles.designation}>Business Name</div>
              <div className={styles.status}>PAID</div>
            </div>

            <hr />
            <h5 className={styles.heading}>Contact Info</h5>
            <div>
              <div className={styles.outerFlex}>
                <div className={styles.contactFlex}>
                  <EmailIcon className={styles.contactIcons} />
                  <span className={styles.email}>{userProfile.email}</span>
                </div>
                <div className={styles.verified}>
                  {" "}
                  {userProfile.is_email_verified ? "VERIFIED" : "NOT VERIFIED"}
                </div>
              </div>

              <div className={styles.outerFlex}>
                <div className={styles.contactFlex}>
                  <CallIcon className={styles.contactIcons} />
                  <span className={styles.email}>
                    {userProfile.contact_string}
                  </span>
                </div>
                <div className={styles.notverified}>
                  {" "}
                  {userProfile.is_contact_verified
                    ? "VERIFIED"
                    : "NOT VERIFIED"}
                </div>
              </div>
            </div>

            <br />

            <h5 className={styles.heading}>Activity Info</h5>
            <div>
              <div className={styles.activityFlex}>
                <span className={styles.member}>Member Since:</span>
                <span>{userProfile.membership_start_date}</span>
                {/* 11/11/2021 */}
              </div>
              <div className={styles.activityFlex}>
                <span className={styles.member}>Last Activity:</span>
                <span>{userProfile.last_active_at}</span>
                {/* 11/11/2021 1:00:00 P.M */}
              </div>
            </div>

            <h5 className={styles.heading}>Additional Info</h5>
            <div>
              <div className={styles.activityFlex}>
                <span className={styles.member}>Industry:</span>
                <span>{userProfile.industry && userProfile.industry.name}</span>
              </div>
            </div>
          </div>
        </div>

        <ActivityInfo userProfileActivity={userProfile}/>
      </div>
    </div>
  );
};

const useStyle = (theme) => ({
  btnSuccess: {
    backgroundColor: theme.palette.success.dark,
    color: "white",
    marginRight: 5,
    marginLeft: 5,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  btnError: {
    backgroundColor: theme.palette.error.dark,
    color: "white",
    marginLeft: 5,
    marginRight: 5,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
});

export default CustomerComponent;

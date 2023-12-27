import React, { useCallback, useState } from "react";
import styles from "./AccountQuality.module.css";
import { ButtonBase } from "@material-ui/core";
import AcountQueltyPopUp from "./AcountQueltyPopUp/AcountQueltyPopUp";
import { serviceProviderUserManager } from "../../../../../services/ProviderUser.service";
import {
  actionAssignSupport,
  actionManageAccountQuelity,
} from "../../../../../actions/Support.action";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const AccountQuality = ({ userProfileAccountQuality }) => {
  const [open, setOpen] = useState(false);

  const { user_manager_detail: user_manager_detail } = useSelector(
    (state) => state.support
  );
  console.log(user_manager_detail);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const _handleClose = useCallback(() => {
    setOpen((e) => !e);
  }, [setOpen]);

  const handleSubmit = useCallback(
    (data) => {
      console.log(data, "Data")
      serviceProviderUserManager({ manager_id: data?.user_id, user_id: id }).then(
        (res) => {
          if (!res?.error) {
            setOpen(false);
          }
        }
      );
      //  dispatch(actionManageAccountQuelity(user_manager_detail.manager_id, data.user_id));
    
    },
    [setOpen, id]
  );

  return (
    <div className={styles.plain}>
      <div className={styles.accountFlex}>
        <div className={styles.headings}>Account Quality</div>
        <div>
          <ButtonBase className={styles.view} onClick={_handleClose}>
            Manage
          </ButtonBase>
        </div>
      </div>

      <div className={styles.blockFlex}>
        <div className={styles.bottomProfile}>
          <img
            src={userProfileAccountQuality.image}
            className={styles.profileImg}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.profileName}>Pranav Bhasin</div>
            <div className={styles.designation}>Designation</div>
          </div>
        </div>
        <div>
          <ButtonBase className={styles.view}>View Profile</ButtonBase>
        </div>
      </div>
      <br />
      <div>
        <div className={styles.key}>Contact Information</div>
        <div className={styles.val}>+91 98958494545</div>
        <div className={styles.val}>pranav@fg.com</div>
      </div>
      <div className={styles.caseFlex}>
        <AcountQueltyPopUp
          handleSubmitProps={handleSubmit}
          open={open}
          handleClose={_handleClose}
        />
      </div>
    </div>
  );
};

export default AccountQuality;

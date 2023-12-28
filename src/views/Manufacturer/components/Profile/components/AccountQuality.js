import React, { useCallback, useEffect, useState } from "react";
import styles from "./AccountQuality.module.css";
import { ButtonBase } from "@material-ui/core";
import AcountQueltyPopUp from "./AcountQueltyPopUp/AcountQueltyPopUp";
import { serviceProviderAssignManager } from "../../../../../services/ProviderUser.service";

import { useDispatch, useSelector } from "react-redux";

import historyUtils from "../../../../../libs/history.utils";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useCustomerProfileHook from "../../../../../helper/CustomerProfileHook";
import { serviceGetCustomersProfile } from "../../../../../services/CustomersRequest.service";
import { actionUserProfile } from "../../../../../actions/Support.action";
const AccountQuality = ({ userProfileAccountQuality }) => {
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  const _handleClose = useCallback(() => {
    setOpen((e) => !e);
  }, [setOpen]);

  const handleSubmit = useCallback(
    (data) => {
      console.log(data?.user_id, "Data");
      serviceProviderAssignManager({
        manager_id: data?.user_id,
        user_id: id,
      }).then((res) => {
        if (!res?.error) {
          setOpen(false);
          window.location.reload();
        }
      });
      //  dispatch(actionManageAccountQuelity(user_manager_detail.manager_id, data.user_id));
    },
    [setOpen, id]
  );

  const profileHandler = useCallback(() => {
    historyUtils.push(`/profile/?id=${userProfileAccountQuality?.id}`);
  }, [userProfileAccountQuality?.id]);

  return (
    <div className={styles.plain}>
      <div className={styles.accountFlex}>
        <div className={styles.headings}>Account Manager</div>
        <div>
          <ButtonBase className={styles.view} onClick={_handleClose}>
            Manage
          </ButtonBase>
        </div>
      </div>

      <div className={styles.blockFlex}>
        <div className={styles.bottomProfile}>
          <img
            src={userProfileAccountQuality?.image || ""}
            className={styles.profileImg}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.profileName}>
              {userProfileAccountQuality?.name || "N/A"}
            </div>
            <div className={styles.designation}>
              {userProfileAccountQuality?.designation || "N/A"}
            </div>
          </div>
        </div>
        <div>
          <ButtonBase className={styles.view} onClick={profileHandler}>
            View Profile
          </ButtonBase>
        </div>
      </div>
      <br />
      <div>
        <div className={styles.key}>Contact Information</div>
        <div className={styles.val}>
          +91 {userProfileAccountQuality?.contact}
        </div>
        <div className={styles.val}>{userProfileAccountQuality?.email}</div>
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

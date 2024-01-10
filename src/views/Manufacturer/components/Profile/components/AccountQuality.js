import React, { useCallback,  useState } from "react";
import styles from "./AccountQuality.module.css";
import { ButtonBase } from "@material-ui/core";
import AcountQueltyPopUp from "./AcountQueltyPopUp/AcountQueltyPopUp";
import { serviceProviderAssignManager } from "../../../../../services/ProviderUser.service";

import historyUtils from "../../../../../libs/history.utils";
import { useParams } from "react-router-dom";

const AccountQuality = ({ userProfileAccountQuality }) => {
  const [open, setOpen] = useState(false);
  const [accountProfile, setAccountProfile] = useState({
    ...userProfileAccountQuality,
  });
  const { id } = useParams();

  const _handleClose = useCallback(() => {
    setOpen((e) => !e);
  }, [setOpen]);

  const handleSubmit = useCallback(
    async (data) => {
      await serviceProviderAssignManager({
        manager_id: data?.user_id,
        user_id: id,
      }).then((res) => {
        if (!res?.error) {
          setOpen(false);

          if (res?.data) {
            setAccountProfile(res?.data);
          }
        }
      });
    },
    [setOpen, id]
  );

  const profileHandler = useCallback(() => {
    historyUtils.push(`/profile/?id=${accountProfile?.id}`);
  }, [accountProfile?.id]);

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
            src={accountProfile?.image || ""}
            className={styles.profileImg}
            alt=""
          />
          <div className={styles.info}>
            <div className={styles.profileName}>
              {accountProfile?.name || "N/A"}
            </div>
            <div className={styles.designation}>
              {accountProfile?.designation || "N/A"}
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
        <div className={styles.val}>{accountProfile?.contact || "N/A"}</div>
        <div className={styles.val}>{accountProfile?.email}</div>
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

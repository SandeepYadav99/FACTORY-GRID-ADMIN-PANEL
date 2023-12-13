import React from 'react'
import styles from './AccountQuality.module.css'
import { ButtonBase } from '@material-ui/core'
const AccountQuality = () => {
  return (
    <div className={styles.plain}>
    <div className={styles.accountFlex}>
      <div className={styles.headings}>Account Quality</div>
      <div>
        <ButtonBase className={styles.view}>Manage</ButtonBase>
      </div>
    </div>

    <div className={styles.blockFlex}>
      <div className={styles.bottomProfile}>
        <img
          src={require("../../../../../assets/img/download.png")}
          className={styles.profileImg}
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
  </div>
  )
}

export default AccountQuality
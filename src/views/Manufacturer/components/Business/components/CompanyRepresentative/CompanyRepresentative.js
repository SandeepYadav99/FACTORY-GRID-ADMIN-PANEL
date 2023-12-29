import React from 'react'
import styles from './Style.module.css'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
const CompanyRepresentative = ({userProfile}) => {
  return (
    <div><div className={styles.blockFlex}>
    <div className={styles.bottomProfile}>
      <img
        src={userProfile?.representatives?.profile_image}
        className={styles.profileImg}
        alt=""
      />
      <div className={styles.info}>
        <div className={styles.profileName}>
          {
            userProfile?.representatives?.first_name}{" "}
          {
            userProfile?.representatives?.last_name}
        </div>
        <div className={styles.designation}>{userProfile?.representatives?.designation}</div>
      </div>
    </div>
    <div>
      <div className={styles.kyc}>
        <span>
          <VerifiedUserIcon className={styles.verified} />
        </span>{" "}
        KYC Verified
      </div>
    </div>
  </div>
  <br />
  <div>
    <div className={styles.key}>Contact Information</div>
    <div className={styles.val}>{ userProfile?.representatives?.contact}</div>
    <div className={styles.val}>{ userProfile?.representatives?.email}</div>
  </div></div>
  )
}

export default CompanyRepresentative
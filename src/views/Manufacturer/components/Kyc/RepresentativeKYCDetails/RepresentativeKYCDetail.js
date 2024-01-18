import React from "react";
import styles from "./Style.module.css";
import { VerifiedUser } from "@material-ui/icons";
const RepresentativeKYCDetail = ({ userProfile }) => {
  console.log(userProfile, "Profile");
  const {
    name,
    pan_number,
    aadhar_back,
    aadhar_front,
    aadhar_number,
    aadhar_verified,
    designation,
    member_type,
    pan_card,
  } = userProfile;
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.headerTitle}>
            <span>
              <b>Representative KYC Details</b>
            </span>
          </div>
          <div className={styles.gaps} />
          <div className={styles.kycContainer}>
            <div>
              <div className={styles.title}>Name</div>
              <div>
                <div>{name}</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>Designation</div>
              <div>
                <div>{designation}</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN No.</div>
              <div>
                <div>{pan_number}</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN File</div>
              <div>
                <a href={pan_card}>Pan File</a>
              </div>
            </div>
          </div>
          <div className={styles.gaps} />
          <div className={styles.kyc2}>
            <div>
              <div className={styles.title}>Aadhar Number</div>
              <div>
                <div>{aadhar_number}</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>Aadhar Front</div>
              <div>
                <a href={aadhar_front}>Adhar Front</a>
              </div>
            </div>
            <div>
              <div className={styles.title}>Aadhar Back</div>
              <div>
                <a href={aadhar_back}>Aadhar Back</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gaps} />
      </div>
    </div>
  );
};

export default RepresentativeKYCDetail;

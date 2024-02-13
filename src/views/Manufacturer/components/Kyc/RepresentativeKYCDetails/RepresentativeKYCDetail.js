import React from "react";
import styles from "./Style.module.css";

const RepresentativeKYCDetail = ({ userProfile }) => {
 
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
  } = userProfile || {};
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
                <div>{name ? name :"N/A"}</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>Designation</div>
              <div>
                <div>{designation || "N/A"}</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN No.</div>
              <div>
                <div>{pan_number || "N/A"}</div>
              </div>
            </div>

            <div>
              <div className={styles.title}>PAN File</div>
              <div>
                {name ?  <a href={pan_card}  target="_blank">Pan File</a> :"N/A"}
               
              </div>
            </div>
            
          </div>
          <div className={styles.gaps} />
          <div className={styles.kyc2}>
            <div>
              <div className={styles.title}>Aadhar Number</div>
              <div>
                <div>{aadhar_number || "N/A"}</div>
              </div>
            </div>

            <div style={{marginRight:"5%"}}>
              <div className={styles.title}>Aadhar Front</div>
              <div>
                {name ? 
                <a href={aadhar_front} target="_blank">Aadhar Front</a> : <div>N/A</div>
                
              }
          
              </div>
            </div>
            <div style={{marginRight:"1%"}}>
              <div className={styles.title}>Aadhar Back</div>
              <div>
                {name ? 
                <a href={aadhar_back}  target="_blank">Aadhar Back</a>:<div>N/A</div>
                }
              </div>
            </div>
           
            <div style={{visibility:"hidden"}}>
              <div className={styles.title}>Aadhar Back</div>
              <div>
                {name ? 
                <a href={aadhar_back}  target="_blank">Aadhar Back</a> :"N/A"
                }
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

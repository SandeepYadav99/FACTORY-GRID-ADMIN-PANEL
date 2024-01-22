import React from "react";
import styles from "../../Style.module.css";
import { ButtonBase, Tooltip, withStyles } from "@material-ui/core";
import SimplePopover from "../../../../../../components/FormFields/SimplePopover/SimplePopover";
import bankImage from "../../../../../../assets/img/sent_blue.svg";
const BankDetail = ({ bankdetail , bakID}) => {


 

  const viewFile = () => {
    const fileUrl = bankdetail?.bank_canceled_cheque;

    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
    }
  };
  return (
    <div>
      <div className={styles.bankdetailContainer}>
        <div>
          <div>
            <div className={styles.key}>Account Holder Name</div>
            <div style={{ display: "flex" }}>
              <div className={styles.val}>{ bankdetail?.benificiery_name} </div>
              <div style={{ marginLeft: "10px" }}>
                <SimplePopover
                  title={bankdetail?.accout_holder_status}
                  type={"accout_holder_status"}
                 
                ></SimplePopover>
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className={styles.key}>Bank Name & Branch</div>
            <div style={{ display: "flex" }}>
              <div className={styles.val}>
                {bankdetail?.bank_name}
                {bankdetail?.branch_name}
              </div>
              <div style={{ marginLeft: "10px" }}>
                <SimplePopover
                  title={bankdetail?.benificiery_status}
                  type={"benificiery_status"}
                ></SimplePopover>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.accountInfo}>
            <div className={styles.key}>Account No.</div>
            <div style={{ display: "flex" }}>
              <div className={styles.val}>{bankdetail.bank_account_number}</div>
              <div style={{ marginLeft: "10px" }}>
                <SimplePopover
                  title={bankdetail?.account_no_status}
                  type={"account_no_status"}
                ></SimplePopover>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.key}>IFSC Code</div>
            <div style={{ display: "flex" }}>
              <div className={styles.val}>{bankdetail.bank_ifsc_code}</div>
              <div style={{ marginLeft: "10px" }}>
                <SimplePopover
                  title={bankdetail?.ifsc_status}
                  type={"ifsc_status"}
                ></SimplePopover>
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className={styles.accountInfo} style={{ display: "flex" }}>
              <div>
                <span className={styles.brochure}>Cancelled Cheque</span>
                <ButtonBase className={styles.view} onClick={() => viewFile()}>
                  {/* onClick={() => viewFile()} */}
                  (View File)
                </ButtonBase>
              </div>
              <div>
                {bankdetail?.cancelled_check_status && (
                  <div style={{ marginLeft: "10px" }}>
                    <div style={{ marginLeft: "10px" }}>
                      <SimplePopover
                        title={bankdetail?.cancelled_check_status}
                        type={"cancelled_check_status"}
                      ></SimplePopover>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetail;

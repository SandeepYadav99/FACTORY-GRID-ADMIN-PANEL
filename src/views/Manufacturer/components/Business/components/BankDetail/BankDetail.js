import React from "react";
import styles from "../../Style.module.css";
import { ButtonBase } from "@material-ui/core";
import SimplePopover from "../../../../../../components/FormFields/SimplePopover/SimplePopover";
const BankDetail = ({ bankdetail }) => {
  return (
    <div>
      <div>
        <div className={styles.key}>Account Holder Name</div>
        <div style={{ display: "flex" }}>
          <div className={styles.val}>{bankdetail?.benificiery_name} </div>
          <div style={{ marginLeft: "10px" }}>
            <SimplePopover
              type={"BANKS"}
              statusType={bankdetail?.accout_holder_status}
            />
          </div>
          <div></div>
        </div>
        <br />
        <div className={styles.bankingFlex}>
          <div className={styles.accountInfo}>
            <div className={styles.key}>Account No.</div>
            <div style={{display:"flex"}}>

            <div className={styles.val} >{bankdetail.bank_account_number}</div>
            <div style={{ marginLeft: "10px" }}>
              <SimplePopover
                type={"BANKS"}
                statusType={bankdetail?.account_no_status}
              />
            </div>
            </div>
          </div>

          <div className={styles.accountInfo}>
            <div className={styles.key}>IFSC Code</div>
            <div style={{display:"flex"}}>
            <div className={styles.val} >{bankdetail.bank_ifsc_code}</div>
            <div style={{ marginLeft: "10px" }}>
              <SimplePopover
                type={"BANKS"}
                statusType={bankdetail?.ifsc_status}
              />
            </div>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.key}>Bank Name & Branch</div>
        <div style={{display:"flex"}}>
        <div className={styles.val} >
          {bankdetail?.bank_name}
          {bankdetail?.branch_name}
        </div>
        <div style={{ marginLeft: "10px" }}>
              <SimplePopover
                type={"BANKS"}
                statusType={bankdetail?.benificiery_status}
              />
            </div>
            </div>
      </div>
    </div>
  );
};

export default BankDetail;

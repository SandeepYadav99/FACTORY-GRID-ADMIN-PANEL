import React from "react";
import styles from "../../Style.module.css";
import { ButtonBase } from "@material-ui/core";
const BankDetail = ({ bankdetail }) => {
  return (
    <div>
      <div>
        <div className={styles.key}>Account Holder Name</div>
        <div className={styles.val}>{bankdetail?.benificiery_name} </div>
        <br />
        <div className={styles.bankingFlex}>
          <div className={styles.accountInfo}>
            <div className={styles.key}>Account No.</div>
            <div className={styles.val}>{bankdetail.bank_account_number}</div>
          </div>

          <div className={styles.accountInfo}>
            <div className={styles.key}>IFSC Code</div>
            <div className={styles.val}>{bankdetail.bank_ifsc_code}</div>
          </div>
        </div>
        <br />
        <div className={styles.key}>Bank Name & Branch</div>
        <div className={styles.val}>
          {bankdetail?.bank_name}
          {bankdetail?.branch_name}
        </div>
      </div>
    </div>
  );
};

export default BankDetail;

import React from "react";
import styles from "../../Style.module.css";
import { ButtonBase, Tooltip, withStyles } from "@material-ui/core";
import SimplePopover from "../../../../../../components/FormFields/SimplePopover/SimplePopover";
import bankImage from "../../../../../../assets/img/sent_blue.svg";
const BankDetail = ({ bankdetail }) => {
  if (!bankdetail) {
    return <div>Not Found</div>;
  }

  const CustomTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: "#e3f2fd",
      color: "black",
      fontSize: theme.typography.fontSize,
    },
  }))(Tooltip);

  const viewFile = () => {
    const fileUrl = bankdetail?.bank_canceled_cheque;

    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
    }
  };
  return (
    <div>
      <div  className={styles.bankdetailContainer}>
        <div>
          <div>
            <div className={styles.key}>Account Holder Name</div>
            <div style={{ display: "flex" }}>
              <div className={styles.val}>{bankdetail?.benificiery_name} </div>
              <div style={{ marginLeft: "10px" }}>
                <CustomTooltip
                  title={bankdetail?.accout_holder_status}
                  placement="top-start"
                >
                  <img src={bankImage} alt="" height={15} width={15} />
                </CustomTooltip>
              </div>
            </div>
          </div>
          <br/>
          <div>
            <div className={styles.key}>Bank Name & Branch</div>
            <div style={{ display: "flex" }}>
              <div className={styles.val}>
                {bankdetail?.bank_name}
                {bankdetail?.branch_name}
              </div>
              <div style={{ marginLeft: "10px" }}>
              
                <CustomTooltip
                  title={bankdetail?.benificiery_status}
                  placement="top-start"
                >
                  <img src={bankImage} alt="" height={15} width={15} />
                </CustomTooltip>
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
                {/* <SimplePopover
                  type={"BANKS"}
                  statusType={bankdetail?.account_no_status}
                /> */}
                <CustomTooltip
                  title={bankdetail?.account_no_status}
                  placement="top-start"
                >
                  <img src={bankImage} alt="" height={15} width={15} />
                </CustomTooltip>
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
                <CustomTooltip
                  title={bankdetail?.ifsc_status}
                  placement="top-start"
                >
                  <img src={bankImage} alt="" height={15} width={15} />
                </CustomTooltip>
              </div>
            </div>
          </div>
          <br/>
          <div>
            <div className={styles.accountInfo} style={{display:"flex"}}>
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
                    <CustomTooltip title={bankdetail?.cancelled_check_status}>
                      <img src={bankImage} alt="" height={15} width={15} />
                    </CustomTooltip>
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

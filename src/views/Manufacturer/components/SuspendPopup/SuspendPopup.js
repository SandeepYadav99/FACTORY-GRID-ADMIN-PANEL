import React from "react";
import {
 
  ButtonBase,
 
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { serviceGetUserSuspend } from "../../../../services/CustomersRequest.service";




const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SuspendPopup = ({ isOpen, handleToggle, candidateId }) => {
  const classes = useStyles();
  
  const handleSubmit = () => {
    if (candidateId) {
      serviceGetUserSuspend({ id: candidateId }).then((res) => {
        if (!res?.error) {
          handleToggle();
          // historyUtils.goBack()
          SnackbarUtils.success("Suspend Successfully")
        }else{
          SnackbarUtils.error(" Not Found")
        }
      });
     }
  };
  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/*<DialogTitle id="alert-dialog-title">*/}
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            {/* <div className={styles.upperFlex}>Update Status</div> */}
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Suspended User</div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
            Please confirm you wish to mark user as suspended. 
            </div>
          </div>

          
       
          <div className={styles.printFlex}>
          <ButtonBase
               onClick={handleToggle}
            
              className={
               styles.createBtn 
              }
            >
              Cancel
            </ButtonBase>
            <ButtonBase
               onClick={handleSubmit}
            
              className={
               styles.createBtn 
              }
            >
              CONFIRM
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SuspendPopup;

import React, { useCallback, useState } from "react";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

import SnackbarUtils from "../../../../../libs/SnackbarUtils";

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

const ConfirmationPopup = ({ isOpen, handleToggle, candidateId, status }) => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(() => {}, [candidateId, status]);
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
            <div className={styles.heading}>
              {status === "SUSPENDED" ? "Active User" : "Suspend User"}{" "}
            </div>
            <div className={styles.newLine}></div>
            <div className={styles.des}>
              Please confirm you wish to mark user as{" "}
              {status === "SUSPENDED" ? "active" : "suspend"} .
            </div>
          </div>

          <div className={styles.printFlex}>
            <ButtonBase onClick={handleSubmit} className={styles.createBtn}>
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                " CONFIRM"
              )}
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmationPopup;

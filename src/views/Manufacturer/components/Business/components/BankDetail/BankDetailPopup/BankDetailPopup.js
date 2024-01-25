import React, { useCallback, useState } from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

import CustomSelectField from "../../../../../../../components/FormFields/SelectField/SelectField.component";
import useBankDetailHook from "./BankDetailHook";

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

const BankDetailPopup = ({ isOpen, handleToggle, bankId , status}) => {
  const classes = useStyles();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    isSubmitting
  } = useBankDetailHook({ isOpen, handleToggle, bankId });

 
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
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                 isError={errorData?.comment}
                 errorText={errorData?.comment}
                label={"Status"}
                value={form?.comment}
                handleChange={(value) => {
                   changeTextData(value, "comment");
                }}
              >
                <MenuItem value={"VERIFIED"}>Verified </MenuItem>
                <MenuItem value={"NOT_VERIFIED"}>Not verified</MenuItem>
                <MenuItem value={"IN_REVIEW"}>In Review </MenuItem>
                <MenuItem value={"ALERT"}>Alert </MenuItem>
              </CustomSelectField>
            </div>
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

export default BankDetailPopup;

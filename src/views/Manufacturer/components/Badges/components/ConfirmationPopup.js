import React, { useCallback, useState } from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import { Add, Close, Delete } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import CustomSelectField from "../../../../../FormFields/SelectField/SelectField.component";
import useConfirmationHook from "./ConfirmationHook";

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
    // position: "absolute",
    // right: "10px",
    // top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationPopup = ({
  isOpen,
  handleToggle,
  candidateId,
  status,
  types,
}) => {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errorData, form, changeTextData, handleSubmit } =
    useConfirmationHook();

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
        {types === "Delete" ? (
          <div className={styles.resetPasswordWrapper}>
            <div className={styles.resetWrapper1}>
              {/* <div className={styles.upperFlex}>Update Status</div> */}
              <div className={styles.deleteAction}>
                <ButtonBase onClick={handleToggle}>
                  <Close />
                </ButtonBase>
              </div>
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
        ) : (
          <>
            <div className={styles.resetPasswordWrapper}>
              <div className={styles.closeAction}>
                <ButtonBase onClick={handleToggle}>
                  <Close />
                </ButtonBase>
              </div>
              <div className={styles.resetWrapper}>
                <div className={styles.upperFlex}>Add Badge</div>
              </div>
              <div>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <CustomSelectField
                      isError={errorData?.type}
                      errorText={errorData?.type}
                      label={"Choose Badge"}
                      value={form?.type}
                      handleChange={(value) => {
                        changeTextData(value, "type");
                      }}
                    >
                      <MenuItem value="TOP_MANUFACTURER">
                        Top Manufacturer
                      </MenuItem>
                    </CustomSelectField>
                  </div>
                </div>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <CustomSelectField
                      isError={errorData?.type}
                      errorText={errorData?.type}
                      label={"Choose Badge"}
                      value={form?.type}
                      handleChange={(value) => {
                        changeTextData(value, "type");
                      }}
                    >
                      <MenuItem value="TOP_SELLER">Top 10 Seller</MenuItem>
                    </CustomSelectField>
                  </div>
                  <ButtonBase className={styles.deletebase}>
                    <Delete />
                  </ButtonBase>
                </div>
              </div>
              <div className={styles.printFlex}>
                <ButtonBase className={styles.addAction}>
                  <Add />
                  Add More
                </ButtonBase>
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
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ConfirmationPopup;

import React from "react";
import { Button, ButtonBase, MenuItem } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import useStatusPopUpHook from "./StatusPopUpHook";


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

const StatusPopUp = ({ isOpen, handleDialog, candidateId }) => {
  const classes = useStyles();

  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    listData,
  } = useStatusPopUpHook({ isOpen, handleDialog, candidateId });

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
        <div className={styles.resetPasswordWrapper}>
          <div className={styles.resetWrapper}>
            <ButtonBase
              classes={{ root: classes.closeBtn }}
              onClick={handleDialog}
            >
              <Close />
            </ButtonBase>
          </div>
          <div className={styles.headingWrapper}>
            {/* <div className={styles.heading}>Approve Request</div>
            <div className={styles.newLine}></div> */}
            <div className={styles.des}>Update Status</div>
          </div>

          <div className={styles.fieldWrapper}>
            <div>
              <CustomSelectField
                isError={errorData?.status}
                errorText={errorData?.status}
                label={"Choose Status"}
                value={form?.status}
                handleChange={(value) => {
                   changeTextData(value, "status");
                }}
              >
                <MenuItem value="VISIBLE">Visible</MenuItem>
                <MenuItem value="TELEPHONIC">InActive</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={styles.printFlex}>
            <ButtonBase onClick={()=>{}} className={styles.createBtn}>
            UPDATE
            </ButtonBase>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default StatusPopUp;

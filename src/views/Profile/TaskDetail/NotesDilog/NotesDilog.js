import React, { memo } from "react";
import { Button, ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Styles.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../../FormFields/TextField.component";

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

const NotesDilog = ({
  isOpen,
  handleToggle,
  suspendItem,
  empId,
  changeTextData,
  onBlurHandler,
  form,
  handleSubmit,
  errorData,
}) => {
  const classes = useStyles();

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
              onClick={handleToggle}
            >
              <Close />
            </ButtonBase>
          </div>
          <div>
            <h2 className={styles.heading}>Add Notes</h2>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.descriptions}
                errorText={errorData?.descriptions}
                label={"Note (Max 500 Characters )"}
                value={form?.descriptions}
                onTextChange={(text) => {
                  changeTextData(text, "descriptions");
                }}
                multiline
                rows={4}
              />
            </div>
          </div>

          <div className={styles.printFlex}>
            <div style={{ float: "right" }}>
              <Button
                variant={"contained"}
                color={"primary"}
                type={"submit"}
                onClick={handleSubmit} // handleSubmit
              >
                SAVE & SUBMIT
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default memo(NotesDilog);

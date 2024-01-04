
import React from "react";
import { Button, ButtonBase } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

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

const DeleteModal = ({ isOpen, handleToggle,  suspendItem,empId }) => {
  const classes = useStyles();
 

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        // fullWidth={true}
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
          <div className={styles.headingWrapper}>
            <div className={styles.heading}>Are You Sure</div>

            <div className={styles.des}>
              Do you really want to delete the item?
            </div>
          </div>

          <div className={styles.printFlex}>
            <div>
              <Button onClick={handleToggle} color="primary">
                Disagree
              </Button>
              <Button onClick={suspendItem} color="primary">
                Agree{" "}
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteModal;

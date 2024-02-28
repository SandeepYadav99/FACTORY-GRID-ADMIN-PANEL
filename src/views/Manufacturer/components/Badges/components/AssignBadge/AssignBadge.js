import React, { useCallback, useState } from "react";
import { ButtonBase, CircularProgress, MenuItem } from "@material-ui/core";
import { Add, Close, Delete } from "@material-ui/icons";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";

import useAssignBadgeHook from "./AssignBadgeHook";
import CustomSelectField from "../../../../../../FormFields/SelectField/SelectField.component";

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

const AssignBadge = ({ isOpen, handleToggle, candidateId, status, types }) => {
  const classes = useStyles();

  const {
    errorData,
    form,
    changeTextData,
    handleSubmit,
    addMoreBadge,
    deleteBadges,
    chooseBadges,
    handleReset,
  } = useAssignBadgeHook({ isOpen, handleToggle });

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        onClose={() => {
          handleToggle();
         
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <div className={styles.resetPasswordWrapper}>
            <div className={styles.closeAction}>
              <ButtonBase
                onClick={() => {
                  handleToggle();
                  // window.location.reload();
                }}
              >
                <Close />
              </ButtonBase>
            </div>
            <div className={styles.resetWrapper}>
              <div className={styles.upperFlex}>Add Badge</div>
            </div>
            {form?.map((form, index) => (
              <div key={index}>
                <div className={"formFlex"}>
                  <div className={"formGroup"}>
                    <CustomSelectField
                      isError={errorData[`chooseTopBadge${index}`]}
                      errorText={errorData[`chooseTopBadge${index}`]}
                      label={"Choose Badge"}
                      value={form?.chooseTopBadge}
                      handleChange={(value) => {
                        changeTextData(value, "chooseTopBadge", index);
                      }}
                      // onBlur={() => {
                      //   onBlurHandler("chooseTopBadge");
                      // }}
                    >
                      {chooseBadges?.map((choose) => {
                        return (
                          <MenuItem value={choose?.id}>{choose?.name}</MenuItem>
                        );
                      })}
                    </CustomSelectField>
                  </div>
                  {index > 0 && (
                    <ButtonBase
                      className={styles.deletebase}
                      onClick={() => deleteBadges(index)}
                    >
                      <Delete />
                    </ButtonBase>
                  )}
                </div>
              </div>
            ))}

            <div className={styles.printFlex}>
              <ButtonBase className={styles.addAction} onClick={addMoreBadge}>
                <Add />
                Add More
              </ButtonBase>
            </div>
            <div className={styles.printFlex}>
              <ButtonBase
                onClick={() => handleSubmit()}
                className={styles.createBtn}
              >
                {/* {isSubmitting ? (
                    <CircularProgress color="success" size="20px" />
                  ) : ( */}
                CONFIRM
                {/* )} */}
              </ButtonBase>
            </div>
          </div>
        </>
      </Dialog>
    </div>
  );
};

export default AssignBadge;

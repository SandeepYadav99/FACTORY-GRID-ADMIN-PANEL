import React, { Component } from "react";

import {
  Button,
  MenuItem,
  withStyles,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import startsWith from "lodash.startswith";
import styles from "../../Style.module.css";

// import {serviceProviderUserCheck} from "../../services/User.service";

import { makeStyles } from "@material-ui/styles";

import File from "../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../FormFields/TextField.component";
import CustomSelectField from "../../../../FormFields/SelectField/SelectField.component";
import CustomPhoneContactField from "../../../../FormFields/CustomPhoneContact.componet";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const User = ({
  handleToggleSidePannel,
  errorData,
  changeTextData,
  form,
  onBlurHandler,
  handleSubmit,
  image,
  setPhoneContact,
  setTypeOf,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <div className={"formFlex"} style={{ justifyContent: "center" }}>
          <div className={styles.profileImage}>
            <File
              // bannerLabel="Profile"
              max_size={2 * 1024 * 1024}
              type={["jpg", "png", 'jpeg']}
              fullWidth={true}
              name="image"
              accept={"image/*"}
              label="Profile"
              // show_image={true}
              link={""}
              user_image
              error={errorData?.image}
              value={form?.image}
              default_image={image ? image : ""}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "image");
                }
              }}
            />
          </div>
        </div>

        <div className={styles.formContainer}>
          <div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Full Name"}
                  value={form?.name}
                  onTextChange={(text) => {
                    changeTextData(text, "name");
                  }}
                  onBlur={() => {
                    onBlurHandler("name");
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.email}
                  errorText={errorData?.email}
                  label={"Email"}
                  value={form?.email}
                  onTextChange={(text) => {
                    changeTextData(text, "email");
                  }}
                  onBlur={() => {
                    onBlurHandler("email");
                  }}
                />
              </div>
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomPhoneContactField
              
                isError={errorData?.contact}
                errorText={errorData?.contact}
                value={form?.contact}
                onTextChange={(text) => {
                  changeTextData(text, "contact");
                }}
                // onBlur={() => {
                //   onBlurHandler("contact");
                // }}
                isValid={(value, country) => {
                  if (value.match(/12345/)) {
                    return "";
                  } else if (value.match(/1234/)) {
                    return false;
                  } else {
                    return true;
                  }
                }}
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.role}
                errorText={errorData?.role}
                label={"User Role"}
                value={form?.role}
                handleChange={(value) => {
                  changeTextData(value, "role");
                }}
              >
                <MenuItem value={"MANAGER"}>Manager</MenuItem>
                <MenuItem value={"OWNER"}>Owner</MenuItem>
              </CustomSelectField>
            </div>
          </div>

          {/* <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Field
              fullWidth={true}
              name="employee_id"
              //type={'number'}
              component={renderOutlinedTextField}
              margin={"dense"}
              label="Employee ID"
            />
          </div>
        </div> */}
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.employee_id}
                errorText={errorData?.employee_id}
                label={"Employee ID"}
                value={form?.employee_id}
                onTextChange={(text) => {
                  changeTextData(text, "employee_id");
                }}
                onBlur={() => {
                  onBlurHandler("employee_id");
                }}
              />
            </div>
          </div>
          <div className={styles.saveButton}>
            <Button
              variant={"contained"}
              color={"primary"}
              type={"button"}
              onClick={() => {
                handleSubmit();
                setTypeOf("PersonalInfo");
              }}
            >
              Save and Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// const ReduxForm = reduxForm({
//   form: "user", // a unique identifier for this form
//   // validate,
//   // asyncValidate,
//   enableReinitialize: true,
//   onSubmitFail: (errors) => {
//     EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
//       error: "Please enter values",
//       type: "error",
//     });
//   },
// })(withStyles( { withTheme: true })(User));

export default User;

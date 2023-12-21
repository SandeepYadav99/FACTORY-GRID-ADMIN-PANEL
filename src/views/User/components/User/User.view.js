import React, { Component } from "react";

import { Button, MenuItem } from "@material-ui/core";
import styles from "../../Style.module.css";
import { makeStyles } from "@material-ui/styles";
import File from "../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../FormFields/TextField.component";
import CustomSelectField from "../../../../FormFields/SelectField/SelectField.component";

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
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={styles.headerFlex}></div>
      <div>
        <div className={"formFlex"} style={{ justifyContent: "center" }}>
          <div className={styles.profileImage}>
            <File
              // imageClass={styles.inputFileUploader}
              // className={styles.profileImage1}
              max_size={2 * 1024 * 1024}
              type={["jpg", "png", "pdf"]}
              fullWidth={true}
              name="image"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.image}
              value={form?.image}
              link={""}
              default_image={image ? image : ""}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "image");
                }
              }}
            />
          </div>
        </div>

        <div style={{ width: "50%", margin: "auto" }}>
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
              <CustomTextField
                isError={errorData?.contact}
                errorText={errorData?.contact}
                label={"Phone No"}
                margin={"dense"}
                // type={"number"}
                value={form?.contact}
                onTextChange={(text) => {
                  changeTextData(text, "contact");
                }}
                onBlur={() => {
                  onBlurHandler("contact");
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
              type={"submit"}
              onClick={handleSubmit}
            >
              Save and Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

import React from "react";

import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

// import styles from "";

import CustomRadioLabel from "../../../../components/CustomRadioLabel/CustomRadioLabel.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import CustomSwitch from "../../../../FormFields/CustomSwitch";

import CustomCheckbox from "../../../../FormFields/CustomCheckbox";
import { makeStyles } from "@material-ui/styles";
import slugify from "slugify";
import File from "../../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../../FormFields/TextField.component";
import styles from "../Update/Style.module.css";
import useServiceUpdateHook from "./UpdateDetailHooks";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const ServiceUpdateView = ({
  handleToggleSidePannel,
  isSidePanel,
 
  details,
}) => {
  const {
    form,
    errorData,
    selectedValues,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    logo,
    data,
    handleDelete,
    listData,
    isSubmitting,
  } = useServiceUpdateHook({
    handleToggleSidePannel,
    isSidePanel,
  
    details,
  });
  const classes = useStyles();

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Service</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
        {data && (
          <IconButton
            variant={"contained"}
            className={classes.iconBtnError}
            onClick={handleDelete}
            type="button"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>

      <div>
        <div className={"formFlex"} style={{ alignItems: "center" }}>
          <div className={""} style={{ margin: "0px 20px" }}>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={2 * 1024 * 1024}
              type={["jpg", "png", "pdf", "jpeg"]}
              fullWidth={true}
              name="logo"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.logo}
              value={form?.logo}
              default_image={logo ? logo : ""}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "logo");
                }
              }}
            />
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={"Service Name"}
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

     

        <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.slug}
                errorText={errorData?.slug}
                label={"Slug"}
                value={form?.slug}
                onTextChange={(text) => {
                  changeTextData(slugify(text.toLowerCase()), "slug");
                }}
                
                onBlur={() => {
                  onBlurHandler("slug");
                }}
              />
            </div>
          </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.description}
              errorText={errorData?.description}
              label={"Description"}
              value={form?.description}
              onTextChange={(text) => {
                changeTextData(text, "description");
              }}
              onBlur={() => {
                onBlurHandler("description");
              }}
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
            type={"number"}
              isError={errorData?.priority}
              errorText={errorData?.priority}
              label={"Priority"}
              value={form?.priority}
              onTextChange={(text) => {
                changeTextData(text, "priority");
              }}
              onBlur={() => {
                onBlurHandler("priority");
              }}
            />
          </div>
        </div>

        <div>
          <label>Applies To : </label>
          <div>
            <CustomRadioLabel
              name={"apply_to"}
              firstValue="CUSTOMER"
              secondValue="MANUFACTURE"
              thirdValue={"BOTH"}
              handleChange={changeTextData}
              defaultValue={form?.apply_to}
            />
          </div>
        </div>

        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
            <CustomSwitch
              value={form?.status}
              handleChange={() => {
                changeTextData(!form?.status, "status");
              }}
              label={`Active`}
            />
          </h4>
        </div>
       

    

          <div>
          <div className={"formGroup"}>
            <CustomCheckbox
              color={"primary"}
              handleChange={() => {
                changeTextData(!form?.is_featured, "is_featured");
              }}
              label={"Featured"}
              checked={form?.is_featured}
            />
          </div>
        </div>


        <div style={{ float: "right" }}>
          <Button
            variant={"contained"}
            color={"primary"}
            type={"submit"}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "UPDATE"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceUpdateView);

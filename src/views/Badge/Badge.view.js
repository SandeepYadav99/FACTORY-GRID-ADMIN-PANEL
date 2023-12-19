import React  from "react";

import {
  Button,
 
  IconButton,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";


import styles from "./Style.module.css";

import CustomRadioLabel from "../../components/CustomRadioLabel/CustomRadioLabel.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import { makeStyles } from "@material-ui/styles";

import useBadgeCreateHook from "./BadgeCreateHook";
import File from "../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../FormFields/TextField.component";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const BadgeView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,

    handleSubmit,
    onBlurHandler,
    changeTextData,
    logos,
    data,
    handleDelete,

  } = useBadgeCreateHook({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

 

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Badge</div>
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
               default_image={logos ? logos : ""}
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
                  label={" Badge Name"}
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
          <label>Applies To : </label>
          <div>
            <CustomRadioLabel
              name={"apply_to"}
              firstValue="Marketer"
              secondValue="Vendor"
              thirdValue={"Both"}
              handleChange={changeTextData}
            />
          </div>
        </div>

        <div>
          <label>Logic :</label>
          <div>
            <CustomRadioLabel
              name={"logic"}
              firstValue="Automatic"
              secondValue="Manual"
               handleChange={changeTextData}
            />
          </div>
        </div>
      
    
        <div style={{ float: "right" }}>
          <Button variant={"contained"} color={"primary"} type={"submit"} onClick={handleSubmit}>
            {empId ? "UPDATE"  : "Submit"}
            
          </Button>
        </div>
      </div>

    </div>
  );
};

export default BadgeView;

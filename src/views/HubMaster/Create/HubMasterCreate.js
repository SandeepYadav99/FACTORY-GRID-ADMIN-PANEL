import React from "react";

import { Box, Button, IconButton, MenuItem } from "@material-ui/core";
import {
  ArrowRight,
  Delete as DeleteIcon,
  ExpandMore,
} from "@material-ui/icons";

import styles from "./Style.module.css";

import CustomRadioLabel from "../../../components/CustomRadioLabel/CustomRadioLabel.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import { makeStyles } from "@material-ui/styles";

import File from "../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../FormFields/TextField.component";
import { TreeItem, TreeView } from "@material-ui/lab";
import CustomSelectField from "../../../FormFields/SelectField/SelectField.component";
import Cascader from "../../../components/FormFields/Cascader/Cascader";
import useHubMasterCreateHook from "./HubMasterCreateHook";
import Geofencing from "./component/Geofencing/Geofencing.component";
import CustomSwitch from "../../../FormFields/CustomSwitch";
import CustomCheckbox from "../../../FormFields/CustomCheckbox";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const HubMasterCreate = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    selectedValues,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    logos,
    data,
    handleDelete,
    listData,
    geofence,
    handleCoordinate,
  } = useHubMasterCreateHook({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Hubs</div>
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
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Hub Name"}
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
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.industry_id}
              errorText={errorData?.industry_id}
              label={"Associated Industries"}
              value={form?.industry_id}
              handleChange={(value) => {
                changeTextData(value, "industry_id");
              }}
            >
              {listData?.map((item) => {
                return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className="formGroup">
            <p>Draw the boundary for the Hub</p>
            <Geofencing polygon={geofence} handleSave={handleCoordinate} />
          </div>
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Status</div>
            <CustomSwitch
              value={form?.is_active}
              handleChange={() => {
                changeTextData(!form?.is_active, "is_active");
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
                changeTextData(!form?.featured, "featured");
              }}
              label={"Featured"}
              checked={form?.featured}
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
            {empId ? "UPDATE" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HubMasterCreate;

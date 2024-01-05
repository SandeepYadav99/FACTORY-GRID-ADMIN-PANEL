import React from "react";

import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import styles from "./Style.module.css";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/styles";
import CustomTextField from "../../../FormFields/TextField.component";
import { Autocomplete } from "@material-ui/lab";
import useHubMasterCreateHook from "./HubMasterCreateHook";
import Geofencing from "./component/Geofencing/Geofencing.component";
import CustomSwitch from "../../../FormFields/CustomSwitch";
import CustomCheckbox from "../../../FormFields/CustomCheckbox";
import DeleteModal from "./DilogModal/DilogModal";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const HubMasterCreate = ({ handleSideToggle, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    listData,
    geofenceCoordinates,

    handleCoordinate,
    isSubmitting,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
  } = useHubMasterCreateHook({ handleSideToggle, isSidePanel, empId });
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
        {empId && (
          <IconButton
            variant={"contained"}
            className={classes.iconBtnError}
            onClick={toggleAcceptDialog}
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
            <Autocomplete
              multiple
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "industry_id");
              }}
              value={form.industry_id || []}
              options={listData || []}
              getOptionLabel={(option) => option.name}
              defaultValue={form.industry_id || []}
              //  getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Associated Industries"
                  error={errorData?.industry_id}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className="formGroup">
            <p>Draw the boundary for the Hub</p>
            <Geofencing
              key={geofenceCoordinates.length > 0}
              polygon={geofenceCoordinates} //     key={geofenceCoordinates.length}
              handleSave={handleCoordinate}
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
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : empId ? (
              "UPDATE"
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
      <DeleteModal
        isOpen={isAcceptPopUp}
        handleToggle={toggleAcceptDialog}
        empId={empId}
        suspendItem={suspendItem}
      />
    </div>
  );
};

export default HubMasterCreate;

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
import useMILESTONECreateHook from "./MilestoneCreateHook";
import Geofencing from "./component/Geofencing/Geofencing.component";
import CustomSwitch from "../../../FormFields/CustomSwitch";
import CustomCheckbox from "../../../FormFields/CustomCheckbox";
import DeleteModal from "./DilogModal/DilogModal";
import QuestionaireChild from '../../../components/Questionnaire/Questionaire.component';
const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
  },
}));

const MILESTONECreate = ({ handleSideToggle, isSidePanel, empId }) => {
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
    questionnaire,
    handleQuestionnaire
  } = useMILESTONECreateHook({ handleSideToggle, isSidePanel, empId });
  const classes = useStyles();

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Milestone</div>
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
              label={"Name"}
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
            <CustomTextField
              isError={errorData?.title}
              errorText={errorData?.title}
              label={"Title"}
              value={form?.title}
              onTextChange={(text) => {
                changeTextData(text, "title");
              }}
              onBlur={() => {
                onBlurHandler("title");
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
     
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Form Action</div>
          </h4>
        </div>
        <div className={"formFlex"} style={{ position: "relative" }}>
          <div className={"formGroup"}>
            <QuestionaireChild
              questionnaire={questionnaire}
               handleQuestionnaire={handleQuestionnaire}
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
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <div className={"heading"}>Publically</div>
            <CustomSwitch
              value={form?.is_publically}
              handleChange={() => {
                changeTextData(!form?.is_publically, "is_publically");
              }}
              label={`Yes`}
            />
          </h4>
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

export default MILESTONECreate;

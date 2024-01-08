import {
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React from "react";
import CustomCheckbox from "../../../FormFields/CustomCheckbox";
import CustomSwitch from "../../../FormFields/CustomSwitch";
import CustomTextField from "../../../FormFields/TextField.component";
import styles from "./Style.module.css";
import useAddTaskCreate from "./AddTaskCreateHook";
import InfoIcon from "@material-ui/icons/Info";
import CustomDatePicker from "../../../FormFields/DatePicker/CustomDatePicker";
import { Autocomplete } from "@material-ui/lab";
import { Search } from "@material-ui/icons";

const AddTaskCreate = ({ handleSideToggle, isSidePanel }) => {
  const {
    form,
    errorData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    isSubmitting,
  } = useAddTaskCreate({ handleSideToggle, isSidePanel });

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Task</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
        {/* {empId && (
        <IconButton
          variant={"contained"}
          className={classes.iconBtnError}
          onClick={toggleAcceptDialog}
          type="button"
        >
          <DeleteIcon />
        </IconButton>
      )} */}
      </div>

      <div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Task Title"}
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
          
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Description"}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
              onBlur={() => {
                onBlurHandler("name");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>
        <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomDatePicker
                  clearable
                  label={"Due Date"}
                  // maxDate={new Date()}
                  onChange={(date) => {
                    changeTextData(date, "event_date");
                  }}
                  value={form?.event_date}
                  isError={errorData?.event_date}
                />
              </div>
            </div>
            <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
             
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "industry_id");
              }}
            
              value={form.industry_id || []}
              options={ []} // listData ||
              getOptionLabel={(option) => option.name}
              defaultValue={form.industry_id || []}
              //  getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Task Category"
                  error={errorData?.industry_id}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
             
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "industry_id");
              }}
            
              value={form.industry_id || []}
              options={ []} // listData ||
              getOptionLabel={(option) => option.name}
              defaultValue={form.industry_id || []}
              //  getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Task Type"
                  error={errorData?.industry_id}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
             
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "industry_id");
              }}
            
              value={form.industry_id || []}
              options={ []} // listData ||
              getOptionLabel={(option) => option.name}
              defaultValue={form.industry_id || []}
              //  getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Task Priority"
                  error={errorData?.industry_id}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Associated User (Optional)"}
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
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Associated Task (Optional)"}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
              onBlur={() => {
                onBlurHandler("name");
              }}
              // icon={"search"}
            />
          
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Comments/notes"}
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
              onBlur={() => {
                onBlurHandler("name");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            {/* <div className={"heading"}>Completed?</div> */}
            <CustomSwitch
              value={form?.status}
              handleChange={() => {
                changeTextData(!form?.status, "status");
              }}
              label={`Completed?`}
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
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
      {/* 
    <DeleteModal
      isOpen={isAcceptPopUp}
      handleToggle={toggleAcceptDialog}
      empId={empId}
      suspendItem={suspendItem}
    /> */}
    </div>
  );
};

export default AddTaskCreate;

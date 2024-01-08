import {
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
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
import CustomSelectField from "../../../FormFields/SelectField/SelectField.component";

const AddTaskCreate = ({ handleSideToggle, isSidePanel }) => {
  const {
    form,
    errorData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    isSubmitting,
    listData,
  } = useAddTaskCreate({ handleSideToggle, isSidePanel });

  const COMENTs = [{ id: 1, name: "Task" }];
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
            <CustomSelectField
              isError={errorData?.assigned_to}
              errorText={errorData?.assigned_to}
              label={"Assigned To"}
              value={form?.assigned_to}
              handleChange={(value) => {
                changeTextData(value, "assigned_to");
              }}
              
            >
              {listData?.map((item) => {
                return (
                  <MenuItem
                    value={item?.id}
                  >{`${item?.name}   (${item?.employee_id})`}</MenuItem>
                );
              })}
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.title}
              errorText={errorData?.title}
              label={"Task Title"}
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
                changeTextData(date, "due_date");
              }}
              value={form?.due_date}
              isError={errorData?.due_date}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "category");
              }}
              value={form.category || []}
              options={COMENTs || []} // listData ||
              getOptionLabel={(option) => option.name}
              defaultValue={form?.category || []}
              //  getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Task Category"
                  error={errorData?.category}
                />
              )}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            {/* <Autocomplete
             
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
            /> */}

            <CustomSelectField
              isError={errorData?.type}
              errorText={errorData?.type}
              label={"Task Type"}
              value={form?.type}
              handleChange={(value) => {
                changeTextData(value, "type");
              }}
            >
              <MenuItem value="TASK1">TASK-1</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            {/* <Autocomplete
             
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
            /> */}
            <CustomSelectField
              isError={errorData?.priority}
              errorText={errorData?.priority}
              label={"Task Priority"}
              value={form?.priority}
              handleChange={(value) => {
                changeTextData(value, "priority");
              }}
            >
              <MenuItem value="TASK1">TASK-1</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.associated_user}
              errorText={errorData?.associated_user}
              label={"Associated User (Optional)"}
              value={form?.associated_user}
              onTextChange={(text) => {
                changeTextData(text, "associated_user");
              }}
              onBlur={() => {
                onBlurHandler("associated_user");
              }}
              icon={"search"}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.associated_task}
              errorText={errorData?.associated_task}
              label={"Associated Task (Optional)"}
              value={form?.associated_task}
              onTextChange={(text) => {
                changeTextData(text, "associated_task");
              }}
              onBlur={() => {
                onBlurHandler("associated_task");
              }}
              icon={"search"}
            />
          </div>
        </div>
        {/* <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.comment}
              errorText={errorData?.comment}
              label={"comments/notes"}
              value={form?.comment}
              onTextChange={(text) => {
                changeTextData(text, "comment");
              }}
              onBlur={() => {
                onBlurHandler("comment");
              }}
              multiline
              rows={3}
            />
          </div>
        </div> */}
        <div className={"headerFlex"}>
          {/* <h4 className={"infoTitle"}>
            {/* <div className={"heading"}>Completed?</div> */}
          {/* <CustomSwitch
              value={form?.status}
              handleChange={() => {
                changeTextData(!form?.status, "status");
              }}
              label={`Completed?`}
            /> */}
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

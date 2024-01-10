import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React from "react";

import CustomTextField from "../../../FormFields/TextField.component";
import styles from "./Style.module.css";
import useAddTaskCreate from "./AddTaskCreateHook";
import InfoIcon from "@material-ui/icons/Info";
import CustomDatePicker from "../../../FormFields/DatePicker/CustomDatePicker";
import { Autocomplete } from "@material-ui/lab";

import { Search } from "@material-ui/icons";
import CustomSelectField from "../../../FormFields/SelectField/SelectField.component";

const AddTaskCreate = ({ handleSideToggle, isSidePanel , handleCreatedTask}) => {
  const {
    form,
    errorData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    isSubmitting,
    listData,
    handleSearchUsers,
    filteredUsers,
    filteredTask,
    filteredAssignedTo,
  } = useAddTaskCreate({ handleSideToggle, isSidePanel , handleCreatedTask});

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
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "assigned_to");
              }}
              value={form.assigned_to || []}
              options={filteredAssignedTo || []} // listData ||
              getOptionLabel={(option) => option?.name || ""}
              defaultValue={form?.assigned_to || []}
              filterOptions={(options, { inputValue }) => {
                // Implement your custom search logic here
                return options?.filter((option) =>
                  option?.name
                    ?.toLowerCase()
                    ?.includes(inputValue?.toLowerCase() || "")
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Assigned To"
                  error={errorData?.assigned_to}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <Search />,
                  }}
                />
              )}
              disableClearable
            />
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
              getOptionLabel={(option) => option.name || ""}
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
            <CustomSelectField
              isError={errorData?.type}
              errorText={errorData?.type}
              label={"Task Type"}
              value={form?.type}
              handleChange={(value) => {
                changeTextData(value, "type");
              }}
            >
              <MenuItem value="DISCUSS">Discuss</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.priority}
              errorText={errorData?.priority}
              label={"Task Priority"}
              value={form?.priority}
              handleChange={(value) => {
                changeTextData(value, "priority");
              }}
            >
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="LOW">Low</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "associated_user");
              }}
              value={form.associated_user || []}
              options={filteredUsers || []} // listData ||
              getOptionLabel={(option) => option?.first_name || ""}
              defaultValue={form?.associated_user || []}
              filterOptions={(options, { inputValue }) => {
                // Implement your custom search logic here
                return options?.filter((option) =>
                  option?.first_name
                    ?.toLowerCase()
                    ?.includes(inputValue?.toLowerCase() || "")
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Associated User (Optional)"
                  error={errorData?.associated_user}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <Search />,
                  }}
                />
              )}
              disableClearable
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "associated_task");
              }}
              value={form.associated_task || []}
              options={filteredTask || []} // listData ||
              getOptionLabel={(option) => option?.title || ""}
              defaultValue={form?.associated_task || []}
              filterOptions={(options, { inputValue }) => {
                // Implement your custom search logic here
                return options?.filter((option) =>
                  option?.title
                    ?.toLowerCase()
                    ?.includes(inputValue?.toLowerCase() || "")
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Associated Task (Optional)"
                  error={errorData?.associated_task}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: <Search />,
                  }}
                />
              )}
              disableClearable
            />
          </div>
        </div>

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
            onClick={()=>{handleSubmit()}}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskCreate;

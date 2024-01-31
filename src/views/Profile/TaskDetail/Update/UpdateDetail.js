import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import React from "react";

import CustomTextField from "../../../../FormFields/TextField.component";
import styles from "./Style.module.css";

import InfoIcon from "@material-ui/icons/Info";
import CustomDatePicker from "../../../../FormFields/DatePicker/CustomDatePicker";
import { Autocomplete } from "@material-ui/lab";

import { Clear, Search } from "@material-ui/icons";
import CustomSelectField from "../../../../FormFields/SelectField/SelectField.component";
import useAddTaskUpdate from "./UpdateDetailHook";
import CustomDateTimePicker from "../../../../FormFields/DatePicker/CustomDateTimePicker";

const AddTaskUpdate = ({
  handleSideToggle,
  isSidePanel,
  handleCreatedTask,
  profileDetails,
  empId,
  details,
}) => {
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
    fetchedAssignedTo,
    fetchedTask,
    fetchedUser,
    categoryLists,
    setFetchedUser
  } = useAddTaskUpdate({
    handleSideToggle,
    isSidePanel,
    handleCreatedTask,
    empId,
    details,
  });

  const COMENTs = [
    { id: "t1", name: "Task1" },
    { id: "t2", name: "Task2" },
  ];

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
              value={form.assigned_to || fetchedAssignedTo || []}
              options={filteredAssignedTo || []}
              getOptionLabel={(option) => `${option?.name} (${option?.email})`}
              renderOption={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={option?.image} style={{ marginRight: 8 }} />
                  <div>{`${option?.name} (${option?.email})`}</div>
                </div>
              )}
              defaultValue={form?.assigned_to || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Assigned To"
                  error={errorData?.assigned_to}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        <Search
                          style={{ marginRight: -20, cursor: "pointer" }}
                        />
                      </>
                    ),
                    startAdornment: (
                      <>
                        <Avatar
                          src={
                            form?.assigned_to.image || fetchedAssignedTo?.image
                          }
                          style={{ marginRight: 8, cursor: "pointer" }}
                        />
                      </>
                    ),
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
            <CustomDateTimePicker
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
        <div className="formFlex">
          <div className={"formGroup"}>
            <Autocomplete
              multiple
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "category");
              }}
              options={categoryLists}
              value={form?.category}
              freeSolo
              selectOnFocus={false}
              // noOptionsText={this._renderNoText}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  /> // disabled={option.length < 2}
                ))
              }
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
        <label className={styles.paragraph}>
          Please press enter to add a category if not found in the search
          results.
        </label>
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
              <MenuItem value="HIGH">High</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
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
              value={form.associated_user || fetchedUser || []}
              options={filteredUsers || []} // listData ||
              // getOptionLabel={(option) => option?.name || ""}
              getOptionLabel={(option) =>
                `${option?.name || ""} ${
                  option?.email ? ` (${option?.email})` : ""
                }`
              }
              renderOption={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar src={option?.image} style={{ marginRight: 8 }} />
                  <div>{`${option?.name} (${option?.email})`}</div>
                </div>
              )}
              defaultValue={form?.associated_user || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Associated User (Optional)"
                  error={errorData?.associated_user}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {form?.associated_user || fetchedUser ? (
                          <Clear
                            onClick={() =>{
                              changeTextData(null, "associated_user")
                              setFetchedUser(null)
                            }}
                          />
                        ) : null}
                        <Search
                          style={{ marginRight: -40, cursor: "pointer" }}
                        />
                      </>
                    ),
                    startAdornment: (
                      <>
                        <Avatar
                          src={
                            form?.associated_user?.image || fetchedUser?.image
                          }
                          style={{ marginRight: 8, cursor: "pointer" }}
                        />
                      </>
                    ),
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
              value={form.associated_task || fetchedTask || []}
              options={filteredTask || []} // listData ||
              getOptionLabel={(option) => option?.title || ""}
              defaultValue={form?.associated_task || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Associated Task (Optional)"
                  error={errorData?.associated_task}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {form?.associated_task || fetchedTask ? (
                          <Clear
                            onClick={() =>
                              changeTextData(null, "associated_task")
                            }
                          />
                        ) : null}
                        <Search
                          style={{ marginRight: -40, cursor: "pointer" }}
                        />
                      </>
                    ),
                  }}
                />
              )}
              // disableClearable
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
            onClick={() => {
              handleSubmit();
            }}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskUpdate;

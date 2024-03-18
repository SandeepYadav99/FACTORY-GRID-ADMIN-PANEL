import React from "react";

import {
  Avatar,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Delete as DeleteIcon, Search } from "@material-ui/icons";

import styles from "./Style.module.css";
import { Autocomplete } from "@material-ui/lab";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import { makeStyles } from "@material-ui/styles";
import useTopManufactureHook from "./TopManufactureHook";
import CustomCheckbox from "../../../components/FormFields/CustomCheckbox";
import CustomTextField from "../../../FormFields/TextField.component";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const TopManufactureCreate = ({
  handleToggleSidePannel,
  isSidePanel,
  empId,
}) => {
  const {
    form,
    errorData,
    fetchedAssignedUser,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    logos,
    data,
    handleDelete,
    listIndustryData,
    isSubmitting,
    businessName,
    fetchIndustryData,
    fetchedBusinessName
  } = useTopManufactureHook({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Add Manufacturer</div>
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
            <Autocomplete
            
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "industry");
              }}
              value={form.industry || fetchIndustryData || [] }
              options={listIndustryData || []}
              getOptionLabel={(option) => option?.name}
              defaultValue={form.industry || []}
              getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Select Industry"
                  error={errorData?.industry}
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
                changeTextData(value, "business_name");
              }}
              value={form.business_name || fetchedBusinessName || [] } //fetchedAssignedUser ||
              options={businessName || []}
              defaultValue={form?.business_name || []}
              getOptionLabel={(option) => option?.company_name}//company_name
              renderOption={(option) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>{`${option?.company_name} `}</div>
                </div>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Business Name"
                  error={errorData?.business_name}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        <Search
                          style={{ marginRight: -20, cursor: "pointer" }}
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
            <CustomCheckbox
              value={form?.features_on}
              handleChange={() => {
               
                changeTextData(!form?.features_on, "features_on");
              }}
              label={`Feature on Home`}
            
            />
          </div>
        </div>
        {form?.features_on && (
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.priority}
                errorText={errorData?.priority}
                label={"Priority"}
                type="number"
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
        )}

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomCheckbox
              value={form?.features_on_industry}
              handleChange={() => {
                changeTextData(
                  !form?.features_on_industry,
                  "features_on_industry"
                );
              }}
              label={`Feature on Industry Page`}
            
            />
          </div>
        </div>
        {form?.features_on_industry && (
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.priority1}
                errorText={errorData?.priority1}
                label={"Priority"}
                type="number"
                value={form?.priority1}
                onTextChange={(text) => {
                  changeTextData(text, "priority1");
                }}
                onBlur={() => {
                  onBlurHandler("priority1");
                }}
              />
            </div>
          </div>
        )}
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
              "SAVE"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopManufactureCreate;

import React from "react";

import {
  Button,
  Chip,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";

import styles from "../Style.module.css";

import CustomRadioLabel from "../../../components/CustomRadioLabel/CustomRadioLabel.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import { makeStyles } from "@material-ui/styles";

import File from "../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../FormFields/TextField.component";
import QuestionaireChild from "../../../components/Questionnaire/Questionaire.component";
import CustomSelectField from "../../../FormFields/SelectField/SelectField.component";
import { Autocomplete } from "@material-ui/lab";
import useIndustryCreateHook from "./IndustryCreateHook";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const IndustryCreateView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
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
    isSubmitting,
    questionnaire,
    handleQuestionnaire
  } = useIndustryCreateHook({ handleToggleSidePannel, isSidePanel, empId });
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
        <div className={"formFlex"}>
          <div className={""} style={{ margin: "0px 20px" }}>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={2 * 1024 * 1024}
              type={["jpg", "png", "jpeg"]}
              fullWidth={true}
              name="logo"
              accept={"image/*"}
              // label="Please Upload Image"
              show_image={true}
              error={errorData?.logo}
              value={form?.logo}
              link={data ? data.logo : ""}
              default_image={data ? data.logo : ""}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "logo");
                }
              }}
            />
          </div>
          <div className={"formGroup"}>
            <CustomTextField
              fullWidth={true}
              name="name"
              // component={renderOutlinedTextField}
              margin={"dense"}
              // normalize={titleNormalize}
              label="Industry Name"
              value={form?.name}
              onTextChange={(text) => {
                changeTextData(text, "name");
              }}
              onBlur={() => {
                onBlurHandler("name");
              }}
            />
            <CustomTextField
              fullWidth={true}
              name="slug"
              // component={renderOutlinedTextField}
              margin={"dense"}
              // normalize={titleNormalize}
              label="slug"
              value={form?.slug}
              onTextChange={(text) => {
                changeTextData(text, "slug");
              }}
              onBlur={() => {
                onBlurHandler("slug");
              }}
            />
            {/* <Field
                fullWidth={true}
                name="slug"
                component={renderOutlinedTextField}
                type={"text"}
                //disabled={true}
                margin={"dense"}
                label="Slug"
              /> */}
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              fullWidth={true}
              multiline
              rows={3}
              name="description"
              // normalize={descNormalize}
              // component={renderOutlinedTextField}
              margin={"dense"}
              label="Description"
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
        <div className="formFlex">
          <div className={"formGroup"}>
            <Autocomplete
              multiple
              // onChange={this._handleChangeKeywords}
              id="tags-filled"
              options={[]} // all_tags
              // value={this.state.searchKeyword}
              value={form?.tags}
              onChange={(text) => {
                changeTextData(text, "tags");
              }}
              onBlur={() => {
                onBlurHandler("tags");
              }}
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
                  label="Search Keyword"
                  placeholder="Search Keyword"
                />
              )}
            />
          </div>
        </div>
        <label className={styles.enter}>
          Please press enter to add a search keyword if not found in the search
          results.
        </label>
        <div className={"formGroup"}>
          <File
            max_size={1024 * 1024 * 5}
            type={["jpg", "png", "jpeg"]}
            error_text={"Max Size 5MB and valid files are jpg, png, jpeg"}
            fullWidth={true}
            name="banner"
            placeholder="Banner Image"
            //accept={'image/*, application/pdf'}
            error={errorData?.banner}
            value={form?.banner}
            // link={data ? data.banner : ""}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "banner");
              }
            }}
          />
        </div>

        <label htmlFor="" className={styles.includeContainer}>
          KYC
        </label>
        <div className={"formFlex"} style={{ position: "relative" }}>
          <div className={"formGroup"}>
            <QuestionaireChild
              questionnaire={questionnaire}
               handleQuestionnaire={handleQuestionnaire}
            />
            {/*<IncludeForm*/}
            {/*data={included}*/}
            {/*ref={(ref) => {*/}
            {/*this.includes = ref*/}
            {/*}}></IncludeForm>*/}
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              fullWidth={true}
            
              // component={renderOutlinedSelectField}
              margin={"dense"}
              label="Status"
              isError={errorData?.status}
              errorText={errorData?.status}
            
              value={form?.status}
              handleChange={(value) => {
                changeTextData(value, "status");
              }}
            >
              <MenuItem value={"PENDING"}>Coming Soon</MenuItem>
              <MenuItem value={"ACTIVE"}>Active</MenuItem>
              <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}></div>
        </div>

        <div className={"formFlex"}>
          {/* <div className={"formGroup"}>{_renderFeatured()}</div> */}
          {/*<div className={'formGroup'}>*/}
          {/*    {this._renderActive()}*/}
          {/*</div>*/}
        </div>

        {/*<div className={'formFlex'}>*/}
        {/*    <div className={'formGroup'}>*/}
        {/*        {this._renderComing()}*/}
        {/*    </div>*/}
        {/*    <div className={'formGroup'}>*/}

        {/*    </div>*/}
        {/*</div>*/}

        <div style={{ float: "right" }}>
          <Button variant={"contained"} color={"primary"} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndustryCreateView;

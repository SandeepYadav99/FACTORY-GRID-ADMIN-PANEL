import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../../FormFields/SelectField/SelectField.component";
import { Button, CircularProgress, MenuItem } from "@material-ui/core";
import CustomDatePicker from "../../../../FormFields/DatePicker/CustomDatePicker";
import CustomTextField from "../../../../FormFields/TextField.component";
import { formattedOptions } from "../../../../helper/Department";



const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const WorkProfile = ({
  errorData,
  changeTextData,
  form,
  onBlurHandler,
  handleSubmit,
  listData,
  setTypeOf,
  handleSubmitToSave,
  isSubmitting
}) => {
  const classes = useStyles();

  const handleSaveClick = () => {

    handleSubmitToSave();
    setTypeOf("Work");
  };
  return (
    <div>
      <div className={styles.headerFlex}></div>
      <div>
        <div style={{ width: "50%", margin: "auto" }}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomDatePicker
                clearable
                label={"Joining Date"}
                 maxDate={new Date()}
                // maxDate={new Date(new Date().getFullYear(), 11, 31)}
                onChange={(value) => {
                  changeTextData(value, "joining_date");
                }}
              
                format={"dd-MM-yyyy"}
                value={form?.joining_date}
                isError={errorData?.joining_date}
                errorText={errorData?.joining_date}
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.department}
                errorText={errorData?.department}
                label={"Department"}
                value={form?.department}
                handleChange={(value) => {
                  changeTextData(value, "department");
                }}
              >
                {formattedOptions?.map((option, index) => (
                  <MenuItem
                  
                    value={option?.id}
                  >
                    {option?.name}
                  </MenuItem>
                ))}
              </CustomSelectField>
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.designation}
                errorText={errorData?.designation}
                label={"Designation"}
                value={form?.designation}
                onTextChange={(text) => {
                  changeTextData(text, "designation");
                }}
                // onBlur={() => {
                //   onBlurHandler("designation");
                // }}
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.manager}
                errorText={errorData?.manager}
                label={"Manager"}
                value={form?.manager}
                handleChange={(value) => {
                  changeTextData(value, "manager");
                }}
              >
                {listData?.map((item) => {
                  return <MenuItem value={item?.id}>{`${item?.name}   (${item?.employee_id})`}</MenuItem>;
                })}
              </CustomSelectField>
            </div>
          </div>
          <br />

          <div className={styles.saveButton}>
            <Button
              variant={"contained"}
              color={"primary"}
              type="button"
              onClick={handleSaveClick}
            >
               {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                " Save"
              )}
              
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkProfile;

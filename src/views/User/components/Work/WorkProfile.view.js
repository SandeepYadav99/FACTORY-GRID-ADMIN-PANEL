
import styles from "./Style.module.css";
import { makeStyles } from "@material-ui/styles";
import CustomSelectField from "../../../../FormFields/SelectField/SelectField.component";
import { Button, MenuItem } from "@material-ui/core";
import CustomDatePicker from "../../../../FormFields/DatePicker/CustomDatePicker";


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
  errorData , changeTextData, form, onBlurHandler, handleSubmit,
  listData, setTypeOf
}) => {

  const classes = useStyles();

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
                onChange={(value) => {
                  changeTextData(value, "joining_date");
                }}
                // views={["month","dd","year"]}
                format={"MM-dd-yyyy"}
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
                <MenuItem value={"a"}>A</MenuItem>
                <MenuItem value={"b"}>B</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.designation}
                errorText={errorData?.designation}
                label={"Designation"}
                value={form?.designation}
                handleChange={(value) => {
                  changeTextData(value, "designation");
                }}
              >
                <MenuItem value={"a"}>A</MenuItem>
                <MenuItem value={"b"}>B</MenuItem>
              </CustomSelectField>
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
                  return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
                })}
              </CustomSelectField>
            </div>
          </div>
          <br />

          <div className={styles.saveButton}>
            <Button
              variant={"contained"}
              color={"primary"}
              type={"submit"}
              onClick={()=>{handleSubmit(); setTypeOf("Work")}}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkProfile;

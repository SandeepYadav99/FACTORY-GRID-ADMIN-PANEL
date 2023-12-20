// import React, { Component } from "react";
// import startsWith from "lodash.startswith";
// import {
//   Button,
//   MenuItem,
//   withStyles,
//   FormControlLabel,
//   Switch,
//   IconButton,
//   Paper,
// } from "@material-ui/core";
// import { Delete as DeleteIcon } from "@material-ui/icons";
// import { Field, reduxForm } from "redux-form";
// import { connect } from "react-redux";
// import {
//   renderOutlinedSelectField,
//   renderDatePicker,
// } from "../../../../libs/redux-material.utils";
// import EventEmitter from "../../../../libs/Events.utils";

// import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogActions from "@material-ui/core/DialogActions";
// import Slide from "@material-ui/core/Slide";
 import styles from "./Style.module.css";
// import { bindActionCreators } from "redux";
// // import {serviceProviderUserCheck} from "../../services/User.service";

// let requiredFields = [];
// const validate = (values) => {
//   const errors = {};
//   requiredFields.forEach((field) => {
//     if (!values[field]) {
//       errors[field] = "Required";
//     }
//   });
//   if (
//     values.email &&
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//   ) {
//     errors.email = "Invalid email address";
//   }
//   return errors;
// };

// const countNormalize = (value, prevValue) => {
//   if (value.length > 500) {
//     return prevValue;
//   }
//   return value;
// };

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// let lastValue = "";
// let isValueExists = false;

// // const asyncValidate = (values, dispatch, props) => {
// //     return new Promise((resolve, reject) => {
// //         if (values.email) {
// //             const value = values.email;
// //             if (lastValue == value && isValueExists && false) {
// //                 reject({name: 'Email Already Registered'});
// //             } else {
// //                 const tempQuery = {email: value};
// //                 const {data} = props;
// //                 if (data) {
// //                     tempQuery['id'] = data.id;
// //                 }
// //                 serviceProviderUserCheck(tempQuery).then((data) => {
// //                     console.log(data);
// //                     lastValue = value;
// //                     if (!data.error) {
// //                         const error = {};
// //                         let isError = false;
// //                         if (data.data.is_exists) {
// //                             error['email'] = 'Email Already Registered';
// //                             isError = true;
// //                         }
// //                         if (isError) {
// //                             reject(error);
// //                         } else {
// //                             resolve({});
// //                         }
// //                     }
// //                     resolve({});
// //                 })
// //             }
// //         } else {
// //             resolve({});
// //         }
// //     });
// // };

// class WorkProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       is_active: true,
//       show_confirm: false,
//     };
//     this._handleSubmit = this._handleSubmit.bind(this);
//     this._handleFileChange = this._handleFileChange.bind(this);
//     this._handleActive = this._handleActive.bind(this);
//     this._handleDelete = this._handleDelete.bind(this);
//     this._handleDialogClose = this._handleDialogClose.bind(this);
//     this._suspendItem = this._suspendItem.bind(this);
//   }

//   componentDidMount() {
//     const { data } = this.props;
//     if (data) {
//       requiredFields = [""];
//       Object.keys(data).forEach((val) => {
//         if ([].indexOf(val) == -1) {
//           const temp = data[val];
//           this.props.change(val, temp);
//         }
//       });
//       this.setState({
//         is_active: data.status == "ACTIVE",
//       });
//     } else {
//       requiredFields = ["designation"];
//     }
//   }

//   _handleSubmit(tData) {
//     console.log(tData);
//     const fd = new FormData();
//     Object.keys(tData).forEach((key) => {
//       fd.append(key, tData[key]);
//     });
//     const { data } = this.props;
//     fd.append("status", this.state.is_active ? "ACTIVE" : "INACTIVE");
//     if (data) {
//       this.props.handleDataSave(fd, "UPDATE");
//     } else {
//       this.props.handleDataSave(fd, "CREATE");
//     }
//   }

//   _handleActive() {
//     this.setState({
//       is_active: !this.state.is_active,
//     });
//   }

//   _handleFileChange(file) {
//     this.setState({
//       company_proof: file,
//     });
//   }

//   _renderActive() {
//     const { data } = this.props;
//     if (data) {
//       return (
//         <FormControlLabel
//           control={
//             <Switch
//               color={"primary"}
//               checked={this.state.is_active}
//               onChange={this._handleActive.bind(this)}
//               value="is_active"
//             />
//           }
//           label="Active ?"
//         />
//       );
//     } else {
//       return null;
//     }
//   }

//   _suspendItem() {
//     const { data } = this.props;
//     this.setState({
//       show_confirm: false,
//     });
//     this.props.handleDelete(data.id);
//   }

//   _handleDialogClose() {
//     this.setState({
//       show_confirm: false,
//     });
//   }

//   _handleDelete() {
//     this.setState({
//       show_confirm: true,
//     });
//   }

//   _renderDialog() {
//     const { classes } = this.props;
//     if (this.state.show_confirm) {
//       return (
//         <Dialog
//           keepMounted
//           TransitionComponent={Transition}
//           open={this.state.show_confirm}
//           onClose={this._handleDialogClose}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//           classes={{ paper: classes.dialog }}
//         >
//           <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-description">
//               Do you really want to delete the item?
//               <br />
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this._handleDialogClose} color="primary">
//               Disagree
//             </Button>
//             <Button onClick={this._suspendItem} color="primary">
//               Agree
//             </Button>
//           </DialogActions>
//         </Dialog>
//       );
//     }
//     return null;
//   }

//   render() {
//     const { handleSubmit, data } = this.props;
//     return (
//       <div>
//         <form
//           onSubmit={handleSubmit(this._handleSubmit)}
//           className={styles.userForm}
//         >
          // <div className={"formFlex"}>
          //   <div className={"formGroup"}>
          //     <Field
          //       fullWidth={true}
          //       name="doj"
          //       component={renderDatePicker}
          //       margin={"dense"}
          //       label="Joining Date"
          //       ampm={false}
          //       inputId={"doj"}
          //       maxDate={new Date()}
          //     />
          //   </div>
          // </div>

//           <div className={"formFlex"}>
//             <div className={"formGroup"}>
//               <Field
//                 fullWidth={true}
//                 name="department"
//                 component={renderOutlinedSelectField}
//                 margin={"dense"}
//                 label="Department"
//               >
//                 <MenuItem value={"A"}>A</MenuItem>
//                 <MenuItem value={"B"}>B</MenuItem>
//               </Field>
//             </div>
//           </div>

//           <div className={"formFlex"}>
//             <div className={"formGroup"}>
//               <Field
//                 fullWidth={true}
//                 name="designation"
//                 component={renderOutlinedSelectField}
//                 margin={"dense"}
//                 label="Designation"
//               >
//                 <MenuItem value={"A"}>A</MenuItem>
//                 <MenuItem value={"B"}>B</MenuItem>
//               </Field>
//             </div>
//           </div>

//           <div className={"formFlex"}>
//             <div className={"formGroup"}>
//               <Field
//                 fullWidth={true}
//                 name="manager"
//                 component={renderOutlinedSelectField}
//                 margin={"dense"}
//                 label="Manager"
//               >
//                 <MenuItem value={"SUPER_ADMIN"}>Super Admin</MenuItem>
//               </Field>
//             </div>
//           </div>

//           {/*{this._renderActive()}*/}

//           <div className={styles.saveButton}>
//             <Button variant={"contained"} color={"primary"} type={"submit"}>
//               Save and Next
//             </Button>
//           </div>
//         </form>
//         {this._renderDialog()}
//       </div>
//     );
//   }
// }

// const useStyle = (theme) => ({
//   iconBtnError: {
//     color: theme.palette.error.dark,
//   },
// });

// const ReduxForm = reduxForm({
//   form: "work_profile", // a unique identifier for this form
//   validate,
//   // asyncValidate,
//   enableReinitialize: true,
//   onSubmitFail: (errors) => {
//     EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
//       error: "Please enter values",
//       type: "error",
//     });
//   },
// })(withStyles(useStyle, { withTheme: true })(WorkProfile));

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);


import { makeStyles } from "@material-ui/styles";


import CustomSelectField from "../../../../FormFields/SelectField/SelectField.component";
import { Button, MenuItem } from "@material-ui/core";
import CustomDatePicker from "../../../../FormFields/DatePicker/CustomDatePicker";
import useWorkProfileHook from "./WorkProfileHook";

const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const User = ({ handleToggleSidePannel, isSidePanel, empId , openWorkProfileTab}) => {
  const {
    form,
    errorData,
    isSubmitting,
    listData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    document,
  } = useWorkProfileHook({
    handleToggleSidePannel,
    isSidePanel,
    empId,
    openWorkProfileTab
  });
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
                label={"Complete in "}
                maxDate={new Date()}
                onChange={(value) => {
                 
                  changeTextData(value, "payment_complete");
                }}
                views={["month","year"]}
                  format={"MM-yyyy"}
                value={form?.payment_complete}
                isError={errorData?.payment_complete}
                errorText={errorData?.payment_complete}
              />
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
                 <MenuItem value={"A"}>A</MenuItem>
                 <MenuItem value={"B"}>B</MenuItem>
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
                    <MenuItem value={"SUPER_ADMIN"}>Super Admin</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <br />
         
          <div className={styles.saveButton}>
            <Button variant={"contained"} color={"primary"} type={"submit"} onClick={handleSubmit}>
              Save and Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;


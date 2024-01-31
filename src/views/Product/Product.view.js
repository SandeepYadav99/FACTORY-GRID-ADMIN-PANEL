import React, { Component } from "react";
import {
  Button,
  MenuItem,
  withStyles,
  FormControlLabel,
  Switch,
  IconButton,
  TextField,
  Chip,
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Constants from "../../config/constants";
import {
  renderTextField,
  renderSelectField,
  renderOutlinedTextField,
  renderOutlinedSelectField,
  renderFileField,
  renderOutlinedMultipleSelectField,
  renderAutoComplete,
  renderCheckbox,
} from "../../libs/redux-material.utils";
import EventEmitter from "../../libs/Events.utils";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import styles from "./Style.module.css";
import { bindActionCreators } from "redux";
import DropdownCascadeComponent from "../../components/DropdownCascade/DropdownCascade.component";
import CustomRadioLabel from "../../components/CustomRadioLabel/CustomRadioLabel.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Cascader from "../../components/FormFields/Cascader/Cascader";
let requiredFields = [];

let lastValue = "";
let isExists = false;

const validate = (values) => {
  console.log("validate", values);
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field] && values[field] != 0) {
      errors[field] = "Required";
    } else if (
      values[field] &&
      typeof values[field] == "string" &&
      !values[field].trim()
    ) {
      errors[field] = "Required";
    } else if (
      values[field] &&
      Array.isArray(values[field]) &&
      values[field].length == 0
    ) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const nameNormalize = (value, prevValue) => {
  if (value.length > 50) {
    return prevValue;
  }
  return value;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const items = [
   
            {
                value: '11',
                label: 'Another Item'
            },
            {
                value: '12',
                label: 'More Items',
                children: [
                    {
                        value: '121',
                        label: 'Sub Item A'
                    },
                    {
                        value: '122',
                        label: 'Sub Item B',
                        disabled: true
                    },
                    {
                        value: '123',
                        label: 'Sub Item C'
                    }
                ]
        
    },
    {
        value: '2',
        label: 'Menu 2'
    },
    {
        value: '3',
        label: 'Menu 3',
        children: [
            {
                value: '31',
                label: 'Hello'
            },
            {
                value: '21',
                label: 'World'
            }
        ]
    }
];
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_active: true,
      is_featured: false,
      show_confirm: false,
      variants: null,
      deal_of_day: false,
      all_tags: [],
      category:[]
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleFileChange = this._handleFileChange.bind(this);
    this._handleActive = this._handleActive.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleDialogClose = this._handleDialogClose.bind(this);
    this._suspendItem = this._suspendItem.bind(this);
    this._handleDealOfDay = this._handleDealOfDay.bind(this);
    this._handleChange = this._handleChange.bind(this);
  }

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      requiredFields = ["name"]; //'label',
      Object.keys(data).forEach((val) => {
        if (["status", "image", "is_featured"].indexOf(val) == -1) {
          const temp = data[val];
          this.props.change(val, temp);
        }
      });
      this.setState({
        is_active: data.status == "ACTIVE",
        is_featured: data.is_featured,
      });
    } else {
      requiredFields = ["name", "image", "description"]; //'label',
    }
  }

  _handleSubmit(tData) {
    console.log(tData);
    const fd = new FormData();
    Object.keys(tData).forEach((key) => {
      fd.append(key, tData[key]);
    });
    fd.append("status", this.state.is_active ? "ACTIVE" : "INACTIVE");
    fd.append("is_featured", this.state.is_featured);

    const { data } = this.props;
    if (data) {
      this.props.handleDataSave(fd, "UPDATE");
    } else {
      this.props.handleDataSave(fd, "CREATE");
    }
  }

  _handleActive() {
    this.setState({
      is_active: !this.state.is_active,
    });
  }

  _handleChange() {
    this.setState({
      is_featured: !this.state.is_featured,
    });
  }

  _handleDealOfDay() {
    this.setState({
      deal_of_day: !this.state.deal_of_day,
    });
  }
  _handleFileChange(file) {
    this.setState({
      company_proof: file,
    });
  }

  _renderActive() {
    const { data } = this.props;
    if (data) {
      return (
        <FormControlLabel
          control={
            <Switch
              color={"primary"}
              checked={this.state.is_active}
              onChange={this._handleActive.bind(this)}
              value="is_active"
            />
          }
          label="Active ?"
        />
      );
    } else {
      return null;
    }
  }

  _renderFeatured() {
    return (
      <>
        <Field
          color={"primary"}
          name="is_featured"
          component={renderCheckbox}
          label={"Featured on Home"}
          onChange={this._handleChange}
        />{" "}
        <br />
        <Field
          color={"primary"}
          name="is_featured_industry"
          component={renderCheckbox}
          label={"Feature on Industry Page"}
          onChange={this._handleChange}
        />
      </>
    );
  }
  //   _renderFeaturedIndustry() {
  //     return (
  //       <Field
  //         color={"primary"}
  //         name="is_featured"
  //         component={renderCheckbox}
  //         label={"Feature on Industry Page"}
  //         onChange={this._handleChange}
  //       />
  //     );
  //   }

  _convertData(data) {
    const temp = {};
    data.forEach((val) => {
      temp[val.id] = val.name;
    });
    return temp;
  }

  _suspendItem() {
    const { data } = this.props;
    this.setState({
      show_confirm: false,
    });
    this.props.handleDelete(data.id);
  }

  _handleDialogClose() {
    this.setState({
      show_confirm: false,
    });
  }

  _handleDelete() {
    this.setState({
      show_confirm: true,
    });
  }

  _renderDialog() {
    const { classes } = this.props;
    if (this.state.show_confirm) {
      return (
        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={this.state.show_confirm}
          onClose={this._handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the item?
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleDialogClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this._suspendItem} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  }

  render() {
    const { handleSubmit, data, categories, units, stores } = this.props;
    const { all_tags, category } = this.state;
    return (
      <div>
        <div className={styles.headerFlex}>
          <h4 className={styles.infoTitle}>
            <div className={styles.heading}>Product</div>
            <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip>
          </h4>
          {data && (
            <Button
              // color={'secondary'}
              className={this.props.classes.deleteBtn}
              onClick={this._handleDelete}
              type="button"
            >
              Delete
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit(this._handleSubmit)}>
          <div className={"formFlex"} style={{ alignItems: "center" }}>
            <div className={""} style={{ margin: "0px 20px" }}>
              <Field
                max_size={2 * 1024 * 1024}
                type={["jpg", "png", "pdf", "jpeg"]}
                fullWidth={true}
                name="image"
                component={renderFileField}
                label=""
                show_image
                default_image={data ? data.image : ""}
                link={data ? data.image : ""}
              />
            </div>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="name"
                component={renderOutlinedTextField}
                margin={"dense"}
                normalize={nameNormalize}
                label="Product Name"
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="description"
                component={renderOutlinedTextField}
                multiline
                rows="2"
                margin={"dense"}
                label="Description"
              />
            </div>
          </div>

          {/*<div className={'formFlex'}>*/}
          {/*    <div className={'formGroup'}>*/}
          {/*        <Field fullWidth={true}*/}
          {/*               name="min_price"*/}
          {/*               component={renderOutlinedTextField}*/}
          {/*               type={'number'}*/}
          {/*               margin={'dense'}*/}
          {/*               label="Min Price"/>*/}
          {/*    </div>*/}
          {/*    <div className={'formGroup'}>*/}
          {/*        <Field fullWidth={true}*/}
          {/*               name="max_price"*/}
          {/*               component={renderOutlinedTextField}*/}
          {/*               type={'number'}*/}
          {/*               margin={'dense'}*/}
          {/*               label="Max Price"/>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="product"
                component={renderOutlinedTextField}
                margin={"dense"}
                normalize={nameNormalize}
                label="Product Type"
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="priority"
                type={"number"}
                component={renderOutlinedTextField}
                margin={"dense"}
                label="Priority "
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="quantity_unit"
                component={renderOutlinedSelectField}
                margin={"dense"}
                label="Quantity Unit"
              >
                <MenuItem value={"GM"}>Gm</MenuItem>
                <MenuItem value={"KG"}>KG</MenuItem>
                <MenuItem value={"UNITS"}>Units</MenuItem>
                <MenuItem value={"TONNE"}>Tonne</MenuItem>
                <MenuItem value={"ML"}>ml</MenuItem>
                <MenuItem value={"L"}>l</MenuItem>
                <MenuItem value={"KL"}>kl</MenuItem>
                <MenuItem value={"UG"}>ug</MenuItem>
                <MenuItem value={"BOXES"}>Boxes</MenuItem>
                <MenuItem value={"DOZENS"}>Dozens</MenuItem>
              </Field>
            </div>
          </div>
          <div className="formFlex">
            <div className={"formGroup"}>
              <Autocomplete
                multiple
                onChange={this._handleChangeKeywords}
                id="tags-filled"
                options={all_tags}
                value={this.state.tags}
                freeSolo
                selectOnFocus={false}
                // noOptionsText={this._renderNoText}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    /> //   disabled={option.length < 2}
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    placeholder="Tags"
                  />
                )}
              />
            </div>
          </div>
          <label className={styles.enter}>
            Please press enter to add a tag if not found in the search results.
          </label>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="status"
                component={renderOutlinedSelectField}
                margin={"dense"}
                label="Status"
              >
                <MenuItem value={"ACTIVE"}>Active</MenuItem>
                <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                <MenuItem value={"DELETED"}>Deleted</MenuItem>
                <MenuItem value={"REVIEW"}>Review</MenuItem>
                <MenuItem value={"REJECTED"}>Rejected</MenuItem>
              </Field>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
            <Cascader
              value={category}
            //   isError={errorData.category}
              label={"Industry"}
              options={items}
               handleChange={(value) => {
            //     changeTextData(value, "category");
            this.setState({ category: value });
              }}
            />
          </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>{this._renderFeatured()}</div>
{/* 
            <div className={"formGroup"}>{this._renderActive()}</div> */}
          </div>

          <div style={{ float: "right" }}>
            <Button variant={"contained"} color={"primary"} type={"submit"}>
              Submit
            </Button>
          </div>
        </form>
        {this._renderDialog()}
      </div>
    );
  }
}

const useStyle = (theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
});

const ReduxForm = reduxForm({
  form: "product", // a unique identifier for this form
  validate,
  // asyncValidate,
  enableReinitialize: true,
  onSubmitFail: (errors) => {
    console.error(errors);
    // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
  },
})(withStyles(useStyle, { withTheme: true })(Product));

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);

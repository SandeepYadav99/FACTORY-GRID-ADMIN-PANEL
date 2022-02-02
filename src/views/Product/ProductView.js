import React, {Component} from 'react';
import {Button, MenuItem, withStyles, FormControlLabel, Switch,IconButton} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import Constants from '../../config/constants';
import {
    renderTextField,
    renderSelectField,
    renderOutlinedTextField,
    renderOutlinedSelectField,
    renderFileField,
    renderOutlinedMultipleSelectField, renderAutoComplete, renderCheckbox
} from '../../libs/redux-material.utils';
import EventEmitter from "../../libs/Events.utils";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import styles from './Style.module.css';
import {bindActionCreators} from "redux";
import DropdownCascadeComponent from '../../components/DropdownCascade/DropdownCascade.component'
import CustomRadioLabel from "../../components/CustomRadioLabel/CustomRadioLabel.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";


let requiredFields = [];

let lastValue = '';
let isExists = false;


const validate = (values) => {
    console.log('validate', values);
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field] && values[field] != 0) {
            errors[field] = 'Required'
        } else if( values[field] && typeof values[field] == 'string' && !(values[field]).trim()) {
            errors[field] = 'Required'
        } else if (values[field] && Array.isArray(values[field]) && (values[field]).length == 0) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
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

class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_active: true,
            is_featured: false,
            show_confirm: false,
            variants: null,
            deal_of_day: false,
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
        const {data} = this.props;
        if (data) {
            requiredFields = ['name']; //'label',
            Object.keys(data).forEach((val) => {
                if (['status', 'image','is_featured'].indexOf(val) == -1) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            this.setState({
                is_active: data.status == 'ACTIVE',
                is_featured: data.is_featured,
            });
        } else {
            requiredFields = ['name', 'image','description']; //'label',
        }
    }

    _handleSubmit(tData) {
        console.log(tData)
        const fd = new FormData();
        Object.keys(tData).forEach((key) => {
            fd.append(key, tData[key]);
        });
        fd.append('status', (this.state.is_active ? 'ACTIVE' : 'INACTIVE'));
        fd.append('is_featured', (this.state.is_featured));

        const {data} = this.props;
        if (data) {
            this.props.handleDataSave(fd, 'UPDATE')
        } else {
            this.props.handleDataSave(fd, 'CREATE')
        }
    }

    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }

    _handleChange(){
        this.setState({
            is_featured: !this.state.is_featured,
        })
    }


    _handleDealOfDay() {
        this.setState({
            deal_of_day: !this.state.deal_of_day,
        });
    }
    _handleFileChange(file) {
        this.setState({
            company_proof: file
        })
    }

    _renderActive() {
        const {data} = this.props;
        if (data) {
            return (<FormControlLabel
                control={
                    <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                            value="is_active"/>
                }
                label="Active ?"
            />);
        } else {
            return null
        }
    }


    _renderFeatured() {
        return (
            <Field
                color={'primary'}
                name="is_featured"
                component={renderCheckbox}
                label={"Featured on Home"}
                onChange={this._handleChange}
            />
        )
    }

    _convertData(data) {
        const temp = {};
        data.forEach((val) => {
            temp[val.id] = val.name;
        });
        return temp;
    }

    _suspendItem() {
        const {data} = this.props;
        this.setState({
            show_confirm: false,
        });
        this.props.handleDelete(data.id);
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }


    _handleDelete() {
        this.setState({
            show_confirm: true
        });
    }


    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
                        <br/>
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
            </Dialog>)
        } return null;
    }



    render() {
        const {handleSubmit, data, categories, units, stores} = this.props;
        const {variants} = this.state
        return (
            <div className={styles.paperBackground}>
                <div className={styles.headerFlex}>

                </div>

                <form onSubmit={handleSubmit(this._handleSubmit)} className={styles.userForm}>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                            <Field fullWidth={true}
                                   name="min_price"
                                   component={renderOutlinedTextField}
                                   disabled={true}
                                   type={'number'}
                                   margin={'dense'}
                                   label="Min Price"/>
                                <div style={{marginLeft: '10px'}}>
                                    INR
                                </div>
                            </div>
                        </div>

                        <div className={'formGroup'}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                            <Field fullWidth={true}
                                   name="max_price"
                                   component={renderOutlinedTextField}
                                   type={'number'}
                                   disabled={true}
                                   margin={'dense'}
                                   label="Max Price"/>
                                <div style={{marginLeft: '10px'}}>
                                    INR
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                            <Field
                                fullWidth={true}
                                name="min_quantity"
                                type={'number'}
                                disabled={true}
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                label="Min Quantity"/>
                                <div style={{marginLeft: '10px'}}>
                                    Gm
                                </div>
                            </div>

                        </div>

                        <div className={'formGroup'}>
                        </div>
                    </div>

                    {/*<div style={{float: 'right'}}>*/}
                    {/*    <Button variant={'contained'} color={'primary'} type={'submit'}>*/}
                    {/*        Submit*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </form>
                {this._renderDialog()}
            </div>
        )
    }
}

const useStyle = theme => ({
    iconBtnError: {
        color: theme.palette.error.dark
    },
    deleteBtn: {
        color: 'red',
        // borderBottom: '1px solid red'
    }
});

const ReduxForm = reduxForm({
    form: 'product',  // a unique identifier for this form
    validate,
    // asyncValidate,
    enableReinitialize: true,
    onSubmitFail: errors => {
        console.error(errors);
        // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
    }
})(withStyles(useStyle, {withTheme: true})(ProductView));

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);

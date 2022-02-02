import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, FormControlLabel, MenuItem, Switch, withStyles} from "@material-ui/core";
import Table from '../../../components/Table/Table.component'
import styles from '../styles.module.css'
import {
    renderCountryContact,
    renderFileField,
    renderOutlinedSelectField,
    renderOutlinedTextField
} from "../../../libs/redux-material.utils";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import EventEmitter from "../../../libs/Events.utils";


let requiredFields = [];
const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


let lastValue = '';
let isValueExists = false;

class Customer extends Component{
    constructor(props){
        super(props);

        this.state={

        }
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleFileChange = this._handleFileChange.bind(this);
        this._handleActive = this._handleActive.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
    }
    componentDidMount() {
        const {data} = this.props;
        if (data) {
            requiredFields = ['name', 'email', 'contact', 'role','designation'];
            Object.keys(data).forEach((val) => {
                if (['image', 'contact', 'country_code', 'status'].indexOf(val) == -1) {
                    const temp = data[val];
                    this.props.change(val, temp);
                } else if (val == 'contact') {
                    this.props.change(val, `${data['country_code']} ${data['contact']}`)
                }
            });
            this.setState({
                is_active: data.status == 'ACTIVE',
            })
        } else {
            requiredFields = ['name', 'image', 'email', 'contact', 'role','designation'];
        }
    }

    _handleSubmit(tData) {
        console.log(tData)
        const fd = new FormData();
        Object.keys(tData).forEach((key) => {
            fd.append(key, tData[key]);
        });
        const {data} = this.props;
        fd.append('status', (this.state.is_active ? 'ACTIVE' : 'INACTIVE'));
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


    render(){
        const {data,handleSubmit} = this.props;
        return(
            <div>
                <div className={styles.headerFlex}>
                    {/*<h2>User</h2>*/}
                    {/*{data && <IconButton variant={'contained'} className={this.props.classes.iconBtnError}*/}
                    {/*                     onClick={this._handleDelete}*/}
                    {/*                     type="button">*/}
                    {/*    <DeleteIcon />*/}
                    {/*</IconButton> }*/}
                </div>
                <form onSubmit={handleSubmit(this._handleSubmit)} className={styles.userForm}>
                    <div className={'formFlex'} style={{justifyContent:'center'}}>
                        <div className={''} style={{marginRight: '20px'}}>
                            <Field
                                max_size={2 * 1024 * 1024}
                                type={['jpg', 'png', 'pdf']}
                                fullWidth={true}
                                name="image"
                                component={renderFileField}
                                // label="User Image"
                                link={data ? data.image : ''}
                                user_image
                                default_image={data ? data.image : null}
                            />
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <div>
                                <Field fullWidth={true} name="name" component={renderOutlinedTextField}
                                       margin={'dense'}
                                       label="Name"/>
                            </div>
                            <br/>
                            <div>
                                <Field fullWidth={true}
                                       type={'email'}
                                       name="email"
                                       component={renderOutlinedTextField}
                                       margin={'dense'}
                                       label="Email"/>
                            </div>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="contact"
                                   type={'number'}
                                   component={renderCountryContact}
                                   margin={'dense'}
                                   label="Phone No"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="industry"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Industry">
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="primary_industry"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Primary Industry">
                                <MenuItem value={'A'}>A</MenuItem>
                                <MenuItem value={'B'}>B</MenuItem>
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="member_type"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Member Type">
                                <MenuItem value={'Regular'}>Regular</MenuItem>
                                <MenuItem value={'Paid'}>Paid</MenuItem>
                            </Field>
                        </div>
                    </div>

                    <label>Member Since : </label> <br/>
                    <label>Last Active : </label>
                    {/*{this._renderActive()}*/}

                    <div className={styles.saveButton}>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Save and Next
                        </Button>
                    </div>
                </form>
                {this._renderDialog()}

            </div>
        )
    }
}

const useStyle = theme => ({
    btnSuccess: {
        backgroundColor: theme.palette.success.dark,
        color: 'white',
        marginRight: 5,
        marginLeft: 5,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
    btnError: {
        backgroundColor: theme.palette.error.dark,
        color: 'white',
        marginLeft: 5,
        marginRight: 5,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
        }
    }
});


const ReduxForm = reduxForm({
    form: 'customer',  // a unique identifier for this form
    validate,
    // asyncValidate,
    enableReinitialize: true,
    onSubmitFail: errors => {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
    }
})(withStyles(useStyle, {withTheme: true})(Customer));

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);

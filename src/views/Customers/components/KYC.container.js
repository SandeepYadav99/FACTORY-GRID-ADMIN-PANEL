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

class Kyc extends Component{
    constructor(props){
        super(props);

        this.state={

        }
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleActive = this._handleActive.bind(this);

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


                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <div>
                                <Field fullWidth={true} name="representative_name" component={renderOutlinedTextField}
                                       margin={'dense'}
                                       label="Bank Representative Name"/>
                            </div>
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <Field
                            max_size={1024*1024*5}
                            type={['jpg', 'png', 'pdf', 'jpeg']}
                            fullWidth={true}
                            error_text={'Max Size 5MB and valid files are jpg, png, jpeg'}
                            name="id_proof"
                            component={renderFileField}
                            accept={'image/*, application/pdf'}
                            label="ID Proof"
                            // link={data ? data.id_proof : null}
                        />
                    </div>

                    <div className={'formGroup'}>
                        <div>
                            <Field fullWidth={true} name="designation" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   label="Designation"/>
                        </div>
                    </div>


                    <div className={'formGroup'}>
                        <Field fullWidth={true}
                               name="account_number"
                               component={renderOutlinedTextField}
                               type={'text'}
                               margin={'dense'}
                               label="Bank Account Number"/>
                    </div>

                    <div className={'formGroup'}>
                        <div>
                            <Field fullWidth={true} name="beneficiary_name" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   label="Beneficiary Name"/>
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="ifsc" component={renderOutlinedTextField}
                               margin={'dense'}
                               label="IFSC"/>
                    </div>

                    <div className={'formGroup'}>
                        <Field fullWidth={true} name="bank_name" component={renderOutlinedTextField}
                               margin={'dense'}
                               label="Bank Name"/>
                    </div>

                    <div className={'formGroup'}>
                        <Field
                            max_size={1024*1024*5}
                            type={['jpg', 'png', 'pdf', 'jpeg']}
                            fullWidth={true}
                            error_text={'Max Size 5MB and valid files are jpg, png, jpeg'}
                            name="cancelled_cheque"
                            component={renderFileField}
                            accept={'image/*, application/pdf'}
                            label="Cancelled Cheque"
                            // link={data ? data.id_proof : null}
                        />
                    </div>

                    {/*{this._renderActive()}*/}

                    <div className={styles.saveButton}>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Save and Next
                        </Button>
                    </div>
                </form>

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
    form: 'kyc',  // a unique identifier for this form
    validate,
    // asyncValidate,
    enableReinitialize: true,
    onSubmitFail: errors => {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
    }
})(withStyles(useStyle, {withTheme: true})(Kyc));

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);

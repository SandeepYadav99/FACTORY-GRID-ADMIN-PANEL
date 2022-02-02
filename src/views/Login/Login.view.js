/**
 * Created by charnjeetelectrovese@gmail.com on 12/13/2018.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Login.module.css';
import {renderTextField, renderCheckbox, renderPasswordField} from '../../libs/redux-material.utils';
import {Button,withStyles, ButtonBase} from '@material-ui/core';
import {serviceLoginUser} from "../../services/index.services";
import { actionLoginUser } from '../../actions/auth_index.action';
import DashboardSnackbar from "../../components/Snackbar.component";
import { Link } from 'react-router-dom';
import classNames from 'classnames'
import EventEmitter from "../../libs/Events.utils";
import {updateTitle} from "../../libs/general.utils";

const validate = (values) => {
    const errors = {}
    const requiredFields = ['email', 'password'];

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
}


const useStyles = {
    btnColor: {
        backgroundColor: 'white',
        marginTop: '20px',
        paddingLeft: '20px',
        color:'#2196F3',
        marginRight:'15px',
        paddingRight: '20px',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    btnBottom: {
        backgroundColor: 'white',
        paddingLeft: '20px',
        color:'#2196F3',
        marginRight:'10px',
        marginLeft:'15px',
        paddingRight: '20px',
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    dialog: {
        padding: '10px 25px'
    },
    colorButton: {
        color: 'black',
        backgroundColor: 'white',
        padding: '10px 60px',
        minWidth: '170px',
        borderRadius: '5px',
        fontSize: '14px',
        fontWeight: '500',
        '&:hover': {
            color: 'white',
            backgroundColor: '#5f63f2',
        }
    }

};

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: false,
            is_checked:false,
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleForgotPassword = this._handleForgotPassword.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    async componentDidMount() {
        updateTitle('Login');
    }

    _handleSubmit(data) {
        serviceLoginUser(data).then((val) => {
            if (!val.error) {
                this.props.actionLoginUser(val.data);
            } else {
                EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Invalid Credentials! Please verify.', type: 'error'});
            }
        });
    }

    _handleChange(){
        this.setState({
            is_checked: !this.state.is_checked
        })
    }

    _handleForgotPassword() {
        this.props.history.push('/forgot/password');
    }

    render() {
        const {handleSubmit,classes} = this.props;
        return (
            <div className={'login'}>
            <div className={styles.mainLoginView}>
                <div className={styles.loginFlex1}>
                    <img src={require('../../assets/img/logo.png')}/>
                    {/*<div className={styles.heading}>*/}
                    {/*    Welcome To Factory Grid*/}
                    {/*</div>*/}
                </div>
                <div className={styles.loginFlex2}>
                    <div></div>

                    <div className={styles.signContainer}>
                    <h1 className={styles.headingText}>Sign in to <span style={{color:'#072ead'}}>Admin</span></h1>
                    <br/>
                    <br/>
                    <form onSubmit={handleSubmit(this._handleSubmit)}>
                        {/*<div className={styles.loginSignupText}>Login</div>*/}
                        <div>
                            <div>
                                <Field fullWidth={true} name="email" component={renderTextField} label="E-Mail"/>
                            </div>
                            <br/>
                            <div>
                                <Field
                                    // type={'password'}
                                    fullWidth={true}
                                    name="password" component={renderPasswordField}
                                    label="Password"/>
                            </div>

                            <div className={styles.logFlex}>
                                <div className={classNames(styles.negativeSpacing,'log')}>
                                    <Field
                                        color={'secondary'}
                                        name="logged_in"
                                        component={renderCheckbox}
                                        label={"Keep me logged in"}
                                        onChange={this._handleChange}
                                    />
                                </div>
                                <div style={{display: 'flex'}}>
                                    {/*<span className={styles.bottomSignup}>Don't have an account ? <Link to='/signup'>Sign Up here</Link></span>*/}
                                    <span className={styles.bottomSignup}>
                                        <ButtonBase
                                        onClick={this._handleForgotPassword} className={styles.forgotBtn}>Forgot Password?</ButtonBase></span>
                                </div>
                            </div>

                            <div style={{marginTop:'7px'}}>
                                <ButtonBase  type="submit" className={styles.login}>
                                    Sign In
                                </ButtonBase>
                            {/*<Button variant={'contained'}  type="submit" className={classes.colorButton}>*/}
                            {/*    Sign In*/}
                            {/*</Button>*/}
                            </div>
                        </div>
                    </form>
                    </div>

                    <div className={styles.privacyLinks}>
                        <div className={styles.privacyFlex}>
                            <div className={styles.privacyContainer}>
                                <Link to={'/'}><span className={styles.bottomLinks}>Visit Website</span></Link>
                            </div>
                            <div className={styles.privacyContainer}>
                                <Link to={'/'}><span className={styles.bottomLinks}>Privacy Policy</span></Link>
                            </div>
                            <div className={styles.privacyContainer}>
                                <Link to={'/'}><span className={styles.bottomLinks}>Terms & Conditions</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <DashboardSnackbar/>
            </div>
            </div>
        );
    }
}

LoginView = reduxForm({
    form: 'LoginPage',  // a unique identifier for this form
    validate,
    onSubmitFail: errors => {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter Credentials', type: 'error' });

    }
})(LoginView);

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        actionLoginUser: actionLoginUser
    }, dispatch);
}


export  default  connect(null, mapDispatchToProps)(withStyles(useStyles)(LoginView));

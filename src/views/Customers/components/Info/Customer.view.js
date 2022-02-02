import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonBase, withStyles} from "@material-ui/core";
import styles from './style.module.css'
import EmailIcon from "@material-ui/icons/Email";
import CallIcon from "@material-ui/icons/Call";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import InboxIcon from '@material-ui/icons/Inbox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';



class CustomerComponent extends Component{
    constructor(props){
        super(props);

        this.state={}

    }

    render(){
        const {data} = this.props;
        return(
            <div>
                <div className={styles.btn}>
                    <ButtonBase className={styles.suspendUser}>
                        SUSPEND USER
                    </ButtonBase>
                </div>
                <div className={styles.profileFlex}>
                    <div className={styles.leftSection}>
                        <div className={styles.plain}>
                            <div className={styles.profileContainer}>
                                <img src={require('../../../../assets/img/download.png')}/>
                                <div className={styles.name}>Duran Clyton</div>
                                <div className={styles.position}>Designation</div>

                                <div className={styles.designation}>Business Name</div>
                                <div className={styles.status}>PAID</div>
                            </div>

                            <hr/>
                            <h5 className={styles.heading}>Contact Info</h5>
                            <div>
                                <div className={styles.outerFlex}>
                                    <div className={styles.contactFlex}>
                                        <EmailIcon className={styles.contactIcons}/><
                                        span className={styles.email}>Clayton@example.com</span>
                                    </div>
                                    <div className={styles.verified}>
                                        VERIFIED
                                    </div>
                                </div>

                                <div className={styles.outerFlex}>
                                    <div className={styles.contactFlex}>
                                        <CallIcon className={styles.contactIcons}/>
                                        <span className={styles.email}>+132 23242 3434</span>
                                    </div>
                                    <div className={styles.notverified}>
                                        NOT VERIFIED
                                    </div>
                                </div>
                            </div>

                            <br/>

                            <h5 className={styles.heading}>Activity Info</h5>
                            <div>
                                <div className={styles.activityFlex}><span className={styles.member}>Member Since:</span><span >11/11/2021</span></div>
                                <div className={styles.activityFlex}><span className={styles.member}>Last Activity:</span><span>11/11/2021 1:00:00 P.M</span></div>
                            </div>

                            <h5 className={styles.heading}>Additional Info</h5>
                            <div>
                                <div className={styles.activityFlex}><span className={styles.member}>Industry:</span><span ></span></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightSection}>
                        <div className={styles.plain}>
                            <div className={styles.upperFlex}>
                                <h3 className={styles.taskHeading}>Activity Info </h3>
                            </div>
                            <hr/>
                            <div>
                                <ul className={styles.activityList}>
                                    <li className={styles.activityList_single}>
                                        <span className={styles.activityIcon}><InboxIcon className={styles.activeIcon}/></span>
                                        <div className={styles.activityContent}>
                                            <div className={styles.activityInfo}>
                                                <img src={require('../../../../assets/img/a.jpg')} height={40} width={40} className={styles.icon}/>
                                                <p className={styles.information}>
                                                    <span className={styles.nameActivity}>James</span> Send you a message
                                                    <div className={styles.hours}>5 hours ago</div>
                                                </p>
                                            </div>

                                            <ButtonBase>
                                                    <MoreHorizIcon className={styles.horizontalDots}/>
                                            </ButtonBase>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className={'formFlex'}>*/}
                {/*    /!*<div className={'formGroup'}>*!/*/}
                {/*    /!*<label>User Image</label>*!/*/}
                {/*    /!*<div>*!/*/}
                {/*    /!*<img className={styles.userImage} src={data.user_image}/>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*    <div className={'formGroup'}>*/}
                {/*        <label>Name</label>*/}
                {/*        <div>*/}
                {/*            {data.name}*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

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


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(useStyle, {withTheme: true})(CustomerComponent)));

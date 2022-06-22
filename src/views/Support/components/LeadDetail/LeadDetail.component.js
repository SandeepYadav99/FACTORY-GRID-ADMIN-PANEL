import React, {Component} from 'react';
import styles from './Style.module.css';
import {ButtonBase, FormControl, InputLabel, MenuItem} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionChangeSupportPriority, actionChangeSupportStatus} from "../../../../actions/Support.action";
import {WaitingComponent} from "../../../../components/index.component";
import constants from "../../../../config/constants";
import AssignedDialog from '../AssignedDialog/AssignedDialog.view';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LeadAssignedUser from "../AssignedDialog/LeadAssignedUser.component";
import Concern from '../ConcernDialog/Concern.component'

class LeadDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            priority: 'HIGH',
            status: 'RESOLVED',
            open: false
        }
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handlePriorityChange = this._handlePriorityChange.bind(this);
        this._handleStatusChange = this._handleStatusChange.bind(this);
        this._handleClose = this._handleClose.bind(this)
    }

    _handlePriorityChange(e) {
        const {actionChangeSupportPriority, support_detail: data} = this.props;
        actionChangeSupportPriority(data.support_id, e.target.value);
    }

    _handleStatusChange(e) {
        const {actionChangeSupportStatus, support_detail: data} = this.props;
        actionChangeSupportStatus(data.support_id, e.target.value);

    }

    _handleSubmit(data) {

    }

    _handleClose() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const {is_support_detail, support_detail: data} = this.props;
        if (is_support_detail || data === null) {
            return (<WaitingComponent/>)
        }
        return (
            <div>
                <div className={styles.plain}>
                    <div className={styles.newFlex}>
                        <div>
                            <img src={data.image ? data.image : require('../../../../assets/img/profile.png')} alt="" height={50}/>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>{data.name}</div>
                            <div className={styles.mobileFlex}>
                                {/*<img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>*/}
                                <div className={styles.mob}>{data.contact_verified ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}{data.contact}</div>
                            </div>
                            <div className={styles.mobileFlex}>
                                {/*<img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>*/}
                                <div className={styles.mob} style={{textTransform:'lowercase'}}>{data.is_email_verified == true ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}{data.email}</div>
                            </div>
                        </div>
                    </div>

                    {/*<div className={styles.cases}>*/}
                    {/*    <ButtonBase className={styles.queryBtn}>Other Queries</ButtonBase>*/}
                    {/*    <ButtonBase className={styles.queryBtn}>View Profile</ButtonBase>*/}
                    {/*</div>*/}

                    {/*<div className={styles.cases}>*/}
                    {/*    <div className={styles.businessQuery}>{data.concern}</div>*/}
                    {/*    <ButtonBase className={styles.queryBtn}>Change</ButtonBase>*/}
                    {/*</div>*/}

                    <Concern supportId={data.support_id}/>

                    <LeadAssignedUser supportId={data.support_id}/>
                    <br/>

                    <div className={'priority'}>
                        <FormControl variant={'outlined'} margin={'dense'} className={styles.selectWidth}>
                            <InputLabel id="demo-customized-select-label">Priority</InputLabel>
                            <Select
                                 value={data.priority}
                                onChange={this._handlePriorityChange}>
                                {Object.keys(constants.PRIORITY).map(key => {
                                    return (<MenuItem key={key} value={key}>{key}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div className={'priority'}>
                        <FormControl variant={'outlined'} margin={'dense'} className={styles.selectWidth}>
                            <InputLabel id="demo-customized-select-label">Status</InputLabel>
                            <Select
                                 value={data.status}
                                onChange={this._handleStatusChange}>
                                {Object.keys(constants.SUPPORT_STATUS).map(key => {
                                    return (
                                        <MenuItem key={key} value={key}>{constants.SUPPORT_STATUS_TEXT[key]}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        support_detail: state.support.support_detail,
        is_support_detail: state.support.is_support_detail,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionChangeSupportStatus: actionChangeSupportStatus,
        actionChangeSupportPriority: actionChangeSupportPriority,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LeadDetailComponent)

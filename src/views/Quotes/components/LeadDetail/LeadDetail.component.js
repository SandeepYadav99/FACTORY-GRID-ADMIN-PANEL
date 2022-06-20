import React, {Component} from 'react';
import styles from './Style.module.css';
import {ButtonBase, FormControl, InputLabel, MenuItem} from "@material-ui/core";
import Select from '@material-ui/core/Select';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionChangeQuotePriority, actionChangeQuoteStatus} from "../../../../actions/Quotes.action";
import {WaitingComponent} from "../../../../components/index.component";
import constants from "../../../../config/constants";
import AssignedDialog from '../AssignedDialog/AssignedDialog.view';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LeadAssignedUser from "../AssignedDialog/LeadAssignedUser.component";

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
        const {actionChangeQuotePriority, quote_detail: data} = this.props;
        actionChangeQuotePriority(data.quote_id, e.target.value);
    }

    _handleStatusChange(e) {
        const {actionChangeQuoteStatus, quote_detail: data} = this.props;
        actionChangeQuoteStatus(data.quote_id, e.target.value);

    }

    _handleSubmit(data) {

    }

    _handleClose() {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const {is_quote_detail, quote_detail: data} = this.props;
        if (is_quote_detail || data === null) {
            return (<WaitingComponent/>)
        }
        return (
            <div>
                <div className={styles.plain}>
                    <div className={styles.newFlex}>
                        <div>
                            <img src={data.user.image ? data.user.image : require('../../../../assets/img/profile.png')} alt="" height={50}/>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.name}>{data.user.name}</div>
                            <div className={styles.mobileFlex}>
                                {/*<img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>*/}
                                <div className={styles.mob}>{data.user.is_contact_verified == true ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}{data.user.contact}</div>
                            </div>
                            <div className={styles.mobileFlex}>
                                {/*<img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>*/}
                                <div className={styles.mob}>{data.is_email_verified == true ? <span><VerifiedUserIcon className={styles.verified}/></span> : ''}{data.user.email}</div>
                            </div>
                        </div>
                    </div>

                    {/*<div className={styles.cases}>*/}
                    {/*    <ButtonBase className={styles.queryBtn}>Other Queries</ButtonBase>*/}
                    {/*    <ButtonBase className={styles.queryBtn}>View Profile</ButtonBase>*/}
                    {/*</div>*/}

                    {/*<div className={styles.cases}>*/}
                    {/*    <div className={styles.businessQuery}>Business Query</div>*/}
                    {/*    <ButtonBase className={styles.queryBtn}>Change</ButtonBase>*/}
                    {/*</div>*/}

                    <LeadAssignedUser quoteId={data.quote_id}/>

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
                                {Object.keys(constants.QUOTE_STATUS).map(key => {
                                    return (
                                        <MenuItem key={key} value={key}>{constants.QUOTE_STATUS_TEXT[key]}</MenuItem>);
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
        quote_detail: state.quotes.quote_detail,
        is_quote_detail: state.quotes.is_quote_detail,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionChangeQuoteStatus: actionChangeQuoteStatus,
        actionChangeQuotePriority: actionChangeQuotePriority,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LeadDetailComponent)

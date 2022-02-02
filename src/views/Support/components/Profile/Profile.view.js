import React, {Component} from 'react';
import styles from './Style.module.css';
import {Field, reduxForm} from "redux-form";
import {renderOutlinedTextField,renderOutlinedSelectField} from "../../../../libs/redux-material.utils";
import {ButtonBase,MenuItem} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class SupportProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {}
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(data) {

    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <div>
                <div className={styles.plain}>
                    <div className={styles.name}>Pranav Bhasin</div>
                    <div className={styles.mobileFlex}>
                        <img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>
                        <div className={styles.mob}>Mobile No.</div>
                    </div>
                    <div className={styles.mobileFlex}>
                        <img src={require('../../../../assets/img/varified_icon.png')} alt="" height={14}/>
                        <div className={styles.mob}>Email Address</div>
                    </div>
                    <div className={styles.cases}>
                        <div className={styles.prev}>Previous Cases</div>
                        <div className={styles.prev}>View Profile</div>
                    </div>
                    <div className={styles.cases}>
                        <div className={styles.prev} style={{color:'#3399FF'}}>Business Query</div>
                        <div className={styles.prev}>Change</div>
                    </div>
                    <div className={styles.cases}>
                        <div className={styles.assign}>Assigned to</div>
                        <div className={styles.prev}>Change</div>
                    </div>
                    <div className={styles.assignedTo}>
                        <img src={require('../../../../assets/img/profile.png')} alt="" height={30}/>
                        <div className={styles.assignee}>
                            <div className={styles.assign}>Ashutosh Prasad</div>
                            <div>12/11/2021</div>
                        </div>
                    </div>

                    <form>
                        <div className={'priority'}>
                            <Field
                                fullWidth={true}
                                name="priority"
                                component={renderOutlinedSelectField}
                                margin={"dense"}
                                label={"Priority"}>

                                <MenuItem value={'HIGH'}>High</MenuItem>
                                <MenuItem value={'MEDIUM'}>Medium</MenuItem>
                                <MenuItem value={'LOW'}>Low</MenuItem>
                            </Field>
                        </div>
                        <div className={'priority'}>
                            <Field
                                fullWidth={true}
                                name="status"
                                component={renderOutlinedSelectField}
                                margin={"dense"}
                                label={"Status"}>

                                <MenuItem value={'RESOLVED'}>Resolved</MenuItem>
                                <MenuItem value={'PENDING'}>Pending</MenuItem>
                            </Field>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const ReduxForm =  reduxForm({
    form: 'support_profile',

})(SupportProfile);

export default ReduxForm

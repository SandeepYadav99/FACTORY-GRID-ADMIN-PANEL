import React, {Component} from 'react';
import styles from './Style.module.css'
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonBase, MenuItem} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import {renderOutlinedSelectField,renderOutlinedTextField,renderOutlinedTextFieldWithLimit} from "../../../../libs/redux-material.utils";
import {actionAddSupportNote} from "../../../../actions/Support.action";

const validate = (values) => {
    const errors = {};
    const requiredFields = ['event_type','note'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors;
};


function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const messageNormalize = (val, prevVal) => {
    if (val.length > 500) {
        return prevVal;
    } return val;
}

class NoteDialog extends Component{
    constructor(props){
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
    }


    _handleSubmit(data){
        const {actionAddSupportNote, supportId, handleClose} = this.props;
        actionAddSupportNote(supportId, data);
        handleClose();
        this.props.reset();
    }


    _renderReasons(){
        const {handleSubmit, lead_requests} = this.props;
        return(
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div>
                        <Field
                            fullWidth={true}
                            name="event_type"
                            component={renderOutlinedSelectField}
                            margin={"dense"}
                            label={"Event"}>

                            <MenuItem value={'CALL_LOG'}>Call Log</MenuItem>
                            <MenuItem value={'EMAIL'}>Email</MenuItem>
                            <MenuItem value={'MANUFACTURER'}>Manufacturer</MenuItem>
                            <MenuItem value={'OTHER'}>Other</MenuItem>
                        </Field>
                    </div>
                    <div>
                        <Field fullWidth={true}
                               name="note"
                               component={renderOutlinedTextFieldWithLimit}
                               label={"Note"}
                               multiline
                               maxLimit={500}
                               normalize={messageNormalize}
                               rows="5"
                               margin={'dense'}
                        />
                    </div>

                    {/*<div>*/}
                    {/*    <Field*/}
                    {/*        fullWidth={true}*/}
                    {/*        name="ref_id"*/}
                    {/*        component={renderOutlinedSelectField}*/}
                    {/*        margin={"dense"}*/}
                    {/*        label={"Reference Id"}>*/}
                    {/*        <MenuItem value={'None'}>None</MenuItem>*/}
                    {/*        {lead_requests.map((val) => {*/}
                    {/*            return (<MenuItem value={val.request_id}>{val.lead_no}</MenuItem>)*/}
                    {/*        })}*/}
                    {/*    </Field>*/}
                    {/*</div>*/}

                    <br/>
                    <div className={styles.submitBtn}>
                        <Button className={'sub'} variant={'contained'} color={'primary'} type={'submit'}>
                            Save & Submit
                        </Button>
                    </div>
                </form>
            </div>
        )
    }



    render(){
        const { data,user_details } = this.props;
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    fullWidth={true}
                    // maxWidth={'sm'}
                    onClose={() => {
                        this.props.handleClose();
                        this.props.reset();
                    }}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    {this._renderReasons()}
                </Dialog>
            </div>

        )
    }
}

const note = reduxForm({
    form:'note',
    validate
})(NoteDialog);

function mapStateToProps(state) {
    return {
        // lead_requests: state.quotes.quote_requests
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        actionAddSupportNote: actionAddSupportNote
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(note)

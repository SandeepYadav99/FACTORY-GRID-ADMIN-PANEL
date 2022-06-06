import React, {Component} from 'react';
import styles from './Style.module.css'
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonBase, MenuItem} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import {renderOutlinedSelectField,renderOutlinedTextField} from "../../../../libs/redux-material.utils";
import {actionAddQuoteNote} from "../../../../actions/Quotes.action";

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

class NoteDialog extends Component{
    constructor(props){
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
    }


    _handleSubmit(data){
        const {actionAddQuoteNote, quoteId, handleClose} = this.props;
        actionAddQuoteNote(quoteId, data);
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
                               component={renderOutlinedTextField}
                               label={"Note"}
                               multiline
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
                    onClose={this.props.handleClose}
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
        actionAddQuoteNote: actionAddQuoteNote
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(note)

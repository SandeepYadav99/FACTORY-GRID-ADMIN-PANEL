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

const validate = (values) => {
    const errors = {};
    const requiredFields = ['notes','event'];
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

        this.state={

        }
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(data){

    }


    _renderReasons(){
        const {handleSubmit} = this.props;
        return(
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div>
                        <Field
                            fullWidth={true}
                            name="event"
                            component={renderOutlinedSelectField}
                            margin={"dense"}
                            label={"Event"}>

                            <MenuItem value={'CALL_LOG'}>Call Log</MenuItem>
                            <MenuItem value={'EMAIL'}>Email</MenuItem>
                            <MenuItem value={'INTERNAL'}>Internal</MenuItem>
                        </Field>
                    </div>
                    <div>
                        <Field fullWidth={true}
                               name="notes"
                               component={renderOutlinedTextField}
                               label={"Note"}
                               multiline
                               rows="5"
                               margin={'dense'}
                        />
                    </div>
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
                    {/*<div className={styles.closeIcon} onClick={this.props.handleClose}>*/}
                    {/*<Close className={styles.cancel}/>*/}
                    {/*</div>*/}

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

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(note)

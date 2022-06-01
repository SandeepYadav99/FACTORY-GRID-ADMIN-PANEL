import React, {Component} from 'react';
import styles from './Style.module.css'
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonBase, MenuItem} from '@material-ui/core';
import {renderOutlinedTextField} from "../../../../../../libs/redux-material.utils";

const validate = (values) => {
    const errors = {};
    const requiredFields = ['note'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    return errors;
};



class MessageForm extends Component{
    constructor(props){
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this);
    }


    _handleSubmit(data){

    }


    _renderReasons(){
        const {handleSubmit, lead_requests} = this.props;
        return(
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div className={styles.noteContainer}>
                        <div>
                            <textarea name="message" cols="90" rows="5"
                                      className={styles.txtArea}

                            />
                            {/*<Field fullWidth={true}*/}
                            {/*       name="note"*/}
                            {/*       component={renderOutlinedTextField}*/}
                            {/*       label={"Note"}*/}
                            {/*       multiline*/}
                            {/*       rows="4"*/}
                            {/*       margin={'dense'}*/}
                            {/*/>*/}
                        </div>

                        <div className={styles.submitBtn}>
                            <ButtonBase>
                                <img src= {require("../../../../../../assets/img/ic_send.png")} height={35}/>
                            </ButtonBase>
                        </div>
                    </div>
                </form>
            </div>
        )
    }



    render(){
        const { data,user_details } = this.props;
        return(
            <div>
                {this._renderReasons()}
            </div>

        )
    }
}

const message = reduxForm({
    form:'message',
    validate
})(MessageForm);

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(message)

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
import {serviceGetQuoteUsers} from "../../../../services/Quotes.service";

const validate = (values) => {
    const errors = {};
    const requiredFields = ['concern'];
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

class ConcernDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            users: [],
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    _handleSubmit(data){
        const { handleSubmitProps } = this.props;
        handleSubmitProps(data);
    }


    _renderReasons(){
        const {users} = this.state;
        const {handleSubmit} = this.props;
        return(
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div>
                        <Field
                            fullWidth={true}
                            name="concern"
                            component={renderOutlinedSelectField}
                            margin={"dense"}
                            label={"Change Concern"}>
                            {/*{users.map(val => {*/}
                               <MenuItem value={'REDUCED_DEMAND'}>Reduced Demand</MenuItem>
                            <MenuItem value={'TEST'}>Test</MenuItem>
                            {/*})}*/}

                        </Field>
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
                    onClose={() => {
                        this.props.handleClose();
                        this.props.reset();
                    }}
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

const concern = reduxForm({
    form:'concern_dialog',
    validate
})(ConcernDialog);

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(concern)

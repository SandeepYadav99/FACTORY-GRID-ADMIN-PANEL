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
    const requiredFields = ['user_id'];
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

class AssignedDialog extends Component{
    constructor(props){
        super(props);
        this.state={
            users: [],
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    componentDidMount() {
        serviceGetQuoteUsers({}).then((res) => {
           this.setState({
               users: res.data
           });
        });
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
                            name="user_id"
                            component={renderOutlinedSelectField}
                            margin={"dense"}
                            label={"Assigned To"}>
                            {/*{users.map(val => {*/}
                            {/*    return (<MenuItem value={val.user_id} key={val.user_id}>{val.name}</MenuItem>);*/}
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

const assigned = reduxForm({
    form:'assigned',
    validate
})(AssignedDialog);

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(assigned)

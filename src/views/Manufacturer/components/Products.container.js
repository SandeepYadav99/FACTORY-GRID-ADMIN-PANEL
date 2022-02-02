import React, {Component} from 'react';
import {Button, MenuItem, withStyles, FormControlLabel, Switch,IconButton} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import {
    renderTextField,
    renderSelectField,
    renderOutlinedTextField,
    renderOutlinedSelectField,
    renderFileField,
    renderOutlinedMultipleSelectField, renderAutoComplete
} from '../../../libs/redux-material.utils';
// import EventEmitter from "../../libs/Events.utils";

import Slide from "@material-ui/core/Slide";
import styles from '../styles.module.css';
import {bindActionCreators} from "redux";


let requiredFields = [];

let lastValue = '';
let isExists = false;


const validate = (values) => {
    console.log('validate', values);
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field] && values[field] != 0) {
            errors[field] = 'Required'
        } else if( values[field] && typeof values[field] == 'string' && !(values[field]).trim()) {
            errors[field] = 'Required'
        } else if (values[field] && Array.isArray(values[field]) && (values[field]).length == 0) {
            errors[field] = 'Required'
        }
    });

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this._handleSubmit = this._handleSubmit.bind(this);

    }

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            requiredFields = ['name', 'unit_id', 'list_price', 'price', 'tags', 'category_ids',   'max_quantity', 'store_id']; //'label',
            Object.keys(data).forEach((val) => {
                if (['status', 'image','is_featured', 'deal_of_day', 'variants'].indexOf(val) == -1) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            this.setState({
                is_active: data.status == 'ACTIVE',
                is_featured: data.is_featured,
                variants: data.variants,
                deal_of_day: data.deal_of_day ? true : false
            });
        } else {
            requiredFields = ['name', 'image', 'unit_id', 'list_price', 'price', 'tags', 'category_ids', 'max_quantity', 'store_id']; //'label',
        }
    }

    _handleSubmit(tData) {
        console.log(tData)
        const fd = new FormData();
        Object.keys(tData).forEach((key) => {
            fd.append(key, tData[key]);
        });
        fd.append('status', (this.state.is_active ? 'ACTIVE' : 'INACTIVE'));
        fd.append('is_featured', (this.state.is_featured));
        fd.append('deal_of_day', (this.state.deal_of_day));

        if (this.productVariant) {
            fd.append('variants', JSON.stringify(this.productVariant.getState()));
        }

        const {data} = this.props;
        if (data) {
            this.props.handleDataSave(fd, 'UPDATE')
        } else {
            this.props.handleDataSave(fd, 'CREATE')
        }
    }

    _renderActive() {
        const {data} = this.props;
        if (data) {
            return (<FormControlLabel
                control={
                    <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                            value="is_active"/>
                }
                label="Active ?"
            />);
        } else {
            return null
        }
    }


    _renderFeatured() {
        return (<FormControlLabel
            control={
                <Switch color={'secondary'} checked={this.state.is_featured} onChange={this._handleFeatured}
                        value="is_featured"/>
            }
            label="Featured ?"
        />);
    }

    render() {
        const {handleSubmit, data, categories, units, stores} = this.props;
        const {variants} = this.state
        return (
            <div>
                {/*<div className={styles.headerFlex}>*/}
                {/*    <h2>Product</h2>*/}
                {/*</div>*/}
                {/*<hr/>*/}
                <form onSubmit={handleSubmit(this._handleSubmit)} className={styles.userForm}>
                    <div className={'formFlex'} style={{alignItems: 'center'}}>

                        <div className={'formGroup'}>
                            <Field fullWidth={true} name="name" component={renderOutlinedTextField}
                                   margin={'dense'}
                                   // normalize={nameNormalize}
                                   label="Product Name"/>

                        </div>

                    </div>

                    {/*<div className={'formFlex'}>*/}
                    {/*    <div className={'formGroup'}>*/}
                    {/*        <Field fullWidth={true}*/}
                    {/*               name="description"*/}
                    {/*               component={renderOutlinedTextField}*/}
                    {/*               multiline*/}
                    {/*               rows="2"*/}
                    {/*               margin={'dense'}*/}
                    {/*               label="Description"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="price"
                                   component={renderOutlinedTextField}
                                   type={'number'}
                                   margin={'dense'}
                                   label="Price"/>
                        </div>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="moq"
                                   component={renderOutlinedTextField}
                                   type={'number'}
                                   margin={'dense'}
                                   label="MOQ"/>
                        </div>
                    </div>


                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="enquiry"
                                component={renderOutlinedTextField}
                                type={'number'}
                                margin={'dense'}
                                label="No. Of Enquiries"/>
                        </div>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="orders"
                                type={'number'}
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                label="No. Of Orders"/>
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <Field
                            fullWidth={true}
                            name="max_capacity"
                            type={'number'}
                            component={renderOutlinedTextField}
                            margin={'dense'}
                            label="Max Capacity"/>
                    </div>



                    <div className={styles.saveButton}>
                        <Button variant={'contained'} color={'primary'} type={'submit'}>
                            Save and Next
                        </Button>
                    </div>
                </form>

            </div>
        )
    }
}

const useStyle = theme => ({
    iconBtnError: {
        color: theme.palette.error.dark
    }
});

const ReduxForm = reduxForm({
    form: 'product',  // a unique identifier for this form
    validate,
    // asyncValidate,
    enableReinitialize: true,
    onSubmitFail: errors => {
        console.error(errors);
        // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
    }
})(withStyles(useStyle, {withTheme: true})(Product));

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxForm);

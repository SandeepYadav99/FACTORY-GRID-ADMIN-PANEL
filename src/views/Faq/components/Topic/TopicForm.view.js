/**
 * Created by charnjeetelectrovese@gmail.com on 1/31/2020.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux';
import styles from './Style.module.css'
import csx from 'classnames';
import {MenuItem, Button, IconButton, withStyles} from '@material-ui/core';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'

import {
    renderOutlinedTextField,
    renderOutlinedTextFieldWithLimit,
    renderOutlinedSelectField, renderCheckbox, renderAutoComplete, renderFileField,
} from '../../../../libs/redux-material.utils';

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {Delete as DeleteIcon} from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let requiredFields = [];

const validate = (values) => {
    const errors = {};
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.title && !/^[A-Z ]*$/i.test(values.title)) {
        errors.title = 'Only alphabets are allowed';
    }
    return errors
};

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                // marginTop: 0,
                width: "100%",
            },
            editor: {
                borderBottom: "1px solid gray"
            }
        }
    }
})


class Faq extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_checked: false,
            editor: null,
            editor_data: null,
            anchor: null,
            is_active: false,
            show_confirm: false,
            keywords:[]
        };
        this.editorRef = null;
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleChange = this._handleChange.bind(this);

        this._handleActive = this._handleActive.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
    }

    componentDidMount() {
        const {data} = this.props;
        if (data) {
            this.setState({
                is_active: data.status == 'ACTIVE'
            })
            requiredFields = ['title', 'visible_to','priority'];
            Object.keys(data).forEach((val) => {
                if (['status'].indexOf(val) < 0) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
        } else {
            requiredFields = ['title', 'visible_to','priority'];
        }
    }

    _handleSubmit(tData) {
        const status = this.state.is_active ? 'ACTIVE' : 'INACTIVE';
        const {data} = this.props;
        if (data) {
            this.props.handleDataSave({ ...tData, status: status, id: data.id }, 'UPDATE')
        } else {
            this.props.handleDataSave({...tData,status: status},  'CREATE')
        }

    }


    _handleActive() {
        this.setState({
            is_active: !this.state.is_active,
        });
    }

    _renderStatus() {
        // const {data} = this.props;
        // if (data) {
        return (<FormControlLabel
            control={
                <Switch color={'primary'} checked={this.state.is_active} onChange={this._handleActive.bind(this)}
                        value="is_active"/>
            }
            label="Active ?"
        />);
        // } else {
        //     return null;
        // }
    }


    _handleChange() {
        this.setState({
            is_checked: !this.state.is_checked
        })
    }

    _convertData(data) {
        const temp = {};
        data.forEach((val) => {
            temp[val.id] = val.name;
        });
        return temp;
    }
    _suspendItem() {
        const {data} = this.props;
        this.setState({
            show_confirm: false,
        });
        this.props.handleDelete(data.id);
    }

    _handleDialogClose() {
        this.setState({
            show_confirm: false,
        })
    }


    _handleDelete() {
        this.setState({
            show_confirm: true
        });
    }


    _renderDialog() {
        const {classes} = this.props;
        if (this.state.show_confirm) {
            return (<Dialog
                keepMounted
                TransitionComponent={Transition}
                open={this.state.show_confirm}
                onClose={this._handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                classes={{paper: classes.dialog}}
            >
                <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete the item?
                        <br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleDialogClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this._suspendItem} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>)
        } return null;
    }



    render() {
        const {handleSubmit, cities, data,faq_type} = this.props;
        return (
            <div>
                <div className={styles.headerFlex}>
                    <h4 className={styles.infoTitle}>
                        <div className={styles.heading}>FAQ</div>
                        <Tooltip title="Info" aria-label="info" placement="right">
                            <InfoIcon fontSize={'small'}/>
                        </Tooltip>

                    </h4>
                </div>
                <form onSubmit={handleSubmit(this._handleSubmit)}>
                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="title"
                                component={renderOutlinedTextFieldWithLimit}
                                maxLimit={100}
                                margin={'dense'}
                                label="Topic Header/Question"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="visible_to"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   label="Applies To">
                                <MenuItem value={'BOTH'}>General</MenuItem>
                                <MenuItem value={'CUSTOMER'}>Customers</MenuItem>
                                <MenuItem value={'MANUFACTURE'}>Manufacturers</MenuItem>
                            </Field>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="priority"
                                type={'number'}
                                component={renderOutlinedTextField}
                                margin={'dense'}
                                label="Priority"/>
                        </div>
                    </div>

                    <br/>

                    <div className={styles.bottomFlex}>
                        {this._renderStatus()}
                        <div>
                            <IconButton variant={'contained'} className={this.props.classes.iconBtnError}
                                        onClick={this._handleDelete}
                                        type="button">
                                <DeleteIcon />
                            </IconButton>
                            {/*<span className={styles.delete}>Delete Permanently</span>*/}
                        </div>
                    </div>

                    <br/>
                    <div className={styles.submitBtn}>
                        <Button className={'sub'} variant={'contained'} color={'primary'} type={'submit'}>
                            Save
                        </Button>
                    </div>
                </form>
                {this._renderDialog()}
            </div>
        )
    }
}

const useStyle = theme => ({
    btnSuccess: {
        backgroundColor: theme.palette.success.dark,
        color: 'white',
        marginRight: 5,
        marginLeft: 5,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
        }
    },
    btnError: {
        backgroundColor: theme.palette.error.dark,
        color: 'white',
        marginLeft: 5,
        marginRight: 5,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
        }
    },
    iconBtnError: {
        color: theme.palette.error.dark
    }
});

const ReduxForm = reduxForm({
    form: 'topic',  // a unique identifier for this form
    validate,
    // enableReinitialize: true,
    // asyncValidate

})(withStyles(useStyle, {withTheme: true})(Faq));

export default connect(null, null)(ReduxForm);

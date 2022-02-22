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
import MUIRichTextEditor from 'mui-rte';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromHTML, ContentState, convertToRaw, convertFromRaw } from 'draft-js'
import {
    renderOutlinedTextField,
    renderOutlinedTextFieldWithLimit,
    renderOutlinedSelectField, renderCheckbox, renderAutoComplete, renderFileField,
} from '../../../../libs/redux-material.utils';
import {serviceBlogsExists, serviceUploadBlogImage} from "../../../../services/Blogs.service";
import EventEmitter from "../../../../libs/Events.utils";
import BackupIcon from '@material-ui/icons/Backup'
// import UploadImagePopover from './component/Popover/Popover.component';
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

const descNormalize = (value, prevValue) => {
    if (value.length > 500) {
        return prevValue;
    }
    return value;
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


class QuestionsFormView extends Component {
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
        this._handleEditor = this._handleEditor.bind(this);
        this._setAnchor = this._setAnchor.bind(this);
        this._handleFileUpload = this._handleFileUpload.bind(this);
        this._uploadImage = this._uploadImage.bind(this);
        this._handleActive = this._handleActive.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleDialogClose = this._handleDialogClose.bind(this);
        this._suspendItem = this._suspendItem.bind(this);
    }

    componentDidMount() {
        const {data,category} = this.props;
        if(category){
            console.log(category)
             this.props.change('title', category.title);
             this.props.change('visible_to', category.visible_to);
        }
        let htmlData = '';
        if (data) {
            this.setState({
                is_active: data.status == 'ACTIVE'
            })
            requiredFields = ['title','visible_to','priority','question'];
            Object.keys(data).forEach((val) => {
                if (['description', 'status'].indexOf(val) < 0) {
                    const temp = data[val];
                    this.props.change(val, temp);
                }
            });
            htmlData = data.description;
        } else {
            htmlData = ''
            requiredFields = ['title','visible_to','priority','question'];
        }

        const contentHTML = convertFromHTML(htmlData)

        const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
        const tempData = convertToRaw(state);
        const entityMap = tempData.entityMap;
        Object.keys(entityMap).forEach((key, index) => {
            const tempValue = entityMap[key];
            if ('data' in tempValue && 'src' in tempValue.data) {
                entityMap[key].data = { ...tempValue.data, url: tempValue.data.src };
            }
        });
        this.setState({
            editor_data:  JSON.stringify(tempData),
        })


    }

    _handleSubmit(tData) {
        const {category} = this.props;
        const { editor } = this.state;
        if (editor) {
            const status = this.state.is_active ? 'ACTIVE' : 'INACTIVE'
            const {data} = this.props;
            if (data) {
                this.props.handleDataSave({...tData, status: status, faq_category_id: category.id,description:editor, id: data.id}, 'UPDATE')
            } else {
                this.props.handleDataSave({...tData, status: status, faq_category_id: category.id,description:editor}, 'CREATE')
            }
        } else {
            EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please Enter Description',type:'error'});
        }

    }

    _handleEditor(data, b) {
        // console.log('data',convertFromRaw(data));
        if (!data.getCurrentContent().hasText()) {
            this.setState({
                editor: null
            })
        } else {
            const html = stateToHTML(data.getCurrentContent());
            console.log('data', data);
            this.setState({
                editor: html
            })
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
    handleEditorChange = (content, editor) => {
        // console.log('Content was updated:', content);
    }

    async _handleFileUpload (file) {
        console.log(this.editorRef);
        if (this.editorRef) {
            this.editorRef.insertAtomicBlockAsync("IMAGE", this._uploadImage(file), "Uploading now...")
        }
    }

    _handleSave = (data) => {
        console.log('handleSave', (data));
        const tData = JSON.parse(data);
        const state = convertFromRaw(tData)
        console.log('state', state);
    }

    _uploadImage(file) {
        // console.log(file);
        // return new Promise(async (res, rej) => {
        //     const fd = new FormData();
        //     fd.append('image', file);
        //     const req = await serviceUploadBlogImage(fd );
        //     if (!req.error) {
        //         res({
        //             data: {
        //                 src:req.data.image,
        //                 url: req.data.image,
        //                 width: 300,
        //                 // height: 200,
        //                 alignment: "left", // or "center", "right"
        //                 type: "image" // or "video"
        //             }
        //         })
        //     } else {
        //         rej();
        //     }
        //
        // })
    }

    _setAnchor(anchor) {
        this.setState({
            anchor: anchor
        })
    }

    _renderEditor() {
        const { editor_data, anchor } = this.state;
        if (editor_data) {
            return (<>
                    {/*<UploadImagePopover*/}
                    {/*    anchor={anchor}*/}
                    {/*    onSubmit={(data, insert) => {*/}
                    {/*        if (insert && data.file) {*/}
                    {/*            this._handleFileUpload(data.file)*/}
                    {/*        }*/}
                    {/*        this._setAnchor(null);*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <MuiThemeProvider theme={defaultTheme}>
                        <MUIRichTextEditor
                            ref={(ref) => { this.editorRef = ref; }}
                            defaultValue={editor_data}
                            onChange={this._handleEditor}
                            onSave={this._handleSave}
                            label="Start typing..."
                            controls={["bold", "italic", "underline"]}
                            inlineToolbar={true}
                            customControls={[
                                {
                                    name: "upload-image",
                                    icon: <BackupIcon />,
                                    type: "callback",
                                    onClick: (_editorState, _name, anchor) => {
                                        this._setAnchor(anchor)
                                    }
                                }
                            ]}
                            draftEditorProps={{
                                handleDroppedFiles: (_selectionState, files) => {
                                    if (files.length && (files[0]).name !== undefined) {
                                        this._handleFileUpload(files[0])
                                        return "handled"
                                    }
                                    return "not-handled"
                                }
                            }}
                        />
                    </MuiThemeProvider>
                </>
            )
        }
    }



    _handleChange() {
        this.setState({
            is_checked: !this.state.is_checked
        })
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
                        <div className={styles.heading}>Questions</div>
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
                                inputProps={{readOnly: 'true'}}
                                label="Topic Header/Question"/>
                        </div>
                    </div>

                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                fullWidth={true}
                                name="question"
                                component={renderOutlinedTextFieldWithLimit}
                                maxLimit={500}
                                margin={'dense'}
                                normalize={descNormalize}
                                label="Question Name"/>
                        </div>
                    </div>


                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field fullWidth={true}
                                   name="visible_to"
                                   component={renderOutlinedSelectField}
                                   margin={'dense'}
                                   inputProps={{readOnly: 'true'}}
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

                    <div>
                        <div className={styles.lblTxt}>Answer</div>
                        <div className={'formFlex'}>
                            <div className={csx('formGroup', styles.editorContainer)}>
                                {this._renderEditor()}
                            </div>
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
    form: 'questions',  // a unique identifier for this form
    validate,
    // enableReinitialize: true,
    // asyncValidate

})(withStyles(useStyle, {withTheme: true})(QuestionsFormView));

export default connect(null, null)(ReduxForm);

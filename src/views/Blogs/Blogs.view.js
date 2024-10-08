/**
 * Created by charnjeetelectrovese@gmail.com on 1/31/2020.
 */
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import styles from "./Blogs.module.css";
import csx from "classnames";
import { MenuItem, Button, IconButton, withStyles } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
import { stateToHTML } from "draft-js-export-html";
import {
  convertFromHTML,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import {
  renderOutlinedTextField,
  renderOutlinedSelectField,
  renderCheckbox,
  renderAutoComplete,
  renderFileField,
} from "../../libs/redux-material.utils";
import {
  serviceBlogsExists,
  serviceGetTagsList,
  serviceUploadBlogImage,
} from "../../services/Blogs.service";
import EventEmitter from "../../libs/Events.utils";
import BackupIcon from "@material-ui/icons/Backup";
import UploadImagePopover from "./component/Popover/Popover.component";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Delete as DeleteIcon } from "@material-ui/icons";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NewEditor from "../../components/NewEditor/NewEditor.component";
import { WaitingComponent } from "../../components/index.component";
import slugify from "slugify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let lastValue = "";
let isExists = false;

const asyncValidate = (values, dispatch, props) => {
  return new Promise((resolve, reject) => {
    if (values.slug) {
      const value = values.slug;
      if (lastValue == value && isExists) {
        reject({ slug: "Slug Already Exists" });
      } else {
        const data = props.data;
        serviceBlogsExists({ slug: value, id: data ? data.id : null }).then(
          (data) => {
            console.log(data);
            lastValue = value;
            if (!data.error) {
              if (data.data.is_exists) {
                reject({ slug: "Slug Already Exists" });
              }
            }
            resolve({});
          }
        );
      }
    } else {
      resolve({});
    }
  });
};

let requiredFields = [];

const validate = (values) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values["read_time"] == 0) {
    errors["read_time"] = "Read Time cannot be 0";
  }
  // if (values.title && !/^[A-Z ]*$/i.test(values.title)) {
  //     errors.title = 'Only alphabets are allowed';
  // }
  return errors;
};

const negativeNormalize = (value, prevValue) => {
  if (!value || (value >= 0 && value.length < 5)) {
    return value;
  }
  return prevValue;
};

const titleNormalize = (value, prevValue) => {
  if (value.length > 120) {
    return prevValue;
  } else {
    return value;
    // ? value.toLowerCase() : value;
  }
};

const metaNormalize = (value, prevValue) => {
  if (value.length > 200) {
    return prevValue;
  } else {
    return value;
    // ? value.toLowerCase() : value;
  }
};

const defaultTheme = createMuiTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        // marginTop: 0,
        width: "100%",
      },
      editor: {
        borderBottom: "1px solid gray",
      },
    },
  },
});

class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_featured: false,
      editor: null,
      editor_data: null,
      anchor: null,
      is_active: false,
      show_confirm: false,
      tags: [],
      all_tags: [],
      dup_tags: [],
      blog_description: "<p></p>",
      isFetching: true,
    };
    this.editorRef = null;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleEditor = this._handleEditor.bind(this);
    this._setAnchor = this._setAnchor.bind(this);
    this._handleFileUpload = this._handleFileUpload.bind(this);
    this._uploadImage = this._uploadImage.bind(this);
    this._handleActive = this._handleActive.bind(this);
    this._handleDelete = this._handleDelete.bind(this);
    this._handleDialogClose = this._handleDialogClose.bind(this);
    this._suspendItem = this._suspendItem.bind(this);
    this._handleChangeKeywords = this._handleChangeKeywords.bind(this);
  }

  componentDidMount() {
    serviceGetTagsList().then((res) => {
      if (!res.error) {
        this.setState({
          all_tags: res.data,
          dup_tags: res.data,
        });
      }
    });

    const { data } = this.props;
    let htmlData = "";
    if (data) {
      // console.log(data.is_featured)
      this.setState({
        is_featured: data.is_featured,
      });
      requiredFields = [
        "title",
        "tags",
        "industry_id",
        "read_time",
        "author",
        "meta_description",
        "slug",
      ];
      Object.keys(data).forEach((val) => {
        if (
          [
            "cover_image",
            "description",
            "tags",
            "status",
            "view_count",
            "createdAt",
            "industry_name",
          ].indexOf(val) < 0
        ) {
          const temp = data[val];
          this.props.change(val, temp);
        }
      });
      this.setState({
        is_active: data.status == "ACTIVE",
        tags: data.tags,
        is_featured: data.is_featured,
        blog_description: data.description,
        isFetching: false,
      });
      htmlData = data.description;
    } else {
      htmlData = "";
      requiredFields = [
        "title",
        "tags",
        "industry_id",
        "read_time",
        "author",
        "meta_description",
        "cover_image",
      ];
      this.setState({
        isFetching: false,
      });
    }

    // const contentHTML = convertFromHTML(htmlData)
    //
    // const state = ContentState.createFromBlockArray(contentHTML.contentBlocks, contentHTML.entityMap)
    // const tempData = convertToRaw(state);
    // const entityMap = tempData.entityMap;
    // Object.keys(entityMap).forEach((key, index) => {
    //     const tempValue = entityMap[key];
    //     if ('data' in tempValue && 'src' in tempValue.data) {
    //         entityMap[key].data = { ...tempValue.data, url: tempValue.data.src };
    //     }
    // });
    // this.setState({
    //     editor_data:  JSON.stringify(tempData),
    // })
  }

  _handleSubmit(tData) {
    const { editor, tags, blog_description } = this.state;
    //console.log(editor)
    if (tags.length == 0) {
      EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
        error: "Please Enter Tags",
        type: "error",
      });
    } else if (blog_description.length <= 11) {
      EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
        error: "Please Enter Description",
        type: "error",
      });
    } else {
      const fd = new FormData();
      Object.keys(tData).forEach((key) => {
        if (["tags", "is_featured"].indexOf(key) < 0) {
          fd.append(key, tData[key]);
        }
      });
      fd.append("description", blog_description);
      fd.append("tags", this.state.tags);
      fd.append("is_featured", JSON.stringify(this.state.is_featured));
      fd.append("status", this.state.is_active ? "ACTIVE" : "INACTIVE");
      // fd.append('description', editor);
      const { data } = this.props;
      if (data) {
        this.props.handleDataSave(fd, "UPDATE");
      } else {
        this.props.handleDataSave(fd, "CREATE");
      }
    }
  }

  // _handleEditor(data, b) {
  //     if (!data.getCurrentContent().hasText()) {
  //         this.setState({
  //             editor: null
  //         })
  //     } else {
  //         // console.log('data',convertFromRaw(data));
  //         const html = stateToHTML(data.getCurrentContent());
  //         console.log('data', data);
  //         this.setState({
  //             editor: html
  //         })
  //     }
  // }

  _handleEditor(data) {
    this.setState({
      blog_description: data,
    });
  }

  _handleActive() {
    this.setState({
      is_active: !this.state.is_active,
    });
  }
  _renderStatus() {
    const { data } = this.props;

    return (
      <FormControlLabel
        control={
          <Switch
            color={"primary"}
            checked={this.state.is_active}
            onChange={this._handleActive.bind(this)}
            value="is_active"
          />
        }
        label="Active ?"
      />
    );
  }
  handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
  };

  async _handleFileUpload(file) {
    console.log(this.editorRef);
    if (this.editorRef) {
      this.editorRef.insertAtomicBlockAsync(
        "IMAGE",
        this._uploadImage(file),
        "Uploading now..."
      );
    }
  }

  _handleSave = (data) => {
    console.log("handleSave", data);
    const tData = JSON.parse(data);
    const state = convertFromRaw(tData);
    console.log("state", state);
  };

  _uploadImage(file) {
    console.log(file);
    return new Promise(async (res, rej) => {
      const fd = new FormData();
      fd.append("image", file);
      const req = await serviceUploadBlogImage(fd);
      if (!req.error) {
        res({
          data: {
            src: req.data.image,
            url: req.data.image,
            width: 300,
            // height: 200,
            alignment: "left", // or "center", "right"
            type: "image", // or "video"
          },
        });
      } else {
        rej();
      }
    });
  }

  _setAnchor(anchor) {
    this.setState({
      anchor: anchor,
    });
  }
  _renderEditor() {
    const { editor_data, anchor } = this.state;
    if (editor_data) {
      return (
        <>
          <UploadImagePopover
            anchor={anchor}
            onSubmit={(data, insert) => {
              if (insert && data.file) {
                this._handleFileUpload(data.file);
              }
              this._setAnchor(null);
            }}
          />
          <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
              ref={(ref) => {
                this.editorRef = ref;
              }}
              defaultValue={editor_data}
              onChange={this._handleEditor}
              onSave={this._handleSave}
              label="Start typing..."
              controls={[
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "undo",
                "redo",
                "numberList",
                "bulletList",
                "quote",
                "link",
              ]} //"save","upload-image", "highlight","media"
              inlineToolbar={true}
              // customControls={[
              //     {
              //         name: "upload-image",
              //         icon: <BackupIcon />,
              //         type: "callback",
              //         onClick: (_editorState, _name, anchor) => {
              //             this._setAnchor(anchor)
              //         }
              //     }
              // ]}
              draftEditorProps={{
                handleDroppedFiles: (_selectionState, files) => {
                  if (files.length && files[0].name !== undefined) {
                    this._handleFileUpload(files[0]);
                    return "handled";
                  }
                  return "not-handled";
                },
              }}
            />
          </MuiThemeProvider>
        </>
      );
    }
  }

  _handleTitleChange(e) {
    let text = "";
    if (typeof e == "string") {
      text = e;
    } else {
      text = e.target.value;
    }
    this.props.change("slug", slugify(text.toLowerCase()));
  }

  _handleChange() {
    this.setState({
      is_featured: !this.state.is_featured,
    });
  }

  _convertData(data) {
    const temp = {};
    data.forEach((val) => {
      temp[val.id] = val.name;
    });
    return temp;
  }
  _suspendItem() {
    const { data } = this.props;
    this.setState({
      show_confirm: false,
    });
    this.props.handleDelete(data.id);
  }

  _handleDialogClose() {
    this.setState({
      show_confirm: false,
    });
  }

  _handleDelete() {
    this.setState({
      show_confirm: true,
    });
  }

  _renderDialog() {
    const { classes } = this.props;
    if (this.state.show_confirm) {
      return (
        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={this.state.show_confirm}
          onClose={this._handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the item?
              <br />
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
        </Dialog>
      );
    }
    return null;
  }

  // _handleChangeKeywords(event, value){
  //     console.log('onchange', event, value);
  //     const {tags} = this.state
  //     this.setState({
  //         tags: value
  //     })
  // }

  _handleChangeKeywords(event, value, reason, detail) {
    const { tags, all_tags } = this.state;
    //console.log('already', tags, 'new ', value, reason, detail);
    const tempKeywords = value.filter((val, index) => {
      if (val.trim() === "" || !/^[a-zA-Z0-9/.,\-_+# ]*$/.test(val.trim())) {
        return false;
      } else if (val.length > 21) {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Enter Characters less than 20",
          type: "error",
        });
        return false;
      } else {
        return true;
        const key = val.trim().toLowerCase();
        const isThere = tags.findIndex((keyTwo, indexTwo) => {
          return keyTwo.toLowerCase() === key;
        });
        return isThere < 0;
      }
    });
    let filterdData = [];
    if (tempKeywords.length > 1) {
      tempKeywords.reverse().forEach((val, index) => {
        if (index < tempKeywords.length) {
          let isThere = false;
          for (let i = index + 1; i < tempKeywords.length; i++) {
            if (
              val.trim().toLowerCase() === tempKeywords[i].trim().toLowerCase()
            ) {
              isThere = true;
            }
          }
          if (!isThere) {
            filterdData.push(val.trim());
          }
        }
      });
      filterdData.reverse();
    } else {
      filterdData = tempKeywords;
    }

    if (filterdData.length <= 6) {
      const dup = [...this.state.dup_tags];
      filterdData.forEach((val) => {
        const t = dup.indexOf(val);
        if (t >= 0) {
          dup.splice(t, 1);
        }
      });
      this.setState({
        tags: filterdData,
        all_tags: dup,
      });
    } else if (tempKeywords.length > 6) {
      EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
        error: "Maximum 6 Keywords ",
        type: "error",
      });
    }
  }

  render() {
    const { handleSubmit, cities, data } = this.props;
    const { all_tags, isFetching } = this.state;
    if (isFetching) {
      return <WaitingComponent />;
    }
    return (
      <div>
        <div className={styles.headerFlex}>
          <h4 className={styles.infoTitle}>
            <div className={styles.heading}>Blogs</div>
            <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip>
          </h4>
          {data && (
            <IconButton
              variant={"contained"}
              className={this.props.classes.iconBtnError}
              onClick={this._handleDelete}
              type="button"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        <form onSubmit={handleSubmit(this._handleSubmit)}>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="title"
                component={renderOutlinedTextField}
                type={"text"}
                margin={"dense"}
                normalize={titleNormalize}
                onChange={this._handleTitleChange}
                label="Title"
              />
            </div>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="slug"
                component={renderOutlinedTextField}
                type={"text"}
                //disabled={true}
                margin={"dense"}
                label="Slug"
              />
            </div>
          </div>

          <div className="formFlex">
            <div className={"formGroup"}>
              <Autocomplete
                multiple
                onChange={this._handleChangeKeywords}
                id="tags-filled"
                options={all_tags}
                value={this.state.tags}
                freeSolo
                selectOnFocus={false}
                // noOptionsText={this._renderNoText}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    /> // disabled={option.length < 2}
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    placeholder="Tags"
                  />
                )}
              />
            </div>
          </div>
          <label className={styles.enter}>
            Please press enter to add a tag if not found in the search results.
          </label>

          <div className="formFlex">
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="industry_id"
                component={renderOutlinedSelectField}
                margin={"dense"}
                label="Industry"
              >
                {this.props.industries.map((val) => {
                  return <MenuItem value={val.id}>{val.name}</MenuItem>;
                })}
              </Field>
            </div>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="read_time"
                component={renderOutlinedTextField}
                margin={"dense"}
                type={"number"}
                normalize={negativeNormalize}
                label="No. of Mins of Read"
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="author"
                component={renderOutlinedSelectField}
                type={"text"}
                margin={"dense"}
                label="Author"
              >
                <MenuItem value={"REVIEWER"}>Reviewer</MenuItem>
                <MenuItem value={"TECH"}>Tech</MenuItem>
                <MenuItem value={"BIZ"}>Biz</MenuItem>
                <MenuItem value={"KNOWLEDGE"}>Knowledge</MenuItem>
                <MenuItem value={"NEWS"}>News</MenuItem>
                <MenuItem value={"TEST"}>Test</MenuItem>
              </Field>
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                fullWidth={true}
                name="meta_description"
                component={renderOutlinedTextField}
                // multiline
                // rows="2"
                margin={"dense"}
                normalize={metaNormalize}
                label="Meta Description"
              />
            </div>
          </div>

          <label className={styles.enter}>
            Image should be in JPG, PNG format and should of 16:9 ratio
          </label>
          <div className="formFlex">
            <div className={"formGroup"}>
              <Field
                max_size={5 * 1024 * 1024}
                type={["jpg", "png", "jpeg"]}
                fullWidth={true}
                name="cover_image"
                component={renderFileField}
                label="Cover Image"
                errorText={"Max Size 5Mb, jpg, png, jpeg allowed"}
                link={data ? data.cover_image : ""}
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Field
                name="is_featured"
                component={renderCheckbox}
                label={"Featured"}
                onChange={this._handleChange}
              />
            </div>
          </div>

          <label className={styles.enter}>Blog Description</label>
          <NewEditor
            editorData={this.state.blog_description}
            handleChangeEditor={this._handleEditor}
          />
          {/*<div className={'formFlex'}>*/}
          {/*    <div className={csx('formGroup', styles.editorContainer)}>*/}
          {/*        {this._renderEditor()}*/}
          {/*    </div>*/}
          {/*</div>*/}

          <br />
          <br />
          {this._renderStatus()}
          <div style={{ float: "right" }}>
            <Button variant={"contained"} color={"primary"} type={"submit"}>
              Submit
            </Button>
          </div>
        </form>
        {this._renderDialog()}
      </div>
    );
  }
}

const useStyle = (theme) => ({
  btnSuccess: {
    backgroundColor: theme.palette.success.dark,
    color: "white",
    marginRight: 5,
    marginLeft: 5,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  btnError: {
    backgroundColor: theme.palette.error.dark,
    color: "white",
    marginLeft: 5,
    marginRight: 5,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  iconBtnError: {
    color: theme.palette.error.dark,
  },
});

const ReduxForm = reduxForm({
  form: "blogs", // a unique identifier for this form
  validate,
  asyncValidate,
  // enableReinitialize: true,

  // onSubmitFail: errors => {
  //     console.log(errors);
  //     EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: 'Please enter values', type: 'error'});
  //
  // }
})(withStyles(useStyle, { withTheme: true })(Blogs));

export default connect(null, null)(ReduxForm);

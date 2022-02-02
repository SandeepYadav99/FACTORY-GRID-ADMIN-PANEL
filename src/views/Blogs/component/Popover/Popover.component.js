import React, {Component} from "react";
import Grid from '@material-ui/core/Grid'
import Popover from '@material-ui/core/Popover'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import {withStyles} from "@material-ui/core/styles";


const useStyles = {
    root: {
        padding: 10,
        maxWidth: 350
    },
    textField: {
        width: "100%"
    },
    input: {
        display: "none"
    }
};



class UploadImagePopover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchor: null,
            isCancelled: false,
            data: {}
        };
        this._handleFileChange = this._handleFileChange.bind(this);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.anchor != this.props.anchor) {
            this.setState({
                anchor: this.props.anchor,
                isCancelled: false,
                file: undefined,
            })
        }
    }

    _handleFileChange(e) {
        const { data } = this.state;
        this.setState({
            data: {
                ...data,
                file: e.target.files[0]
            }
        });
    }

    render() {
        const { anchor, data, isCancelled } = this.state;
        const {onSubmit, classes} = this.props;
        return (
            <Popover
                anchorEl={anchor}
                open={anchor !== null}
                onExited={() => {
                    onSubmit(data, !isCancelled)
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <Grid container spacing={1} className={classes.root}>
                    <Grid item xs={10}>
                        <TextField
                            className={classes.textField}
                            disabled
                            value={ 'file' in data ?  data.file.name : ""}
                            placeholder="Click icon to attach image"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            onChange={this._handleFileChange}
                        />
                        <label htmlFor="contained-button-file">
                            <IconButton color="primary" aria-label="upload image" component="span">
                                <AttachFileIcon />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item container xs={12} justify="flex-end">
                        <Button onClick={() => {
                            this.setState({
                                anchor: null,
                                isCancelled: true
                            })
                        }}
                        >
                            <CloseIcon />
                        </Button>
                        <Button onClick={() => {
                            this.setState({
                                anchor: null,
                                isCancelled: false
                            })
                        }}
                        >
                            <DoneIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Popover>
        );
    }
}
export default withStyles(useStyles)(UploadImagePopover);

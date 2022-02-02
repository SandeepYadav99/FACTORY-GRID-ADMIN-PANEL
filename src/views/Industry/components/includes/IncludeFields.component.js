/**
 * Created by charnjeetelectrovese@gmail.com on 5/13/2020.
 */

import React from 'react';
import { TextField, IconButton, ButtonBase, Checkbox,Select,MenuItem ,withStyles,FormControl,InputLabel  } from '@material-ui/core';
import { RemoveCircleOutline as RemoveIcon, AddCircle as AddIcon } from '@material-ui/icons';
import styles from './style.module.css';

const useStyles = {
    toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
    },
    toggleLabel: {
        color: 'black',
        fontWeight: 100
    },
    buttons: {
        marginTop: 30,
        float: 'right'
    },
    saveButton: {
        marginLeft: 5
    }
};

class IncludeFields extends  React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
        this._handleChange = this._handleChange.bind(this);
        this._handleIsFeatured = this._handleIsFeatured.bind(this);
    }


    async handleSubmit(data) {

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    _handleChange(e) {
        const temp = this.props.index;
        this.props.changeData(temp, { [e.target.name]: e.target.value } );
    }
    _handleIsFeatured(e) {
        // console.log()
        this.props.changeData(this.props.index, { [e.target.name]: !this.props.data.is_included } );
    }
    render() {
        return (
            <div>
                <div className={styles.flexContainer}>
                    <div>
                        <Checkbox
                            name={'is_included'}
                            checked={this.props.data.is_included}
                            onChange={this._handleIsFeatured}
                        />
                    </div>
                    <div className={styles.flex1}>
                        <div>
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel  margin={'dense'}>Applies To</InputLabel>
                                <Select
                                    onChange={this._handleChange}
                                    value={this.props.data.apply}
                                    fullWidth={true}
                                    // floatingLabelText="Title"
                                    name={'apply'}
                                    margin={'dense'}
                                    // variant={'outlined'}
                                    label={'Applies To'}
                                >
                                    <MenuItem value={'CUSTOMER'}>Customer</MenuItem>
                                    <MenuItem value={'MANUFACTURER'}>Manufacturer</MenuItem>
                                    <MenuItem value={'BOTH'}>Both</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={styles.flex1}>
                        <TextField
                            onChange={this._handleChange}
                            value={this.props.data.title}
                            fullWidth={true}
                            floatingLabelText="Title"
                            name={'title'}
                            margin={'dense'}
                            variant={'outlined'}
                            label={'Title'}
                        />
                    </div>
                    <div className={'textCenter'}>
                        <IconButton
                            label={this.props.index == 0 ? "+" : '-'}
                            onClick={() => {
                                this.props.handlePress(this.props.index == 0 ? "ADDITION" : 'DELETE', this.props.index);
                            }}
                        >
                            {this.props.index == 0 ? (<AddIcon />) : (<RemoveIcon />) }
                        </IconButton>
                        {/*<RaisedButton*/}
                        {/*    onClick={() => {*/}
                        {/*        this.props.handlePress(this.props.index == 0 ? "ADDITION" : 'DELETE', this.props.index);*/}
                        {/*    }}*/}
                        {/*    label={this.props.index == 0 ? "+" : '-'}*/}
                        {/*    style={styles.saveButton}*/}
                        {/*    secondary={true}/>*/}
                    </div>
                </div>

            </div>
        );
    };
};

export default withStyles(useStyles)(IncludeFields)

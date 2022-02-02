import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, ButtonBase, Paper, withStyles} from "@material-ui/core";
import styles from './style.module.css'

class BusinessView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }

    render() {
        const {data} = this.props;
        return (
            <Paper>
            <div className={'midContainer'}>
                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <label>Company Name</label>
                        <div>
                            {/*<img className={styles.userImage} src={data.user_image}/>*/}
                        </div>
                    </div>

                    <div className={'formGroup'}>
                        <label>Company Logo</label>
                        <div>
                            {/*<img className={styles.userImage} src={data.user_image}/>*/}
                        </div>
                    </div>
                </div>


            </div>
            </Paper>
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
    }
});


function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(useStyle, {withTheme: true})(BusinessView)));
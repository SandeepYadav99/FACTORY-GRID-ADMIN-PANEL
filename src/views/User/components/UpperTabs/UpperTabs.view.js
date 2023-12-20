import React from 'react';
import styles from './style.module.css'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme, withStyles, withTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserView from '../../Create/User.view';
import WorkProfile from '../../components/Work/WorkProfile.view'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ShareIcon from '@material-ui/icons/Share';
import {Paper} from "@material-ui/core";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            // aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div className={'container'}>
                    <div className={styles.innerContainer}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };

    }

    componentDidMount() {

    }


    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme} = this.props
        return (
            <div>
                <AppBar position="static" className={styles.backgroundColor}>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        // centered
                        // aria-label="full width tabs example"
                    >
                        <Tab className={'iconTabs'} icon=<PersonOutlineIcon fontSize={'small'}/> label="Personal Info"{...a11yProps(0)} />
                        <Tab className={'iconTabs'} icon=<WorkOutlineIcon fontSize={'small'}/>  label="Work Info" {...a11yProps(1)} />
                        <Tab className={'iconTabs'} icon=<ShareIcon fontSize={'small'}/> label="Social" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>

                <div className={styles.paperBackground}>
                    <TabPanel value={this.state.value} index={0} dir={theme.direction}>
                        <UserView/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} dir={theme.direction}>
                        <WorkProfile/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2} dir={theme.direction}>

                    </TabPanel>
                </div>
            </div>
        )
    }
}

export default withTheme(ProfileView);


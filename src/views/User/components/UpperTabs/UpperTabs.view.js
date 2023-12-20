import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserView from "../../Create/User.view";
import WorkProfile from "../../components/Work/WorkProfile.view";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ShareIcon from "@material-ui/icons/Share";
import { Paper } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <div className={"container"}>
          <div className={styles.innerContainer}>{children}</div>
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
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

const ProfileView = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
const [profileData, setProfileData]=useState(null)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openWorkProfileTab = (form) => {
    setValue(1);
    setProfileData(form)
  };

  return (
    <div>
      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab
            className={"iconTabs"}
            icon={<PersonOutlineIcon fontSize={"small"} />}
            label="Personal Info"
            {...a11yProps(0)}
          />
          <Tab
            className={"iconTabs"}
            icon={<WorkOutlineIcon fontSize={"small"} />}
            label="Work Info"
            {...a11yProps(1)}
          />
          {/* <Tab
            className={"iconTabs"}
            icon={<ShareIcon fontSize={"small"} />}
            label="Social"
            {...a11yProps(2)}
          /> */}
        </Tabs>
      </AppBar>

      <div className={styles.paperBackground}>
        <TabPanel value={value} index={0}>
          <UserView openWorkProfileTab={openWorkProfileTab} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WorkProfile />
        </TabPanel>
        {/* <TabPanel value={value} index={2}></TabPanel> */}
      </div>
    </div>
  );
};

export default ProfileView;

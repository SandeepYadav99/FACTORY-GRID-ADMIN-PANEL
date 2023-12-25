import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserView from "../User/User.view";
import WorkProfile from "../../components/Work/WorkProfile.view";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ShareIcon from "@material-ui/icons/Share";
import { Paper } from "@material-ui/core";
import { serviceCreateProviderUser } from "../../../../services/ProviderUser.service";
import historyUtils from "../../../../libs/history.utils";
import useUpperTabsHook from "./UpperTabsHook";

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
  const {
    form,
    errorData,
    isSubmitting,
    listData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    document,
    value,
    setValue,
    setValidateContact,
    image,
    setTypeOf,
    setPhoneContact,
    handleSubmitToSave
    
  } = useUpperTabsHook({});

  const classes = useStyles();



  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <UserView
            form={form}
            errorData={errorData}
            changeTextData={changeTextData}
            onBlurHandler={onBlurHandler}
            // handleSubmit={handleSubmit}
            handleSubmit={handleSubmit}
            image={image}
            setTypeOf={setTypeOf}
            setPhoneContact={setPhoneContact}
            setValidateContact={setValidateContact}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WorkProfile  form={form}
            errorData={errorData}
            changeTextData={changeTextData}
            onBlurHandler={onBlurHandler}
            handleSubmitToSave={handleSubmitToSave}
            listData={listData}
            setTypeOf={setTypeOf}
            setPhoneContact={setPhoneContact}/>
        </TabPanel>
        {/* <TabPanel value={value} index={2}></TabPanel> */}
      </div>
    </div>
  );
};

export default ProfileView;

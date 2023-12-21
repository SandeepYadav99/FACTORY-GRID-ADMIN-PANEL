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
    handleSubmitWorkTab,
    image,
    setTypeOf
    
  } = useUpperTabsHook({});

  const classes = useStyles();
  // const [value, setValue] = useState(0);

  const [allData, setAllData] = useState({
    personalInfo: null,
    workInfo: null,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const openWorkData = (form) => {
    setAllData((prevData) => ({
      ...prevData,
      workInfo: form,
    }));
  };

  // useEffect(() => {
  //   const formData = new FormData();
   
  //   if (allData?.personalInfo?.name)
  //     formData.append("name", allData?.personalInfo?.name);
  //   if (allData?.personalInfo?.image)
  //     formData.append("image", allData?.personalInfo?.image);
  //   if (allData?.personalInfo?.contact)
  //     formData.append("contact", allData?.personalInfo?.contact);
  //   if (allData?.personalInfo?.email)
  //     formData.append("email", allData?.personalInfo?.email);
  //   if (allData?.personalInfo?.role)
  //     formData.append("role", allData?.personalInfo?.role);
  //   //  formData.append('type',  allData?.personalInfo?.type);
  //   if (allData?.personalInfo?.password)
  //     formData.append("password", allData?.personalInfo?.password); //
  //   if (allData?.personalInfo?.employee_id)
  //     formData.append("employee_id", allData?.personalInfo?.employee_id);
  //   if (allData?.workInfo?.joining_date)
  //     formData.append("joining_date", allData?.workInfo?.joining_date);
  //   if (allData?.workInfo?.department)
  //     formData.append("department", allData?.workInfo?.department);
  //   if (allData?.workInfo?.designation)
  //     formData.append("designation", allData?.workInfo?.designation);
  //   if (allData?.workInfo?.manager)
  //     formData.append("manager", allData?.workInfo?.manager);

  //   serviceCreateProviderUser(formData).then((res) => {
  //     if (!res.error) {
  //       historyUtils.push("/users");
  //     }
  //   });
  // }, [allData]);

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
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <WorkProfile  form={form}
            errorData={errorData}
            changeTextData={changeTextData}
            onBlurHandler={onBlurHandler}
            handleSubmitWorkTab={handleSubmitWorkTab}
            listData={listData}
            setTypeOf={setTypeOf}/>
        </TabPanel>
        {/* <TabPanel value={value} index={2}></TabPanel> */}
      </div>
    </div>
  );
};

export default ProfileView;

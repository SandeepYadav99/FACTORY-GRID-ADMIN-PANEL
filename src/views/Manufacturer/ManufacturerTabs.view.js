import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import DetailsIcon from "@material-ui/icons/Details";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Button } from "@material-ui/core";
import { Report } from "@material-ui/icons";
import MuiStyle from "../../libs/MuiStyle";
import CustomerProfile from "./components/Profile/CustomerProfile.view";
import BusinessDetails from "./components/Business/BusinessDetails.view";
import useCustomerProfileHook from "../../helper/CustomerProfileHook";
import SuspendPopup from "./components/SuspendPopup/SuspendPopup";
import WaitingComponent from "../../components/Waiting.component";
import KYC from "./components/Kyc/KYC";

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

const ManufacturerTabs = ({ classes, theme }) => {
  // const [value, setValue] = useState(0);
  // const [isOpenDialog, setIsOpenDialog] = useState(false);
  const {
    userProfile,
    renderInterestArea,
    isLoading,
    value,
    isOpenDialog,
    toggleIsOpenDialog,
    handleChange,
    handleSuspendBtn
  } = useCustomerProfileHook();

 

  const renderStatus = useCallback((status) => {
    if (status === "ACTIVE") {
      return (
        <span
          style={{
            fontSize: "12px",
            color: "white",
            background: "green",
            padding: "5px 10px",
            borderRadius: "4px",
            textTransform: "capitalize",
          }}
        >
          {status}
        </span>
      );
    }
    return (
      <span
        style={{
          ...styles.spanFont,
          fontSize: "12px",
          color: "white",
          background: `${status == "NEW" ? "orange" : "orange"}`,
          padding: "5px 10px",
          borderRadius: "4px",
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  }, []);

  return (
    <div>
      <div className={styles.upperFlex}>
        <div>
          <strong>User Profile</strong>
        </div>

        <div className={styles.buttonFlex}>
          <div>
            <Button
              // variant="contained"
              // className={`${classes.btnError} `}
              onClick={handleSuspendBtn}
              type="button"
            >
              {renderStatus(userProfile?.status || "N/A")}
            </Button>
            <Button
              variant="contained"
              className={classes.btnError}
              onClick={toggleIsOpenDialog}
              type="button"
            >
              <Report />
              Suspend
            </Button>
          </div>
        </div>
      </div>

      <AppBar position="static" className={styles.backgroundColor}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          // centered
          // aria-label="full width tabs example"
        >
          <Tab
            className={"iconTabs"}
            icon=<PersonOutlineIcon fontSize={"small"} />
            label="Personal"
            {...a11yProps(0)}
          />
          <Tab
            className={"iconTabs"}
            icon=<WorkOutlineIcon fontSize={"small"} />
            label="Business Details"
            {...a11yProps(1)}
          />
          <Tab
            className={"iconTabs"}
            icon=<ShoppingBasketIcon fontSize={"small"} />
            label="Products"
            {...a11yProps(2)}
          />
          <Tab
            className={"iconTabs"}
            icon=<DetailsIcon fontSize={"small"} />
            label="KYC"
            {...a11yProps(3)}
          />
          <Tab
            className={"iconTabs"}
            icon=<LoyaltyIcon fontSize={"small"} />
            label="Badges"
            {...a11yProps(4)}
          />
          <Tab
            className={"iconTabs"}
            icon=<FormatQuoteIcon fontSize={"small"} />
            label="Quotes"
            {...a11yProps(5)}
          />
          <Tab
            className={"iconTabs"}
            icon=<CreditCardIcon fontSize={"small"} />
            label="Transactions"
            {...a11yProps(6)}
          />
        </Tabs>
      </AppBar>

      <div className={styles.paperBackground}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          {isLoading ? (
            <WaitingComponent />
          ) : (
            <CustomerProfile
              userProfile={userProfile}
              renderInterestArea={renderInterestArea}
              isLoading={isLoading}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <BusinessDetails
            userProfile={userProfile}
            renderInterestArea={renderInterestArea}
            isLoading={isLoading}
          />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <KYC userProfile={userProfile} />
        </TabPanel>
      </div>
      <SuspendPopup
        candidateId={userProfile?._id}
        isOpen={isOpenDialog}
        handleToggle={toggleIsOpenDialog}
      />
    </div>
  );
};

const useStyle = MuiStyle;

export default withStyles(useStyle, { withTheme: true })(ManufacturerTabs);

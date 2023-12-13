import React from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {
  makeStyles,
  useTheme,
  withStyles,
  withTheme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ShareIcon from "@material-ui/icons/Share";
import DetailsIcon from "@material-ui/icons/Details";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Button, ButtonBase, Paper } from "@material-ui/core";
import CustomerView from "../Customers/components/Info/Customer.view";
import { Report } from "@material-ui/icons";
import MuiStyle from "../../libs/MuiStyle";
import CustomerProfile from "./components/Profile/CustomerProfile.view";
import BusinessDetails from "./components/Business/BusinessDetails.view";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      // aria-labelledby={`full-width-tab-${index}`}
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

class ManufacturerTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {}

  _renderSuspendBtn() {
    //onClick={this._handleApprove}
    const { data } = this.state;

    // if (((['ACTIVE']).indexOf(data.status) >= 0)) {
    return (
      <Button
        variant={"contained"}
        className={this.props.classes.btnError}
        onClick={this._handleSuspendBtn}
        type={"button"}
      >
        <Report /> Suspend
      </Button>
    );
    // }
    return null;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <div className={styles.upperFlex}>
          <div>
            {/*<ButtonBase onClick={() => (history.goBack())}>*/}
            {/*    <ArrowBackIosIcon fontSize={'small'} className={styles.backArrow}/>*/}
            {/*</ButtonBase>*/}
            <strong>User Profile</strong>
          </div>

          <div className={styles.buttonFlex}>
            {this._renderSuspendBtn()}
            {/*{data && (<div>*/}
            {/*    {changingStatus ? (<WaitingComponent/>) : <>{this._renderApproveButton()}*/}
            {/*    </>}*/}
            {/*</div>)}*/}
          </div>
        </div>

        <AppBar position="static" className={styles.backgroundColor}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
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
          <TabPanel value={this.state.value} index={0} dir={theme.direction}>
            <CustomerProfile />
          </TabPanel>
          <TabPanel value={this.state.value} index={1} dir={theme.direction}>
            <BusinessDetails />
          </TabPanel>
          <TabPanel
            value={this.state.value}
            index={2}
            dir={theme.direction}
          ></TabPanel>
          <TabPanel
            value={this.state.value}
            index={3}
            dir={theme.direction}
          ></TabPanel>
        </div>
      </div>
    );
  }
}

const useStyle = MuiStyle;

export default withStyles(useStyle, { withTheme: true })(ManufacturerTabs);

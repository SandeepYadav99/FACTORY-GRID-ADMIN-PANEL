import React from "react";
import styles from "./style.module.css";
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
import { ButtonBase, Paper } from "@material-ui/core";
import CustomerView from "../Info/Customer.view";
import BusinessView from "../Info/Business.view";
import KYCContainer from "../KYC.container";



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

class CustomerTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {}

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
              icon=<DetailsIcon fontSize={"small"} />
              label="KYC"
              {...a11yProps(2)}
            />
            <Tab
              className={"iconTabs"}
              icon=<LoyaltyIcon fontSize={"small"} />
              label="Badges"
              {...a11yProps(3)}
            />
            <Tab
              className={"iconTabs"}
              icon=<FormatQuoteIcon fontSize={"small"} />
              label="Quotes"
              {...a11yProps(4)}
            />
            <Tab
              className={"iconTabs"}
              icon=<CreditCardIcon fontSize={"small"} />
              label="Transactions"
              {...a11yProps(5)}
            />
          </Tabs>
        </AppBar>

        <div className={styles.paperBackground}>
          <TabPanel value={this.state.value} index={0} dir={theme.direction}>
            <CustomerView />
          </TabPanel>
          <TabPanel value={this.state.value} index={1} dir={theme.direction}>
            <BusinessView />
          </TabPanel>
          <TabPanel
            value={this.state.value}
            index={2}
            dir={theme.direction}
          >
            <KYCContainer/>
          </TabPanel>
        </div>
      </div>
    );
  }
}

export default withTheme(CustomerTabs);

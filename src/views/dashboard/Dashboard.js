import React, { useEffect, useRef } from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  withStyles,
  Typography,
  Paper,
  Card,
  CardContent,
} from "@material-ui/core";
import {
  VerifiedUser,
  ShoppingCart as ShopIcon,
  AttachMoney as MoneyIcon,
  Store as ProductIcon,
} from "@material-ui/icons";
import LineStat from "./components/LineStat/LineStat.component";
import mock from "./mock";
import Widget from "../../components/Widget/WidgetView";
import PageTitle from "../../components/PageTitle";
import { connect, useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
// import { Typography } from "../../components/Wrappers/Wrappers";
import DriversList from "./components/Drivers/Drivers.component";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import { WaitingComponent } from "../../components/index.component";
import StatCard from "./components/StatCard/StatCard.component";
import { actionFetchProviderUser } from "../../actions/ProviderUser.action";
import { actionGetDashboard } from "../../actions/Dashboard.action";
import BarChartExample from "./components/BigStat/DashboardBarChart";
import DashboardBarChart from "./components/BigStat/DashboardBarChart";

const getRandomData = (length, min, max, multiplier = 10, maxDiff = 10) => {
  const array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
};

const getMainChartData = () => {
  const resultArray = [];
  const tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  const desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  const mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
};

const mainChartData = getMainChartData();

const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];

const Dashboard = () => {
  // if(is_calling) {
  //     return (<WaitingComponent/>);
  // }
  const isMountRef = useRef(false);
  const dispatch = useDispatch();
  const {
    all,
    dashboard,
    weekly_data,
    drivers,
    total_customers,
    total_revenue,
    total_orders,
    total_products,
  } = useSelector((state) => state?.dashboard);

  useEffect(() => {
    dispatch(actionGetDashboard());
    // isMountRef.current = true;
    // console.log("Action1")
  }, []);

  return (
    <React.Fragment>
      {/* <PageTitle title="Dashboard" /> */}

      <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container spacing={3}>
          <Grid item lg={5} md={8} sm={12} xs={12}>
            <Card>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Total Manufactureres</Typography>
                <Typography>3</Typography>
              </CardContent>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>New</Typography>
                <Typography>3</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={5} md={8} sm={12} xs={12}>
            <Card>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Total Customers</Typography>
                <Typography>0</Typography>
              </CardContent>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>New</Typography>
                <Typography>0</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={12} md={8} sm={12} xs={12}>
            <DashboardBarChart
              data={dashboard?.quoteRequestDaily}
            ></DashboardBarChart>
          </Grid>
        </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
          {/* <Widget title="Total Quote Requests">
            <Table data={mock.table} />
          </Widget> */}
          <Widget>
            {/* <Table data={mock.table} /> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Total Quote Requests</h4>
              <h3>70</h3>
            </div>
            {dashboard?.quoteRequest?.map((quote) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <div>{quote?._id}</div>
                  <div>{quote?.count}</div>
                </div>
              );
            })}
          </Widget>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const styles = (theme) => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    marginBottom: "10px",
    // justifyContent:'space-around'
  },
  progressSection: {
    marginBottom: theme.spacing.unit,
  },
  progressTitle: {
    marginBottom: theme.spacing.unit * 2,
  },
  progress: {
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: theme.spacing.unit,
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit,
  },
  fullHeightBody: {
    display: "flex",
    // flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  progressBar: {
    backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing.unit,
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing.unit * 2,
  },
  legendElementText: {
    marginLeft: theme.spacing.unit,
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing.unit * 2,
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2,
    },
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing.unit * 3,
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    marginLeft: theme.spacing.unit,
  },
});

// function mapStateToProps(state) {
//     return {
//         data: state.common,
//         dashboard: state.dashboard
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({

//     }, dispatch);
// }

export default withStyles(styles, { withTheme: true })(Dashboard);

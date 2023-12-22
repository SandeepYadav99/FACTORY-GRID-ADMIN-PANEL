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
const dispatch=useDispatch()
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
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
    dispatch(
      actionGetDashboard(
        1,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
        }
      )
    );
    // isMountRef.current = true;
    // console.log("Action1")
  }, []);

  console.log(dashboard, total_customers)
  return (
    <React.Fragment>
      <PageTitle title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item lg={4.5} md={4} sm={6} xs={12}>
          <StatCard
            title1={"Total Manufactureres"}
            value={total_customers}
            icon={VerifiedUser}
            title2={"New "}
          ></StatCard>
        </Grid>

        <Grid item lg={4.5} md={4} sm={6} xs={12}>
          <StatCard
            title1={"Total Customers"}
            value={total_orders}
            icon={ShopIcon}
            title2={"New "}
          />
        </Grid>

       
      
        <Grid item xs={12}>
          <LineStat data={weekly_data}></LineStat>
        </Grid>
        <Grid item xs={4}>
          <DriversList data={drivers}></DriversList>
        </Grid>
        <Grid item xs={8}>
          <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            // bodyClass={classes.tableWidget}
          >
            <Table data={mock.table} />
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

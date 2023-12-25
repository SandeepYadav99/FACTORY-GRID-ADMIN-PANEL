import React, { useEffect } from "react";
import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { actionGetDashboard } from "../../actions/Dashboard.action";
import DashboardBarChart from "./components/BigStat/DashboardBarChart";
import style from "./Style.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state?.dashboard);

  useEffect(() => {
    dispatch(actionGetDashboard());
  }, []);

  return (
    <React.Fragment>
      <div className={style.container}>
        <Grid container spacing={1} className={style.gridItem}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Card>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Total Manufactureres</Typography>
                <Typography
                  className={style.title}
                  style={{ fontSize: "26px", color: "#000000" }}
                >
                  {dashboard?.manufacture}
                </Typography>
              </CardContent>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>New</Typography>
                <Typography>{dashboard?.newManufacture}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={6} md={12} sm={12} xs={12}>
            <Card>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>Total Customers</Typography>
                <Typography
                  className={style.title}
                  style={{ fontSize: "26px", color: "#000000" }}
                >
                  {dashboard?.customer}
                </Typography>
              </CardContent>
              <CardContent
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>New</Typography>
                <Typography>{dashboard?.newCustomer}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={style.barChart}>
              <DashboardBarChart
                data={dashboard?.filledData}
              ></DashboardBarChart>
            </div>
          </Grid>
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12} style={{ marginLeft: "6px" }}>
          <div className={style.quoteRequest}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                className={style.totalQuoteTitle}
                style={{ fontSize: "14px", color: "#000000" }}
              >
                Total Quote Requests
              </Typography>
              <Typography
                className={style.totalQuote}
                style={{ fontSize: "26px", color: "#000000" }}
              >
                {dashboard?.totatlQuotes}
              </Typography>
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
          </div>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;

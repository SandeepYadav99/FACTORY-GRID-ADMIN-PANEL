import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";

const DashboardBarChart = ({ data }) => {
  const transformedData = data?.map((item) => ({
    name: item?.date,
    Date: item?.count,
  }));
  return (
    <ResponsiveContainer width="120%" height={250}>
      <BarChart
        data={transformedData}
        margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis>
          <Label value="No. of Quotes" angle={-90} position="center" />
        </YAxis>
        {/* <Tooltip /> */}
        <Legend />
        <Bar dataKey="Date" fill="#23BCDB" label={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;

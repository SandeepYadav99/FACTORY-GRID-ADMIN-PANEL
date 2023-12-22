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
    name: item._id,
    Date: item.count,
  }));
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart
        data={transformedData}
        margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis>
          <Label value="No. of Quotes" angle={-90} position="insideLeft" />
        </YAxis>
        {/* <Tooltip /> */}
        <Legend />
        <Bar dataKey="Date" fill="#23BCDB" label={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;

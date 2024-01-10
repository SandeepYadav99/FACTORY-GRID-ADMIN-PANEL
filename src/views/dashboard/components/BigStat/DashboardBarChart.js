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
    <ResponsiveContainer  width="100%"  height={250}>
      <BarChart
     
        data={transformedData}
        margin={{ top: 25, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 7 }} interval={0} fill="#000000"/>
        <YAxis tick={{ fontSize: 10 }}>
          <Label value="No. of Quotes"  angle={-90} position="insideLeft"   offset={8}  />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="Date"  fill="#23BCDB" label={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;

import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ series, options }) => {
  return (
    <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
      <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default BarChart;
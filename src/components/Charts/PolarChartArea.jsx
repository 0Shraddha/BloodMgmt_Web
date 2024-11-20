import React from "react";
import ReactApexChart from "react-apexcharts";

const PolarAreaChart = ({ series, options }) => {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <ReactApexChart options={options} series={series} type="polarArea" />
    </div>
  );
};

export default PolarAreaChart;

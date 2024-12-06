import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PolarAreaChart from '../Charts/PolarAreaChart';
import {useLocation } from 'react-router-dom';

import { fetchCenterData } from '../../Services/BloodInventoryService';


const ApexChart = () => {
  const location = useLocation();
  const { lat, lng } = location.state || {};
  const [centerBlood, setCenterBlood] = useState({ totalBlood: [] });

  useEffect(() => {
    const loadBloodDetails = async () => {
      try {
        const fetchedBloodDetails = await fetchCenterData(); // Assuming fetchCenterData is a valid function
        setCenterBlood(fetchedBloodDetails);
      } catch (error) {
        console.error("Error fetching center data:", error);
      }
    };

    loadBloodDetails();
  }, []); // Empty dependency array means this will run once when the component mounts

  // Mapping totalBlood to chart data
  const labels = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const series = labels.map((bloodType) => {
    // Finding the blood type count in the fetched data
    const blood = centerBlood.totalBlood.find(
      (bloodItem) => bloodItem.bloodType === bloodType
    );
    return blood ? blood.units : 0; // Default to 0 if the blood type is not found
  });

  const options = {
    chart: {
      type: 'polarArea',
      height: 300,
      width: 300,
    },
    labels: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    stroke: {
      colors: ['#fff'],
    },
    fill: {
      opacity: 0.8,
    },
    legend: {
      show: true,
      position: 'right',
      markers: {
        width: 10,
        height: 10,
      },
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return `${value} units`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 200,
          },
        },
      },
    ],
  };


  return (
    <div>
      <div className="row">
          <div className="p-5">
            <div id="chart" className="mt-4">
              <PolarAreaChart series={series} options={options} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default ApexChart;

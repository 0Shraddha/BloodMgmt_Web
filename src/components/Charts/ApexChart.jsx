import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import PolarAreaChart from '../Charts/PolarAreaChart';
import { fetchCenterData } from '../../Services/BloodInventoryService';

const ApexChart = () => {
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

  const radialOptions = {
    chart: {
      type: 'radialBar',
      height: 250,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '65%',
        },
        track: {
          background: '#e7e7e7',
          strokeWidth: '100%',
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 0.5,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            color: '#3577f1',
          },
          value: {
            show: true,
            fontSize: '20px',
            color: '#333',
          },
        },
      },
    },
    labels: ['Blood Requests'],
  };

  const radialOptions1 = {
    chart: {
      type: 'radialBar',
      height: 350,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '65%',
        },
        track: {
          background: '#e7e7e7',
          strokeWidth: '100%',
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 0.5,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            color: '#fcba28',
          },
          value: {
            show: true,
            fontSize: '20px',
            color: '#333',
          },
        },
      },
    },
    fill: {
      colors: ['#fcba28'],
    },
    labels: ['Blood Received'],
  };

  return (
    <div>
      <div className="row">
        <div className='col-5'>
          <div className="p-5">
            <div id="chart" className="mt-4">
              <PolarAreaChart series={series} options={options} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="col d-flex me-3 mt-5 pt-5">
            <div className="col-6">
              <div id="radial-chart">
                <ReactApexChart options={radialOptions} series={[20]} type="radialBar" />
              </div>
            </div>
            <div className="col-6">
              <div id="radial-chart">
                <ReactApexChart options={radialOptions1} series={[60]} type="radialBar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApexChart;

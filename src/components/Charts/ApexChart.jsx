import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Data for the polarArea chart
      polarSeries: [24, 33, 22, 27, 25, 40, 22, 27, 41],
      polarOptions: {
        chart: {
          type: 'polarArea',
          height: 300,
          width: 300,
        },
        labels: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'Other'], 
        stroke: {
          colors: ['#fff']
        },
        fill: {
          opacity: 0.8
        },
        legend: {
          show: false
        },
        tooltip: {
            y: {
              formatter: (value, { seriesIndex }) => {
                return `${value} units`;
              }
            }
          },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
              height: 200
            },
          }
        }]
      }, 
      
      // Data for the radialBar chart
      radialSeries: [20],  
      radialOptions: {
        chart: {
          type: 'radialBar',
          height: 200,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: '60%',
            },
            track: {
                background: '#e7e7e7', // Background color of the track
                strokeWidth: '100%',
                margin: 5, // Space between track and filled part
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  color: '#999',
                  opacity: 0.5,
                  blur: 2
                }
              },
            dataLabels: {
              name: {
                show: true,
                fontSize: '16px',
                color: '#3577f1'
              },
              value: {
                show: true,
                fontSize: '20px',
                color: '#333'
              }
            }
          }
        },
        labels: ['Blood Requests'],  // Label for radialBar
      },

       // Data for the radialBar chart
       radialSeries1: [50],  
       radialOptions1: {
         chart: {
           type: 'radialBar',
           height: 200,
         },
         plotOptions: {
           radialBar: {
             hollow: {
               size: '60%',
             },
            track: {
              background: '#e7e7e7', // Background color of the track
              strokeWidth: '100%',
              margin: 5, // Space between track and filled part
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: '#999',
                opacity: 0.5,
                blur: 2
              }
            },
             dataLabels: {
               name: {
                 show: true,
                 fontSize: '16px',
                 color: '#3577f1'
               },
               value: {
                 show: true,
                 fontSize: '20px',
                 color: '#333'
               }
             }
           }
         },
         fill: {
            colors: ['#0AB39C'] // Change this color to set the progress color
          },
         labels: ['Blood Received'],  // Label for radialBar
       }
    };
  }

  render() {
    return (
      <div>
        <div className="row mt-5">
            <div className="col-4 p-5">
                <div className="text-center my-3">
                    <span className="px-3 py-2 fw-semibold rounded-pill" style={{ color:' #FF6699',backgroundColor: 'rgb(253,224,224, .5)'}}>Blood Inventory</span>
                </div>
                <div id="chart" className="mt-4">
                    <ReactApexChart options={this.state.polarOptions} series={this.state.polarSeries} type="polarArea" />
                </div>
            
            </div>
            <div className="col-4 p-4">
                 {/* Radial Bar Chart */}
                 <div className="text-center my-3">
                    <span className="px-3 py-2 fw-semibold rounded-pill" style={{ color:' #3577f1',backgroundColor: 'rgba(53, 119, 241, .1)'}}>Blood Requests</span>
                </div>
                <div id="radial-chart" className="mt-4">
                <ReactApexChart options={this.state.radialOptions} series={this.state.radialSeries} type="radialBar" />
                </div>
            </div>
                <div className="col-4 p-4">
                    {/* Radial Bar Chart */}
                    <div className="text-center my-3">
                        <span className="px-3 py-2 fw-semibold rounded-pill" style={{ color:' #0AB39C',backgroundColor: 'rgba(3, 259, 141, .1)'}}>Blood Received</span>
                    </div>
                    <div id="radial-chart" className="mt-4">
                    <ReactApexChart options={this.state.radialOptions1} series={this.state.radialSeries1} type="radialBar" />
                    </div>
                </div>
            
        </div>
       
      </div>
    );
  }
}

export default ApexChart;

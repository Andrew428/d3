import React, { Component } from 'react';
// import PieChart from "../components/pie-chart/index";
import PieChart from "../components/d3-charts/pie-chart";
import DonutChart from "../components/d3-charts/donut-chart";
// import BarChart from "../components/d3-charts/bar-chart";

export default class App extends Component {

  

  render() {
    const piedata = {
      data: [{label:'apple', value: 12}, {label:'orange', value: 5}, {label:'bannana', value: 8}],
      width: 700,
      height: 500,
      color: ["#BBDEFB", "#90CAF9", "#64B5F6"],
      id: "pie",
      classlabel: "pie"
    }
    const donutdata = {
      data: [{label:'apple', value: 49}, {label:'orange', value: 18}, {label:'bannana', value: 85}],
      width: 400,
      height: 400,
      color: ["#2196F3", "#1E88E5", "#1976D2"],
      id: "donut",
      classlabel: "donut"
    }
    // const bardata = {
    //   data: [{label:'apple', value: 49}, {label:'orange', value: 18}, {label:'bannana', value: 85}],
    //   //data: [12,15,3,6,9,7],
    //   width: 400,
    //   height: 400,
    //   color: ["#2196F3", "#1E88E5", "#1976D2"],
    //   id: "bar",
    //   classlabel: "bar"
    // }
    return (
      <div classlabel="app_div">
        D3 Examples
        {/* < PieChart /> */}
        < PieChart id={piedata.id} data={piedata.data} width={piedata.width} height={piedata.height}  color={piedata.color}/>
        < DonutChart id={donutdata.id} data={donutdata.data} width={donutdata.width} height={donutdata.height} color={donutdata.color} />
        {/* < BarChart id={bardata.id} data={bardata.data} width={bardata.width} height={bardata.height} color={bardata.color} /> */}
      </div>
      
    );
  }
}

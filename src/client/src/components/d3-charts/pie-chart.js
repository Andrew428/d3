import React, {
  Component
} from 'react';
import * as d3 from "d3";

class PieChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {

    const data = this.props.data,
    width = this.props.height,
    height = this.props.width,
    radius = width / 2;

    // color range
    var color = d3.scaleOrdinal()
      .range(this.props.color);

    // pie chart arc. Need to create arcs before generating pie
    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);


    // arc for the labels position
    var labelArc = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    // generate pie chart and donut chart
    var pie = d3.pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });

    // define the svg for pie chart
    var svg = d3.select(`#${this.props.id}`).append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // parse data
    data.forEach(function (d) {
      d.value = +d.value;

      // "g element is a container used to group other SVG elements"
      var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      // append path 
      g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
          return color(d.data.label);
        })
        // transition 
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attrTween("d", tweenPie);

      // append text
      g.append("text")
        .transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("transform", function (d) {
          return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function (d) {
          return d.data.label;
        });

    });

    // Helper function for animation of pie chart and donut chart
    function tweenPie(b) {
      b.innerRadius = 0;
      var i = d3.interpolate({
        startAngle: 0,
        endAngle: 0
      }, b);
      return function (t) {
        return arc(i(t));
      };
    }

  }

  render() {
    return <div id = {this.props.id} ></div>
  }
}

export default PieChart;
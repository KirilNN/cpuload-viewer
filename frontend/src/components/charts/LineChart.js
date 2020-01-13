import React from "react";
import * as d3 from "d3";
import drawer from "./helpers/lineChart";

const LineChart = props => {
  React.useEffect(() => {
    d3.select("#chart")
      .datum(props.data)
      .call(drawer());
  });

  return <div id="chart"></div>;
};

export default LineChart;

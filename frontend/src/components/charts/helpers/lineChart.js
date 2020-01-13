import * as d3 from "d3";

const drawer = () => {
  const margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 600,
    height = 400,
    duration = 10000,
    color = d3.schemeCategory10;

  return selection => {
    selection.each(function(data) {
      data = [
        {
          label: "value",
          values: data.map(d => ({ time: +d.time, value: d.value }))
        }
      ];

      function tick() {
        const xMinLess = new Date(new Date(xMin).getTime() - duration);

        d3.select(this)
          .attr("d", d => line(d.values))
          .attr("transform", null);

        d3.active(this)
          .attr("transform", "translate(" + x(xMinLess) + ",0)")
          .transition()
          .on("start", tick);
      }

      const t = d3
          .transition()
          .duration(duration)
          .ease(d3.easeLinear),
        x = d3.scaleTime().rangeRound([0, width - margin.left - margin.right]),
        y = d3
          .scaleLinear()
          .rangeRound([height - margin.top - margin.bottom, 0]),
        z = d3.scaleOrdinal(color);

      const xMin = d3.min(data, c => d3.min(c.values, d => d.time));

      const xMax = new Date(
        new Date(d3.max(data, c => d3.max(c.values, d => d.time))).getTime() -
          duration * 2
      );

      x.domain([xMin, xMax]);
      y.domain([0, 10]);
      z.domain(data.map(c => c.label));

      const line = d3
        .line()
        .curve(d3.curveBasis)
        .x(d => x(d.time))
        .y(d => y(d.value));

      let svg = d3
        .select("#chart")
        .selectAll("svg")
        .data([data]);

      const gEnter = svg
        .enter()
        .append("svg")
        .append("g");

      gEnter.append("g").attr("class", "axis x");

      gEnter.append("g").attr("class", "axis y");

      gEnter
        .append("defs")
        .append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);

      gEnter
        .append("g")
        .attr("class", "lines")
        .attr("clip-path", "url(#clip)")
        .selectAll(".data")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "data");

      svg = selection.select("svg");

      svg.attr("width", width).attr("height", height);

      const g = svg
        .select("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.select("g.axis.x")
        .attr(
          "transform",
          "translate(0," + (height - margin.bottom - margin.top) + ")"
        )
        .transition(t)
        .call(d3.axisBottom(x).ticks(5));
      g.select("g.axis.y")
        .transition(t)
        .attr("class", "axis y")
        .call(d3.axisLeft(y));

      g.select("defs clipPath rect")
        .transition(t)
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.right);

      g.selectAll("g path.data")
        .data(data)
        .style("stroke", d => z(d.label))
        .style("stroke-width", 1)
        .style("fill", "none")
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .on("start", tick);

      g.selectAll("g .legend text")
        .data(data)
        .text(
          d =>
            d.label.toUpperCase() + ": " + d.values[d.values.length - 1].value
        );
    });
  };
};

export default drawer;

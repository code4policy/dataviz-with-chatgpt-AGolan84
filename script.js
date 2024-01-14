// Load the data from the CSV file...
d3.csv("boston_311_2023_by_reason.csv")
  .then(function(data) {
    // Process the data to get the counts for each reason
    var reasonsCount = {};

    data.forEach(function(d) {
      var reason = d.reason.trim();
      var count = +d.Count;

      if (!reasonsCount[reason]) {
        reasonsCount[reason] = 0;
      }
      reasonsCount[reason] += count;
    });

    var reasonsArray = Object.keys(reasonsCount).map(function(reason) {
      return { reason: reason, count: reasonsCount[reason] };
    });

    reasonsArray.sort(function(a, b) {
      return b.count - a.count; // Sort in descending order
    });
    var top10Reasons = reasonsArray.slice(0, 10).reverse(); // Reverse the order

    // Set up the SVG dimensions and margins
    var margin = { top: 20, right: 20, bottom: 70, left: 200 }; // Increased bottom margin
    var width = 800 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    // Create SVG element
    var svg = d3.select("#chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .domain([0, d3.max(top10Reasons, function(d) { return d.count; })])
      .nice()
      .range([0, width]);

    var y = d3.scaleBand()
      .domain(top10Reasons.map(function(d) { return d.reason; }))
      .range([height, 0])
      .padding(0.2);

    svg.selectAll(".bar")
      .data(top10Reasons)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("y", function(d) { return y(d.reason); })
      .attr("width", function(d) { return x(d.count); })
      .attr("height", y.bandwidth());

    svg.selectAll(".label")
      .data(top10Reasons)
      .enter().append("text")
      .attr("class", "label")
      .attr("x", function(d) { return x(d.count) + 5; })
      .attr("y", function(d) { return y(d.reason) + y.bandwidth() / 2; })
      .text(function(d) { return d3.format(",")(d.count); }) // Add comma separator
      .attr("dy", ".35em")
      .style("font-size", "12px")
      .style("fill", "#333")
      .style("text-anchor", "start");

    svg.selectAll(".axis-x text")
      .style("display", "none");

    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "12px")
      .style("fill", "#333");

    // Append citation for data source
    svg.append("text")
      .attr("x", width - 10)
      .attr("y", height + margin.bottom - 10)
      .style("text-anchor", "end")
      .style("font-size", "10px")
      .text("Data Source: ")
      .append("a")
      .attr("xlink:href", "https://data.boston.gov/dataset/311-service-requests")
      .text("Boston 311 Service Requests");

    // Add chart authorship credit in the footnotes
    svg.append("text")
      .attr("x", 10)
      .attr("y", height + margin.bottom - 10)
      .style("font-size", "10px")
      .text("By Anat Golan");
  })
  .catch(function(error) {
    console.log(error);
  });

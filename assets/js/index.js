import pym from 'pym.js';

const pymChild = new pym.Child();

const margin = {top: 10, right: 10, bottom: 10, left: 10},
      holderDiv = d3.select('#ssd-treemap'),
      divRect = holderDiv.node().getBoundingClientRect();

const width = divRect.width - margin.left - margin.right,
      height = divRect.height - margin.top - margin.bottom;

const treemap = d3.treemap().size([width, height]),
      color = d3.scaleOrdinal(d3.schemeCategory10),
      stratify = d3.stratify()
                  .parentId(d => d.department);

const x = d3.scaleLinear()
            .domain([0, width])
            .range([0, width]);

const y = d3.scaleLinear()
    .domain([0, height])
    .range([0, height]);

const svg = holderDiv.append('svg')
                .attrs({
                  width: width + margin.left + margin.right,
                  height: height + margin.top + margin.bottom,
                  preserveAspectRatio: "xMinYMin meet"
                })
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .style("shape-rendering", "crispEdges");

const grandparent = svg.append('g')
                .attr('class', 'grandparent');

grandparent.append("rect")
    .attrs({
      'y': -margin.top,
      'width': width,
      'height': margin.top
    })

grandparent.append("text")
    .attrs({
      'x': 6,
      'y': 6,
      'dy': '.75em'
    })


function type(d) {
  d.amt = +d.amt;
  d.year = +d.year;
  return d
}

function hierarchify(arr) {

}


d3.csv('./budget.csv', type, draw);

function draw(err, data) {
  if (err) throw err;

  // console.log(data)

  const table = data.filter(d => d.year === 2004)

  const nestedData = d3.nest()
        .key(d => d.department)
        .object(table)

        // .entries(table);

  console.log(nestedData)
  var finalObj = {
    'name': 'Georgia',
    'amt': 16068266666,
    'children': []
  };

  Object.keys(nestedData).forEach((dept, dept_indx) => {
    // console.log('Currently on', dept)

    if (nestedData[dept].length === 1) {
      finalObj.children.push({
        'name': dept,
        'amt': nestedData[dept][0].amt
      })
    } else {
      finalObj.children.push({
        'name': dept,
        'amt': 0,
        'children': []
      })
      nestedData[dept].forEach((sub) => {
        // console.log('Currently on', dept, 'sub department', sub.sub_department)
        // console.log('This department has', nestedData[dept].length, 'sub-departments')
        if (sub.sub_department.length < 2) {
          finalObj.children[dept_indx]['amt'] = sub.amt;
        } else {
          finalObj.children[dept_indx].children.push({
            'name': sub.sub_department,
            'amt': sub.amt
          })
        }
      })
    }
  })

  console.log(finalObj)

  const rootNode = d3.hierarchy(finalObj)
        

        treemap.sum(d => d.amt)
        .sort((a, b) => b.amt - a.amt)

  // console.log(rootNode)

  // treemap(rootNode);

  // var node = holderDiv.selectAll(".node")
  //   .data(rootNode.leaves())
  //   .enter().append("div")
  //     .attr("class", "node")
  //     .style("left", function(d) { return d.x0 + "px"; })
  //     .style("top", function(d) { return d.y0 + "px"; })
  //     .style("width", function(d) { return d.x1 - d.x0 + "px"; })
  //     .style("height", function(d) { return d.y1 - d.y0 + "px"; });

  // node.append("div")
  //     .attr("class", "node-label")
  //     .text(d => d.sub_department);

  // node.append("div")
  //     .attr("class", "node-value")
  //     .text(d => d.data.sub_department);


}

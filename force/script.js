var   w = 1000,
      h = 1000;

var circleWidth = 5;

var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

var nodes = [
      { name: "Stratification"},
      { name: "Racism", target:[0]},              //1
      { name: "Job Descrimination", target: [0]}, //2
      { name: "Zoning", target: [0]},             //3
      { name: "G.I. Bill", target: [0]},          //4
      { name: "Gentrification", target: [0]},     //5
      { name: "Education", target: [0]},          //6
      { name: "Redlining", target: [0]},          //7
      { name: "Digital Divide", target: [0]},     //8
      { name: "Whitewashing", target: [0]},       //9
      { name: "Budget Cuts", target: [0]},        //10
      { name: "Tithes", target: [0]},             //11
      { name: "Sexism", target: [0]},             //12
      { name: "Slavery", target: [0]},            //13
      { name: "Ghettoization", target: [0]},      //14
      { name: "Colorism", target: [0]},           //15
      { name: "Prison System", target: [0]},                   //16
      { name: "Jim Crow", target: [0]},           //17
      { name: "Police Brutality", target: [0]},   //18
      { name: "War on Drugs", target: [0]},       //19
      { name: "Anti-Immigration", target: [0]},   //20
      { name: "Sharecropping", target: [0]},      //21
      { name: "Class Division", target: [0]},     //22
      { name: "Religious Freedom Bill", target: [0]}, //23
      { name: "Tax Exemption", target: [0]},      //24
      { name: "Wage Gap", target: [0]},           //25
      { name: "Legacy Income", target: [0]},      //26
      { name: "Capitalism", target: [0]},         //27
      { name: "Sexual Orientation", target: [0]}, //28
      
];

var links = [];

for (var i = 0; i< nodes.length; i++) {
      if (nodes[i].target !== undefined) {
            for (var x = 0; x< nodes[i].target.length; x++ ) {
                  links.push({
                        source: nodes[i],
                        target: nodes[nodes[i].target[x]]
                  })
            }
      }
}

var myChart = d3.select('#chart1')
		.append('svg')
		.attr('width', w)
		.attr('height', h)

var force = d3.layout.force()
	.nodes(nodes)
	.links([])
	.gravity(0.3)
	.charge(-1000)
	.size([w, h])

var link = myChart.selectAll('line')
	.data(links).enter().append('line')
	.attr('stroke', palette.gray)

var node = myChart.selectAll('circle')
	.data(nodes).enter()
	.append('g')
	.call(force.drag);

node.append('circle')
	.attr('cx', function(d) { return d.x; })
	.attr('cy', function(d) { return d.y; })
	.attr('r', circleWidth )
	.attr('fill', function(d, i) {
		if (i>0) { return palette.pink }
		else { return palette.blue }
	})


node.append('text')
	.text(function(d) { return d.name})
	.attr('font-family', 'Roboto Slab')
	.attr('fill', function(d, i) {
		if (i>0) { return palette.mediumgray}
		else { return palette.yellowgreen}
	})
	.attr('x', function(d, i) {
		if (i>0) { return circleWidth + 4 }
		else { return circleWidth -15 }
	})
	.attr('y', function(d, i) {
		if (i>0) { return circleWidth }
		else { return 8 }
	})
	.attr('text-anchor', function(d, i) {
		if (i>0) { return 'beginning' }
		else { return 'end'}
	})
	.attr('font-size',  function(d, i) {
		if (i>0) { return '1em' }
		else { return '1.8em'}
	})

force.on('tick', function(e) {
	node.attr('transform', function(d, i) {
		return 'translate('+ d.x +', '+ d.y +')';
	})

	link
		.attr('x1', function(d) { return d.source.x })
		.attr('y1', function(d) { return d.source.y })
		.attr('x2', function(d) { return d.target.x })
		.attr('y2', function(d) { return d.target.y })
})


force.start();
var width = 600,
    height = 600,
    radius = 300
    colors = d3.scale.ordinal()
        .range(['#D11C24','#A57706','#2176C7','#259286']);



//#A57706, #738A05, #595AB7, #BD3613


var piedata = [
    {   label: "8.4%",
        value: 8.4},
    {   label: "9.8%",
        value: 9.8},
    {   label: "3.6%",
        value: 3.6},
    {   label: "1.4%",
        value: 1.4}
   
]



var pie = d3.layout.pie()
    .value(function(d) {
        return d.value;
    })

var arc = d3.svg.arc()
    .outerRadius(radius)

var myChart = d3.select('#chart6').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate('+(width-radius)+','+(height-radius)+')')
    .selectAll('path').data(pie(piedata))
    .enter().append('g')
        .attr('class', 'slice')


var slices = d3.selectAll('g.slice')
        .append('path')
        .attr('fill', function(d, i) {
            return colors(i);
        })
        .attr('d', arc)

.on('mouseover', function (d) {
    tempColor = this.style.fill;
    d3.select(this)
        .style('opacity', .5)
    
})

.on('mouseout', function (d) {
    
    d3.select(this)
        .style('opacity', 1)      
    
})

 

var text = d3.selectAll('g.slice')
    .append('text')
    .text(function(d, i) {
        return d.data.label;
    })
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('transform', function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        return 'translate('+ arc.centroid(d)+')'
    })
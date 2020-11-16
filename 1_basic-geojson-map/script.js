// Data Source
let ind_states_source = './data/IND_adm1_topo.json';

let statesData

let canvas = d3.select('#canvas')

var projection = d3.geoMercator().scale(1050).center([80, 24]) // Scale is used to zoom into the features and center is used to set the center lat lon on the canvas

let drawMap = () => {
    canvas.selectAll('path')
            .data(statesData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath().projection(projection)) // Change the default projection
            .attr('class', 'state')
            .attr("fill", "grey") // the color of the state polygon
            .style("stroke", "#fff") // the color of state borders
            .style("stroke-width", "0.1px") // The thickness of state borders

}

// Fetch Data from Topojson File
d3.json(ind_states_source).then(
    (data, error) => {
        if (error) {
            console.log(log)
        }
        else
        {
            // Convert TopoJSON features to GeoJSON Features
        
            statesData = topojson.feature(data, data.objects.IND_adm1).features
            // console.log(statesData)

            // Initialize Draw Map Function to display the map 
            drawMap()
        }
    }
)
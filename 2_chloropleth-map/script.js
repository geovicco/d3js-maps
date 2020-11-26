// Data Source
let ind_states_source = './data/IND_adm1_topo.json';
let ind_pop_data_source = './data/ind_population_data.json';

let statesData
let popData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

var projection = d3.geoMercator().scale(1220).center([78, 26]) // Scale is used to zoom into the features and center is used to set the center lat lon on the canvas

let drawMap = () => {
    canvas.selectAll('path')
            .data(statesData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath().projection(projection)) // Change the default projection
            .attr('class', 'state')
            .attr("fill", (statesDataItem) => {
                let id = statesDataItem.properties['NAME_1']
                let state = popData.find((item) => {
                    return item['State'] === id 
                })
                // console.log(state['Total'])
                let total = state['Total']
                // console.log(total)
                if (total <=1000000) { //1 Million (5 states)
                    return "#95D5B2"
                }
                else if (total <=2000000) { // 2 million (6 states)
                    return '#74C69D'
                }
                else if (total <=13000000) { // 13 Million (6 states)
                    return '#52B788'
                }
                else if (total <=33000000) { // 33 MILLION
                    return '#40916C'
                }
                else if (total <=62000000) { // 62 MILLION
                    return '#2D6A4F'
                }
                else if (total <=100000000) { // 100 MILLION
                    return '#1B4332'
                }
                else{ // > 100 MILLION
                    return '#081C15'
                }
            })
            .style("opacity", 0.8)
            .style("stroke", "black") // the color of state borders
            .style("stroke-width", "0.35px") // The thickness of state borders
            // Get text to show up when hovering over a particular state
            .append('title')
            .text((function(d) {
                return d.properties.NAME_1 // Displays the State Name when mouse is hovered over a region of the map
            }))
            .on('mouseover', (statesDataItem)=>{
                tooltip.transition()
                    .style('visibility', 'visible')
                let id = statesDataItem.properties['NAME_1']
                let state = popData.find((item) => {
                     return item['State'] === id 
            })
                
            // Add text to tooltip
            tooltip.text(state['Total'])
            })
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
            // Print Every State name from the GeoJSON Data using map()
            var x = statesData.map(function(item, index, array) {
                // console.log(item.properties.NAME_1)
            })
            // console.log(statesData)

            // Load Population Data using d3.json()
            d3.json(ind_pop_data_source).then(
                (data, error) => {
                    if (error) {
                        console.log(log)
                    }
                    else
                    {
                        // console.log(data)
                        popData = data
                        // console.log(popData)

                        // Initialize Draw Map Function to display the map 
                        drawMap()
                    }
                }
            )


        }
    }
)
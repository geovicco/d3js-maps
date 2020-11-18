// Data Source
let ind_states_source = './data/IND_adm1_topo.json';
let ind_pop_data_source = './data/ind_population_data.json';

let statesData
let popData

let canvas = d3.select('#canvas')

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
                    return item['State'] == id 
                })
                // console.log(state['Total'])
                let total = state['Total']
                console.log(total)
                if (total <=100000) { //1 LAKHS
                    return "#264653"
                }
                else if (total <=500000) { // 5 LAKHS
                    return '#264653'
                }
                else if (total <=1000000) { // 1 MILLION
                    return '#2A9D8F'
                }
                else if (total <=5000000) { // 5 MILLION
                    return '#2A9D8F'
                }
                else if (total <=10000000) { // 10 MILLION
                    return '#E9C46A'
                }
                else if (total <=25000000) { // 25 MILLION
                    return '#E9C46A'
                }
                else if (total <=50000000) { // 50 MILLION
                    return '#F4A261'
                }
                else if (total <=75000000) { // 75 MILLION
                    return 'limegreen'
                }
                else if (total <=100000000) { // 100 MILLION
                    return '#E76F51'
                }                                                
                else if (total <=125000000) { // 125 MILLION
                    return '#E76F51'
                }
                else if (total <=150000000) { // 150 MILLION
                    return '#D00000'
                }                              
            })
            // .attr("fill", "grey") // the color of the state polygon
            .style("opacity", 0.75)
            .style("stroke", "black") // the color of state borders
            .style("stroke-width", "0.2px") // The thickness of state borders
            // Get text to show up when hovering over a particular state
            .append('title')
            .text((function(d) {
                return d.properties.NAME_1 // Displays the State Name when mouse is hovered over a region of the map
            }))
            
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
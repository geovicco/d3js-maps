// import React, {useState, useEffect} from 'react';
// import { json } from 'd3';
// import { feature } from 'topojson';

// const usDataURL = "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us.json";
// const usDistrictsURL = "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us-congress-113.json";

// const USCongressionalDistricts = () => {
//     const [data, setData] = useState(null)

//     // console.log(data)
//     useEffect(()=> {
//         json(usDataURL).then(topojsonData => {
//             const {states} = topojsonData.objects;
//             setData(feature(topojsonData, states))
//         });    
//     },[])
    
//     console.log(data)
//     return null
// }

import React, { Component } from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';

const usDataURL = "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us.json";
const usDistrictsURL = "https://raw.githubusercontent.com/Swizec/113th-congressional-districts/master/public/us-congress-113.json";


export class USCongressionalDistricts extends Component {
    constructor() {
        super()
        this.state = {
            states:null,
            districts:null,
            // canvas: React.createRef()
        }
    }

    componentDidMount() {

        this.divRef = React.createRef()

        Promise.all([fetch(usDataURL), fetch(usDistrictsURL)])
        .then(responses => Promise.all(responses.map(resp => resp.json())))
        .then(([statesData,districtsData]) => {
            this.setState({
                states: statesData,
                districts: districtsData,
                
            })
        })
    .catch(error => console.log(error))
    }
    componentDidUpdate() {
        const svg = d3.select(this.divRef.current),
                {width, height} = this.props
        
        const projection = d3.geoAlbers().scale(1400).translate([width / 1.3, height / 2.2]);

        const path = d3.geoPath().projection(projection);

        const us = this.state.states;
        const congress = this.state.districts;

        svg.append("defs").append("path")
            .attr("id", "land")
            .datum(topojson.feature(us, us.objects.land))
            .attr("d", path);

        svg.append("clipPath")
            .attr("id", "clip-land")
            .append("use")
            .attr("xlink:href", "#land");

        svg.append("g")
            .attr("class", "districts")
            .attr("clip-path", "url(#clip-land)")
            .selectAll("path")
            .data(topojson.feature(congress, congress.objects.districts).features)
            .enter().append("path")
            .attr("d", path)
            .append("title")
            .text(function(d) { return d.id; });

        svg.append("path")
            .attr("class", "district-boundaries")
            .datum(topojson.mesh(congress, congress.objects.districts, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
            .attr("d", path);

        svg.append("path")
            .attr("class", "state-boundaries")
            .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
            .attr("d", path);


    }
    render() {
        const { states, districts } = this.state;
        // console.log(states)
        if (!states || !districts) {
            return null;
        }
        return (<g ref={this.divRef} />)
           
    }
}

export default USCongressionalDistricts;

// https://www.youtube.com/watch?v=mzZ1fCXq-uo
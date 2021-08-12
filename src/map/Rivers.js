import React, { useState, useEffect } from 'react';
import riverData from '../json/world/rivers.json';
import { geoNaturalEarth1, geoConicConformal, geoMercator, geoPath, path, geoIdentity } from 'd3-geo';

export default function Rivers({propWidth, propHeight}){
    const [rivers, setRivers] = useState(riverData);
    const [riverPaths, setRiverPaths] = useState(null);
    const [width, setWidth] = useState(propWidth)
    const [height, setHeight] = useState(propHeight)

    useEffect(()=>{
        console.log(width);
        console.log(height);        
        
        setWidth(propWidth);
        setHeight(propHeight);
    
        updateCellPaths();
    },[width, height])

    const updateCellPaths = () =>{
        const projection = geoMercator().scale(700).translate([900,930])
        const pathGenerator = geoPath(projection);
        
        

        console.log()
        var riverSVG = rivers.features.map((f,idx)=>{
            //console.log(f);
            let path =
              <path
                key={"path"+idx}
                d={pathGenerator(f)}
                stroke={"#D4F1F9"}
                strokeWidth={"1"}
                fillOpacity={"0"}
              />
            return path;  
        })

        setRiverPaths(riverSVG);
    }

    return(
        <g>
            {riverPaths}
        </g>
    )
}
import React, { useState, useEffect } from 'react';
import routeData from '../json/world/routes.json';
import { geoNaturalEarth1, geoConicConformal, geoMercator, geoPath, path, geoIdentity } from 'd3-geo';

export default function Routes({propWidth, propHeight}){
    const [routes, setroutes] = useState(routeData);
    const [routePaths, setroutePaths] = useState(null);
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
        var routeSVG = routes.features.map((f,idx)=>{
            if(f.properties.type == "roads" || f.properties.type == "trails"){
                let path =
                <path
                    key={"path"+idx}
                    d={pathGenerator(f.geometry)}
                    stroke={"#592d00"}
                    strokeWidth={(f.properties.type=="roads" ? "2" : "0.9")}
                    strokeDasharray={(f.properties.type=="roads" ? "" : "4 1")}
                    fillOpacity={"0"}
                />
                return path;  
            }
        })

        setroutePaths(routeSVG);
    }

    return(
        <g>
            {routePaths}
        </g>
    )
}
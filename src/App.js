import React, { useEffect, useRef, useState } from "react";
import { geoNaturalEarth1, geoConicConformal, geoMercator, geoPath, geoIdentity } from "d3-geo";
import geoData from './json/world/cells.json'
import randomColor from 'randomcolor'

import Rivers from './map/Rivers';
import Routes from './map/Routes';

import chromajs from 'chroma-js';
import biomeColors from './json/customizables/biomeColors.json';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export default function App(props) {
  const [cells, setCells] = useState(geoData);
  const [cellPaths, setCellPaths] = useState([]);
  const [height, setHeight] = useState(918);
  const [width, setWidth] = useState(1632);
  const [mode, setMode] = useState("cells");
  const [borders, setBorders] = useState(false);
  const [pathGenerator, setPathGenerator] = useState(null)
  const [roads, setRoads] = useState(false);


  const updateCellPaths = () =>{
    const projection = geoMercator().scale(700).translate([900,930])
    const pathGenerator = geoPath(projection);
    
    setPathGenerator(pathGenerator);

    var paths = cells.features.map((f, idx)=>{
      var props = f.properties;
      if(props.type === "ocean" || props.type === "lake"){
        var colorFill = "#D4F1F9"
        var strokeFill = "#D4F1F9";
      }
      else{
        var colorFill = "";
        var chroma = require("chroma-js");
        switch(mode){
          case "cells":
            colorFill = "#008013";
            break;
          case "nations":
            colorFill = randomColor({ format:"hsl",seed:props.state})
            break;
          case "religion":
            colorFill = randomColor({format:"hsl",seed:props.religion})
            break;
          case "culture":
            colorFill = randomColor({hue:"red",format:"hsl",seed:props.culture})
            break;
          case "province":
            colorFill = randomColor({format:"hsl",luminosity:"dark",seed:props.province*10,alpha:.99, format:"rgba"})
            break;
          case "biomes":
            colorFill = biomeColors[props.biome];
            break;
          case "height":
            var domain = [-200,7000];
            var scale = chroma.scale(["black","white"]).domain(domain);
            colorFill = scale(props.height).hex();
            break;
          case "population":
            var domain = [0,30000];
            var scale = chroma.scale(["white","green"]).domain(domain);
            colorFill = scale(props.population).hex();
            break;
        }
        if(borders){
          var strokeFill = "#111111"
        }
        else{
          var strokeFill = colorFill;
        }
      }

      let path =
      <a href={"/cell/"+props.id}>
        <path
          key={"path"+idx}
          d={pathGenerator(f)}
          fill={colorFill}
          fillOpacity="1"
          stroke={strokeFill}
          strokeWidth="1"
          className="states"
          biome={props.biome}
        />
      </a>
      return path;  
    })
    setCellPaths(paths);
  }

  useEffect(() => {
    console.log("Hi");
    setCells(geoData);
    updateCellPaths();
  
  },[mode,borders,geoData]);

  return( 
    <>
    <button onClick={(()=>setMode("cells"))}>Cells</button>
    <button onClick={(()=>setMode("nations"))}>nations</button>
    <button onClick={(()=>setMode("religion"))}>religion</button>
    <button onClick={(()=>setMode("culture"))}>culture</button>
    <button onClick={(()=>setMode("province"))}>province</button>
    <button onClick={(()=>setMode("biomes"))}>biomes</button>
    <button onClick={(()=>setMode("height"))}>height</button>
    <button onClick={(()=>setMode("population"))}>population</button>
    <button onClick={(()=>setBorders(true))}>borders on</button>
    <button onClick={(()=>setBorders(false))}>borders off</button>
    <br/>
    <button onClick={(()=>setRoads(true))}>roads on</button>
    <button onClick={(()=>setRoads(false))}>roads off</button>

    <TransformWrapper style={{height:"100vh"}}>
    <TransformComponent style={{height:"100vh"}}>
    <svg width={'100%'} height={'100%'} style={{overflow:"auto", margin:"auto"}}>
      <g>
        {cellPaths}
        <Rivers propWidth={width} propHeight={height} generator={pathGenerator}/>
      </g>
      <Rivers propWidth={width} propHeight={height} generator={pathGenerator}/>
      {( roads ) ? <Routes propWidth={width} propHeight={height} generator={pathGenerator}/> : (<></>) }
      
    </svg> 
    </TransformComponent>
    </TransformWrapper>
    </>
  );
}

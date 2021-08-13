import React, {useEffect, useState} from 'react'
import Cells from './map/Cells';
import Rivers from './map/Rivers';
import Routes from './map/Routes';
import { geoMercator, geoConicConformal } from 'd3-geo';
export default function Map(props) {
  const [mode, setMode] = useState("cells");
  const [borders, setBorders] = useState(false);
  const [roads, setRoads] = useState(false);
  const [projection, setProjection] = useState(()=>geoConicConformal().scale(700).translate([900, 965]));

  useEffect(()=>{
  },[roads])

  return (
    <>
      <button onClick={() => setMode("cells")}>Cells</button>
      <button onClick={() => setMode("nations")}>nations</button>
      <button onClick={() => setMode("religion")}>religion</button>
      <button onClick={() => setMode("culture")}>culture</button>
      <button onClick={() => setMode("province")}>province</button>
      <button onClick={() => setMode("biomes")}>biomes</button>
      <button onClick={() => setMode("height")}>height</button>
      <button onClick={() => setMode("population")}>population</button>
      <button onClick={() => setBorders(true)}>borders on</button>
      <button onClick={() => setBorders(false)}>borders off</button>
      <br />
      <button onClick={() => setRoads(true)}>roads on</button>
      <button onClick={() => setRoads(false)}>roads off</button>

      <svg
        viewBox="0 0 1920 1080"
        width={"100%"}
        height={"100%"}
        style={{ overflow: "auto", margin: "auto" }}
      >
        <Cells mode={mode} borders={borders} projection={projection}/>
        <Rivers projection={projection}/>
        {roads ? (
          <Routes projection={projection}/>
        ) : (
          <></>
        )}
      </svg>
    </>
  );
}

import React, {useEffect, useState} from 'react'
import Cells from './map/Cells';
import Rivers from './map/Rivers';
import Routes from './map/Routes';
import { geoMercator, geoConicConformal, geoIdentity } from 'd3-geo';

import { Button, ButtonGroup } from 'react-bootstrap';
import { TransformComponent as TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';


export default function Map(props) {
  const [mode, setMode] = useState("cells");
  const [borders, setBorders] = useState(false);
  const [roads, setRoads] = useState(false);
  const [projection, setProjection] = useState(()=>geoMercator().scale(700).translate([900, 965]));

  useEffect(()=>{
  },[ ])

  return (
    <>
      <ButtonGroup>
      <Button variant="secondary" onClick={() => setMode("cells")}>Cells</Button>
      <Button variant="secondary" onClick={() => setMode("nations")}>nations</Button>
      <Button variant="secondary" onClick={() => setMode("religion")}>religion</Button>
      <Button variant="secondary" onClick={() => setMode("culture")}>culture</Button>
      <Button variant="secondary" onClick={() => setMode("province")}>province</Button>
      <Button variant="secondary" onClick={() => setMode("biomes")}>biomes</Button>
      <Button variant="secondary" onClick={() => setMode("height")}>height</Button>
      <Button variant="secondary" onClick={() => setMode("population")}>population</Button>
      <Button variant="secondary" onClick={() => setBorders(true)}>borders on</Button>
      <Button variant="secondary" onClick={() => setBorders(false)}>borders off</Button>
      </ButtonGroup>
      <br/>
      <ButtonGroup>
      <Button onClick={() => setRoads(true)}>roads on</Button>
      <Button onClick={() => setRoads(false)}>roads off</Button>
      </ButtonGroup>

      <TransformWrapper style={{height:"100vh"}}>
        <TransformComponent style={{height:"100vh"}}>
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
          </TransformComponent>
      </TransformWrapper>
    </>
  );
}

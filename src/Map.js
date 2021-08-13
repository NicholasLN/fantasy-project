import React, {useEffect, useState} from 'react'
import Cells from './map/Cells';
import Rivers from './map/Rivers';
import Routes from './map/Routes';
import Markers from './map/Markers';
import { geoMercator, geoEquirectangular, geoIdentity } from 'd3-geo';

import { Button, ButtonGroup } from 'react-bootstrap';
import { TransformComponent as TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';


export default function Map(props) {
  const [mode, setMode] = useState("cells");
  const [borders, setBorders] = useState(false);
  const [roads, setRoads] = useState(false);
  const [markers, setMarkers] = useState(false)
  const [projection, setProjection] = useState(()=>geoEquirectangular().scale(870).translate([950, 970]));

  useEffect(()=>{
  },[ ])

  return (
    <>
      <TransformWrapper>
        <div className="buttons">
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
          <Button onClick={() => setMarkers(true)}>markers on</Button>
          <Button onClick={() => setMarkers(false)}>markers off</Button>
          </ButtonGroup>
        </div>
        <TransformComponent>
          <svg
            viewBox="0 0 1920 1080"
            maxWidth="100%"
            width="auto"
            maxHeight="100vh"
            height="auto"
          >
            <Cells mode={mode} borders={borders} projection={projection}/>
            <Rivers projection={projection}/>
            {roads ? (
              <Routes projection={projection}/>
            ) : (
              <></>
            )}
            {markers? (
              <Markers projection={projection}/>
               ) : (
                <></>
            )}
          </svg>
          </TransformComponent>
      </TransformWrapper>
    </>
  );
}

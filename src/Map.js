import React, { useEffect, useState, useRef } from "react";
import Cells from "./map/Cells";
import Rivers from "./map/Rivers";
import Routes from "./map/Routes";
import Markers from "./map/Markers";
import { geoMercator, geoEquirectangular, geoIdentity } from "d3-geo";
import rawMapData from "./json/world/map.map";
import geoData from "./json/world/cells.json";
import { Button, ButtonGroup } from "react-bootstrap";
import {
  TransformComponent as TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

export default function Map(props) {
  const [mode, setMode] = useState("cells");
  const [borders, setBorders] = useState(false);
  const [roads, setRoads] = useState(false);

  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  const [markers, setMarkers] = useState(false);

  const mapSVG = useRef();

  useEffect(() => {
    // async function fetchMapData(){
    //   var response = await fetch(rawMapData)
    //   var body = await response.blob();
    //   let fileReader = new FileReader();
    //   fileReader.onload = function (fileLoadedEvent){
    //     const dataLoaded = fileLoadedEvent.target.result;
    //     const data = dataLoaded.split("\r\n");
    //     //console.debug(data)

    //     const provinces = JSON.parse(data[30])
    //     const religions = JSON.parse(data[29])
    //     const burgs = JSON.parse(data[15])
    //     const states = JSON.parse(data[14])
    //     console.debug(states);
    //   }
    //   fileReader.readAsText(body,"UTF-8");
    // }
    // fetchMapData();
    handleResize();

    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
  }, [width, height]);

  const handleResize = () => {
    let height = mapSVG.current.parentNode.clientHeight;
    setHeight(height);
    let width = mapSVG.current.parentNode.clientWidth;
    setWidth(width);
  };

  return (
    <div className="map">
      <TransformWrapper>
        <div className="buttons">
          <ButtonGroup>
            <Button variant="secondary" onClick={() => setMode("cells")}>
              Cells
            </Button>
            <Button variant="secondary" onClick={() => setMode("nations")}>
              nations
            </Button>
            <Button variant="secondary" onClick={() => setMode("religion")}>
              religion
            </Button>
            <Button variant="secondary" onClick={() => setMode("culture")}>
              culture
            </Button>
            <Button variant="secondary" onClick={() => setMode("province")}>
              province
            </Button>
            <Button variant="secondary" onClick={() => setMode("biomes")}>
              biomes
            </Button>
            <Button variant="secondary" onClick={() => setMode("height")}>
              height
            </Button>
            <Button variant="secondary" onClick={() => setMode("population")}>
              population
            </Button>
            <Button variant="secondary" onClick={() => setBorders(true)}>
              borders on
            </Button>
            <Button variant="secondary" onClick={() => setBorders(false)}>
              borders off
            </Button>
          </ButtonGroup>
          <br />
          <ButtonGroup>
            <Button onClick={() => setRoads(true)}>roads on</Button>
            <Button onClick={() => setRoads(false)}>roads off</Button>
            <Button onClick={() => setMarkers(true)}>markers on</Button>
            <Button onClick={() => setMarkers(false)}>markers off</Button>
          </ButtonGroup>
        </div>
        <TransformComponent>
          <svg
            width={"100%"}
            height={"100%"}
            ref={(el) => {
              mapSVG.current = el;
            }}
          >
            <Cells
              mode={mode}
              borders={borders}
              width={width}
              height={height}
            />
            <Rivers width={width} height={height} />
            {roads ? <Routes width={width} height={height} /> : <></>}
            {markers ? <Markers width={width} height={height} /> : <></>}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

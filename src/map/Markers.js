import React, { useState, useEffect } from "react";
import riverData from "../json/world/markers.json";
import { geoPath } from "d3-geo";

export default function Markers({ projection }) {
  const [markers, setMarkers] = useState(riverData);
  const [markerPaths, setMarkerPaths] = useState(null);

  useEffect(() => {
    updateCellPaths();
  }, []);

  const updateCellPaths = () => {
    const pathGenerator = geoPath(projection);
    console.log();
    var markerSVG = markers.features.map((f, idx) => {
      //console.log(f);
      let path = (
        <path
          key={"path" + idx}
          d={pathGenerator(f)}
          stroke={"#000000"}
          fill={"#000000"}
          strokeWidth={"1"}
          fillOpacity={"1"}
        />
      );
      return path;
    });

    setMarkerPaths(markerSVG);
  };

  return <g>{markerPaths}</g>;
}

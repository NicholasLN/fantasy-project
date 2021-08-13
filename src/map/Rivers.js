import React, { useState, useEffect } from "react";
import riverData from "../json/world/rivers.json";
import { geoPath } from "d3-geo";

export default function Rivers({ projection }) {
  const [rivers, setRivers] = useState(riverData);
  const [riverPaths, setRiverPaths] = useState(null);

  useEffect(() => {
    updateCellPaths();
  }, []);

  const updateCellPaths = () => {
    const pathGenerator = geoPath(projection);
    console.log();
    var riverSVG = rivers.features.map((f, idx) => {
      //console.log(f);
      let path = (
        <path
          key={"path" + idx}
          d={pathGenerator(f)}
          stroke={"#D4F1F9"}
          strokeWidth={"1"}
          fillOpacity={"0"}
        />
      );
      return path;
    });

    setRiverPaths(riverSVG);
  };

  return <g>{riverPaths}</g>;
}

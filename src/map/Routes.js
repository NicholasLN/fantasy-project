import React, { useState, useEffect } from "react";
import routeData from "../json/world/routes.json";
import {
  geoPath,
} from "d3-geo";

export default function Routes({ projection }) {
  const [routes, setroutes] = useState(routeData);
  const [routePaths, setroutePaths] = useState(null);

  useEffect(() => {
    updateCellPaths();
  }, []);

  const updateCellPaths = () => {
    const pathGenerator = geoPath(projection);

    var routeSVG = routes.features.map((f, idx) => {
      if (
        f.properties.type == "roads" ||
        f.properties.type == "trails" ||
        f.properties.type == "searoutes"
      ) {
        let path = (
          <path
            key={"path" + idx}
            d={pathGenerator(f.geometry)}
            stroke={f.properties.type == "searoutes" ? "#4994aa" : "#592d00"}
            strokeWidth={f.properties.type == "roads" ? "2" : "0.9"}
            strokeDasharray={f.properties.type == "roads" ? "" : "4 1"}
            fillOpacity={"0"}
          />
        );
        return path;
      }
    });

    setroutePaths(routeSVG);
  };

  return <g>{routePaths}</g>;
}

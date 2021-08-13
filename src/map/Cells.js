import React, { useEffect, useRef, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import geoData from "../json/world/cells.json";
import randomColor from "randomcolor";
import biomeColors from "../json/customizables/biomeColors.json";
export default function Cells({ mode, borders, projection }) {
  const [cells, setCells] = useState(geoData);
  const [cellPaths, setCellPaths] = useState([]);

  const updateCellPaths = () => {
    console.log(projection);
    const pathGenerator = geoPath(projection);
    var paths = cells.features.map((f, idx) => {
      var props = f.properties;
      if (props.type === "ocean" || props.type === "lake") {
        var colorFill = "#D4F1F9";
        var strokeFill = "#D4F1F9";
      } else {
        var colorFill = "";
        var chroma = require("chroma-js");
        switch (mode) {
          case "cells":
            colorFill = "#008013";
            break;
          case "nations":
            colorFill = randomColor({ format: "hsl", seed: props.state });
            break;
          case "religion":
            colorFill = randomColor({ format: "hsl", seed: props.religion });
            break;
          case "culture":
            colorFill = randomColor({
              hue: "red",
              format: "hsl",
              seed: props.culture,
            });
            break;
          case "province":
            colorFill = randomColor({
              format: "hsl",
              luminosity: "dark",
              seed: props.province * 10,
              alpha: 0.99,
              format: "rgba",
            });
            break;
          case "biomes":
            colorFill = biomeColors[props.biome];
            break;
          case "height":
            var domain = [-200, 7000];
            var scale = chroma.scale(["black", "white"]).domain(domain);
            colorFill = scale(props.height).hex();
            break;
          case "population":
            var domain = [0, 30000];
            var scale = chroma.scale(["white", "green"]).domain(domain);
            colorFill = scale(props.population).hex();
            break;
        }
        if (borders) {
          var strokeFill = "#111111";
        } else {
          var strokeFill = colorFill;
        }
      }

      let path = (
        // <a href={"/cell/" + props.id}>
          <path
            key={"path" + idx}
            d={pathGenerator(f)}
            fill={colorFill}
            fillOpacity="1"
            stroke={strokeFill}
            strokeWidth="1"
            className="states"
            biome={props.biome}
          />
        ///</a>
      );
      return path;
    });
    setCellPaths(paths);
  };

  useEffect(() => {
    setCells(geoData);
    updateCellPaths();
  }, [mode, borders]);

  return <g>{cellPaths}</g>;
}

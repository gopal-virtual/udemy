import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import BarGraphCanvas from "./BarGraphCanvas";
import { map } from "../../Utils";

const TextSizeMap = {
  header: "18px",
  paragraph: "14px",
  legand: "10px",
};

const TextWeightMap = {
  light: 300,
  highlight: 500,
  emphasis: 900,
};

const TextAlignMap = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

const ColorMap = {
  "red-pink": "linear-gradient(180deg, #FF4A4A 0%, #FC5CFF 100%)",
  "blue-teal": "linear-gradient(180deg, #5297FF 0%, #70DBD4 100%)",
  "orange-yellow": "linear-gradient(180deg, #FFA26D 0%, #FFD771 100%)",
};

const Text = styled("span")({
  width: (props) => props.width || "auto",
  display: "inline-block",
  fontFamily: "Roboto",
  background: (props) => (props.color ? ColorMap[props.color] : "black"),
  "-webkit-background-clip": "text",
  color: "transparent",
  textAlign: (props) => props.align || "left",
  fontSize: (props) => TextSizeMap[props.type || "paragraph"],
  fontWeight: (props) => TextWeightMap[props.weight || "light"],
});

const CanvasWrapper = styled("div")({
  boxSizing: "border-box",
  margin: "21px 0",
  width: "100%",
  height: "350px",
});

const Separator = styled("div")({
  borderSizing: "border-box",
  width: "24px",
  height: "5px",
  margin: "12px 0",
  background: "linear-gradient(270deg, #70DBD4 0%, #5297FF 100%)",
});

const canvasDims = {
  padding: 20,
  offset: 10,
};

const range = (data, key) =>
  data.reduce((acc, point, i) => {
    if (i === 0) {
      return { min: point[key], max: point[key] };
    }
    return {
      min: Math.min(acc.min, point[key]),
      max: Math.max(acc.max, point[key]),
    };
  }, {});

const modifyData = (data = [], xKey, yKey, dims) => {
  const { min: minY, max: maxY } = range(data, yKey);
  const newData = data.map((dataPoints, index) => ({
    x: map(
      index,
      0,
      data.length - 1,
      dims.padding * 2,
      dims.width - dims.padding * 2
    ),
    y: map(
      dataPoints[yKey],
      minY,
      maxY,
      dims.padding,
      dims.height - dims.padding * 2
    ),
    xLegand: dataPoints[xKey],
    yLegand: dataPoints[yKey],
    minY,
    maxY,
  }));
  return newData;
};

function BarGraph({ data, xKey, yKey }) {
  const canvasWrapperRef = React.useRef(null);
  const [canvas, setCanvas] = React.useState(null);

  React.useEffect(() => {
    let canvasObj;
    if (canvasWrapperRef && canvasWrapperRef.current) {
      const { width, height } =
        canvasWrapperRef.current.getBoundingClientRect();
      const dims = { ...canvasDims, width, height };
      canvasObj = new BarGraphCanvas(canvasWrapperRef.current, dims);
      const newData = modifyData(data, xKey, yKey, dims);
      canvasObj.render(newData);
      setCanvas(canvasObj);
    }
    return () => canvasObj.destroy();
  }, [canvasWrapperRef]);

  React.useEffect(() => {
    if (canvas) {
      canvas.render(modifyData(data, xKey, yKey));
    }
  }, [data, xKey, yKey]);

  return (
    <>
      <Text type="header">
        <Text type="header" weight="highlight">
          5M
        </Text>{" "}
        Sales for{" "}
        <Text type="header" weight="highlight">
          July 2021
        </Text>
      </Text>
      <Separator />
      <CanvasWrapper ref={canvasWrapperRef}></CanvasWrapper>
      <Text type="paragraph" weight="light" align="center" width="100%">
        <Text type="paragraph" weight="light" color="red-pink">
          Down by
        </Text>{" "}
        <Text type="paragraph" weight="highlight" color="red-pink">
          13M
        </Text>{" "}
        sales from previous month
      </Text>
    </>
  );
}

BarGraph.propTypes = {};

export default BarGraph;

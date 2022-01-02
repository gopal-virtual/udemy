import React from "react";
import styled from "styled-components";
import { map } from "../../Utils/Utils";
import useCanvas from "../../hooks/useCanvas";
import useData from "./useData";
import Tween from "../Tween/Tween";

const TextSizeMap = {
  header: "18px",
  paragraph: "14px",
  Legend: "10px",
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
  position: "relative",
});

const Separator = styled("div")({
  borderSizing: "border-box",
  width: "24px",
  height: "5px",
  margin: "12px 0",
  background: "linear-gradient(270deg, #70DBD4 0%, #5297FF 100%)",
});

function BarGraph({ data, xKey, yKey, yUnit }) {
  const canvasWrapperRef = React.useRef(null);
  const { ctx, canvasH, canvasW, clearCanvas } = useCanvas(canvasWrapperRef);
  const [dims, setDims] = React.useState({
    padding: 30,
    offset: 10,
  });
  const { graphData, minY, maxY } = useData(data, xKey, yKey, dims);

  React.useEffect(() => {
    setDims({
      ...dims,
      canvasH,
      canvasW,
      left: dims.padding,
      right: canvasW - dims.padding,
      top: dims.padding,
      bottom: canvasH - dims.padding,
      borderWidth: 1,
      barWidth: 14,
    });
  }, [canvasH, canvasW]);

  const _drawLine = (p1, p2) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  const _drawYLegends = () => {
    ctx.save();
    ctx.fillStyle = "#7A7A7A";
    ctx.strokeStyle = "#E2E2E2";
    ctx.lineWidth = dims.borderWidth / 2;
    ctx.font = "300 10px Roboto";
    ctx.textAlign = "right";

    const interval = 5;
    const intervalHeight = (dims.bottom - dims.padding) / interval;
    for (let i = 1; i < interval; i++) {
      // draw y grid
      _drawLine(
        { x: dims.left, y: dims.bottom - intervalHeight * i },
        { x: dims.right, y: dims.bottom - intervalHeight * i }
      );

      // draw y Legends
      const pointY = map(i, 0, interval, dims.bottom, dims.top);
      const yLegend = map(i, 0, interval, minY, maxY, false);
      ctx.fillText(
        `${yLegend.toFixed(1)}${yUnit || ""}`,
        dims.left - dims.offset / 2,
        pointY
      );
    }
    ctx.restore();
  };

  const _drawCoordsPlane = () => {
    ctx.save();
    ctx.strokeStyle = "#E2E2E2";
    ctx.lineWidth = dims.borderWidth;
    // draw x axis
    _drawLine(
      { x: dims.left, y: dims.bottom },
      { x: dims.right, y: dims.bottom }
    );
    // draw y axis
    _drawLine({ x: dims.left, y: dims.top }, { x: dims.left, y: dims.bottom });
    ctx.restore();
  };

  const _drawXLegends = () => {
    ctx.save();
    ctx.fillStyle = "#7A7A7A";
    ctx.font = "300 10px Roboto";
    ctx.textAlign = "center";

    // draw x Legends
    graphData.forEach((point) => {
      ctx.fillText(
        point.xLegend,
        point.x,
        dims.bottom + dims.padding - dims.offset / 2
      );
    });

    ctx.restore();
  };

  const _drawBar = (p1, p2) => {
    const grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    grd.addColorStop(0, "#5297FF");
    grd.addColorStop(1, "#70DBD4");
    ctx.lineWidth = dims.barWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = grd;
    _drawLine(p1, p2);
    ctx.clearRect(
      p2.x - ctx.lineWidth / 2,
      dims.bottom + dims.borderWidth,
      ctx.lineWidth,
      ctx.lineWidth / 2
    );
  };

  const _drawBars = () => {
    ctx.save();
    const tween = new Tween();
    graphData.forEach((point) => {
      const draw = (newVal) => {
        _drawBar({ x: point.x, y: newVal }, { x: point.x, y: dims.bottom });
      };
      tween._play(dims.bottom, point.y, 700, draw);
    });
    ctx.restore();
  };

  const render = () => {
    clearCanvas();
    _drawCoordsPlane();
    _drawYLegends();
    _drawBars();
    _drawXLegends();
  };

  React.useEffect(() => {
    if (graphData.length) render();
  }, [graphData]);

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

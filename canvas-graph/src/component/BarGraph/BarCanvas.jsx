import React from "react";
import styled, { withTheme } from "styled-components";
import { map } from "../../Utils/Utils";
import useCanvas from "../../hooks/useCanvas";
import useData from "./useData";
import Tween from "../Tween/Tween";

const CanvasWrapper = styled("div")({
  boxSizing: "border-box",
  margin: "21px 0",
  width: "100%",
  height: "350px",
  position: "relative",
});

function BarCanvas({ data, xKey, yKey, yUnit, theme }) {
  const canvasWrapperRef = React.useRef(null);
  const { ctx, canvasH, canvasW, clearCanvas } = useCanvas(canvasWrapperRef);
  const [dims, setDims] = React.useState({
    padding: 40,
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
    ctx.fillStyle = theme.colors["grey-2"];
    ctx.strokeStyle = theme.colors["grey-1"];
    ctx.lineWidth = dims.borderWidth / 2;
    ctx.font = "300 10px Roboto";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

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
        dims.left - dims.offset,
        pointY
      );
    }
    ctx.restore();
  };

  const _drawCoordsPlane = () => {
    ctx.save();
    ctx.strokeStyle = theme.colors["grey-1"];
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
    ctx.fillStyle = theme.colors["grey-2"];
    ctx.font = "300 10px Roboto";
    ctx.textAlign = "center";

    // draw x Legends
    graphData.forEach((point) => {
      ctx.fillText(point.xLegend, point.x, dims.bottom + dims.offset * 2);
    });

    ctx.restore();
  };

  const _drawBar = (p1, p2) => {
    const grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    grd.addColorStop(0, theme.colors.blue);
    grd.addColorStop(1, theme.colors.teal);
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
  }, [graphData, theme]);

  return <CanvasWrapper ref={canvasWrapperRef}></CanvasWrapper>;
}

export default withTheme(BarCanvas);

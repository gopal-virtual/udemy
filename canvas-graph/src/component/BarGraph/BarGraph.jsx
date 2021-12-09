import React from "react";
import PropTypes from "prop-types";
import BarGraphCanvas from "./BarGraphCanvas";

const normalizeData = (data = [], xKey, yKey) => {
  const newData = data.map((dataPoints) => ({
    x: dataPoints[xKey],
    y: dataPoints[yKey],
  }));
  return newData;
};

function BarGraph({ data, xKey, yKey }) {
  const canvasWrapperRef = React.useRef(null);
  const [canvas, setCanvas] = React.useState(null);

  React.useEffect(() => {
    let canvasObj;
    if (canvasWrapperRef && canvasWrapperRef.current) {
      canvasObj = new BarGraphCanvas(canvasWrapperRef.current, 400, 350);
      canvasObj.render(normalizeData(data, xKey, yKey));
      setCanvas(canvasObj);
    }
    return () => canvasObj.destroy();
  }, [canvasWrapperRef]);

  React.useEffect(() => {
    if (canvas) {
      canvas.render(normalizeData(data, xKey, yKey));
    }
  }, [data, xKey, yKey]);

  return (
    <>
      <div>Bar Graph</div>
      <div ref={canvasWrapperRef}></div>
    </>
  );
}

BarGraph.propTypes = {};

export default BarGraph;

import React from "react";

function useCanvas(parentDom) {
  const [ctx, setCtx] = React.useState(null);
  const [canvas, setCanvas] = React.useState(null);
  const [canvasW, setCanvasW] = React.useState(0);
  const [canvasH, setCanvasH] = React.useState(0);

  const initCanvas = React.useCallback(() => {
    const canvas = document.createElement("canvas");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = canvasW * pixelRatio;
    canvas.height = canvasH * pixelRatio;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;
    // canvas.style.position = "absolute";

    const ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);

    parentDom.current.appendChild(canvas);

    setCtx(ctx);
    setCanvas(canvas);
  });

  const destroyCanvas = React.useCallback(() => {
    if (ctx) {
      setCtx(null);
      parentDom.current.removeChild(canvas);
    }
  });

  const clearCanvas = React.useCallback(() => {
    ctx.clearRect(0, 0, canvasW, canvasH);
  });

  const setDims = React.useCallback(() => {
    const { width, height } = parentDom.current.getBoundingClientRect();
    setCanvasW(width);
    setCanvasH(height);
  });

  React.useEffect(() => {
    if (!parentDom) return;
    destroyCanvas();
    initCanvas();
  }, [canvasW, canvasH]);

  React.useEffect(() => {
    if (parentDom && parentDom.current) {
      setDims();
    }
  }, [parentDom]);

  React.useEffect(() => {
    window.addEventListener("resize", setDims);
    return () => window.removeEventListener("resize", setDims);
  }, []);

  return { ctx, canvasW, canvasH, clearCanvas };
}

export default useCanvas;

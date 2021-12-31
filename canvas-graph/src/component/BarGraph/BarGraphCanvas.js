import { map } from "../../Utils";
import Tween from "../Tween/Tween";

function initCanvas(width, height) {
  const canvas = document.createElement("canvas");

  const pixelRatio = window.devicePixelRatio;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.position = "absolute";

  const ctx = canvas.getContext("2d");
  ctx.scale(pixelRatio, pixelRatio);

  return ctx;
}

class BarGraphCanvas {
  constructor(parentRef) {
    this.ref = parentRef;
  }

  init = ({ width, height, padding, offset, yUnit, renderId }) => {
    this.destroy();
    this.ctx = initCanvas(width, height);
    this.bar_ctx = initCanvas(width, height);
    this.canvas = this.ctx.canvas;
    this.bar_canvas = this.bar_ctx.canvas;
    this.ref.appendChild(this.canvas);
    this.ref.appendChild(this.bar_canvas);
    this.renderId = renderId;

    // consts
    this.w = this.canvas.width = this.bar_canvas.width = width;
    this.h = this.canvas.height = this.bar_canvas.height = height;

    this.padding = padding;
    this.left = this.padding;
    this.right = this.w - this.padding;
    this.top = this.padding;
    this.bottom = this.h - this.padding;
    this.offset = offset;
    this.borderWidth = 1;
    this.barWidth = 14;
    this.yUnit = yUnit;
  };

  destroy = () => {
    if (this.canvas) {
      this.ctx = null;
      this.ref.removeChild(this.canvas);
    }
    if (this.bar_canvas) {
      this.bar_ctx = null;
      this.ref.removeChild(this.bar_canvas);
    }
  };

  _clear = (ctx) => {
    ctx.clearRect(0, 0, this.w, this.h);
  };

  _drawCoordsPlane = () => {
    this.ctx.save();
    this.ctx.strokeStyle = "#E2E2E2";
    this.ctx.lineWidth = this.borderWidth;
    // draw x axis
    this._drawLine(
      { x: this.left, y: this.bottom },
      { x: this.right, y: this.bottom }
    );
    // draw y axis
    this._drawLine(
      { x: this.left, y: this.top },
      { x: this.left, y: this.bottom }
    );
    this.ctx.restore();
  };

  _transposeData = (data) => {
    // get y data flipped
    return data.map((point) => ({
      ...point,
      y: this.h - point.y,
    }));
  };

  _drawLine = (p1, p2, ctx = this.ctx) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  clearBar = (p1, p2) => {
    this.bar_ctx.clearRect(
      p1.x - this.barWidth / 2,
      p1.y - this.barWidth / 2,
      this.barWidth,
      p2.y
    );
  };

  drawBar = (p1, p2) => {
    const grd = this.bar_ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    grd.addColorStop(0, "#5297FF");
    grd.addColorStop(1, "#70DBD4");
    this.bar_ctx.lineWidth = this.barWidth;
    this.bar_ctx.lineCap = "round";
    this.bar_ctx.strokeStyle = grd;
    this._drawLine(p1, p2, this.bar_ctx);
    this.bar_ctx.clearRect(
      p2.x - this.bar_ctx.lineWidth / 2,
      this.bottom + this.borderWidth,
      this.bar_ctx.lineWidth,
      this.bar_ctx.lineWidth / 2
    );
  };

  // loop through tween
  //  // get updated data from tween func
  //  // clear bar ctx
  //  // call the entire loop
  // end loop
  _drawBar = (data) => {
    this.bar_ctx.save();
    const tween = new Tween();
    data.forEach((point) => {
      const draw = (newVal, prevVal, renderId) => {
        this.clearBar(
          { x: point.x, y: prevVal },
          { x: point.x, y: this.bottom }
        );
        renderId === this.renderId &&
          this.drawBar(
            { x: point.x, y: newVal },
            { x: point.x, y: this.bottom }
          );
      };
      tween._play(this.bottom, point.y, 700, this.renderId, draw);
    });
    this.bar_ctx.restore();
  };

  _drawYLegends = () => {
    this.ctx.save();
    this.ctx.fillStyle = "#7A7A7A";
    this.ctx.strokeStyle = "#7A7A7A";
    this.ctx.lineWidth = this.borderWidth / 2;
    this.ctx.font = "300 10px Roboto";
    this.ctx.textAlign = "right";

    const interval = 5;
    const intervalHeight = (this.bottom - this.padding) / interval;
    for (let i = 1; i < interval; i++) {
      // draw y grid
      this._drawLine(
        { x: this.left, y: this.bottom - intervalHeight * i },
        { x: this.right, y: this.bottom - intervalHeight * i }
      );

      // draw y Legends
      const pointY = map(i, 0, interval, this.bottom, this.top);
      const yLegend = map(i, 0, interval, this.minY, this.maxY, false);
      this.ctx.fillText(
        `${yLegend.toFixed(1)}${this.yUnit || ""}`,
        this.left - this.offset / 2,
        pointY
      );
    }
    this.ctx.restore();
  };

  _drawXLegends = (data) => {
    this.ctx.save();
    this.ctx.fillStyle = "#7A7A7A";
    this.ctx.font = "300 10px Roboto";
    this.ctx.textAlign = "center";

    // draw x Legends
    data.forEach((point) => {
      this.ctx.fillText(
        point.xLegend,
        point.x,
        this.bottom + this.padding - this.offset / 2
      );
    });

    this.ctx.restore();
  };

  render = ({ data, minY, maxY }) => {
    this.minY = minY;
    this.maxY = maxY;
    const transposedData = this._transposeData(data);
    this._clear(this.ctx);
    this._clear(this.bar_ctx);
    this._drawCoordsPlane();
    this._drawYLegends();
    this._drawBar(transposedData);
    this._drawXLegends(transposedData);
  };
}

export default BarGraphCanvas;

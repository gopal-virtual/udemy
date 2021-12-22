import { map } from "../../Utils";

function initCanvas(width, height) {
  const canvas = document.createElement("canvas");

  const pixelRatio = window.devicePixelRatio;
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  ctx.scale(pixelRatio, pixelRatio);

  return ctx;
}

class BarGraphCanvas {
  constructor(parentRef) {
    this.ref = parentRef;
  }

  init = ({ width, height, padding, offset, yUnit }) => {
    if (this.canvas) {
      this.destroy();
    }
    this.ctx = initCanvas(width, height);
    this.canvas = this.ctx.canvas;
    this.ref.appendChild(this.canvas);

    // consts
    this.w = this.canvas.width = width;
    this.h = this.canvas.height = height;

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
    this.ref.removeChild(this.canvas);
  };

  _clear = () => {
    this.ctx.clearRect(0, 0, this.w, this.h);
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

  _drawLine = (p1, p2) => {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  };

  drawBar = (p1, p2) => {
    const grd = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    grd.addColorStop(0, "#5297FF");
    grd.addColorStop(1, "#70DBD4");
    this.ctx.lineWidth = this.barWidth;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = grd;
    this._drawLine(p1, p2);
    this.ctx.clearRect(
      p2.x - this.ctx.lineWidth / 2,
      this.bottom + this.borderWidth,
      this.ctx.lineWidth,
      this.ctx.lineWidth / 2
    );
  };

  _drawBar = (data) => {
    this.ctx.save();
    data.forEach((point) => {
      this.drawBar({ x: point.x, y: point.y }, { x: point.x, y: this.bottom });
    });
    this.ctx.restore();
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
    this._clear();
    this._drawCoordsPlane();
    this._drawYLegends();
    this._drawBar(transposedData);
    this._drawXLegends(transposedData);
  };
}

export default BarGraphCanvas;

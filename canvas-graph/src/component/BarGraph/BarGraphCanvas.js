import { map } from "../../Utils";

class BarGraphCanvas {
  constructor(parentRef, w, h) {
    this.ref = parentRef;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ref.appendChild(this.canvas);

    // consts
    this.w = this.canvas.width = w;
    this.h = this.canvas.height = h;
    this.left = 20;
    this.right = this.w - 10;
    this.top = 10;
    this.bottom = this.h - 20;
    this.borderWidth = 1;
    this.barWidth = 14;
    this.offset = 20;
  }

  destroy() {
    this.ref.removeChild(this.canvas);
  }

  drawBar = (p1, p2) => {
    this.ctx.save();
    const grd = this.ctx.createLinearGradient(p2.x, p2.y, p1.x, p1.y);
    grd.addColorStop(0, "#5297FF");
    grd.addColorStop(1, "#70DBD4");
    this.ctx.lineWidth = this.barWidth;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = grd;
    this.drawLine({ x: p1.x, y: p1.y }, { x: p2.x, y: p2.y });
    this.ctx.clearRect(
      p1.x - this.ctx.lineWidth / 2,
      this.bottom + 1,
      this.ctx.lineWidth,
      this.ctx.lineWidth / 2
    );
    this.ctx.restore();
  };

  plotBar = (data) => {
    data.forEach((point) =>
      this.drawBar(
        { x: point.x, y: this.bottom },
        { x: point.x, y: this.bottom - point.y }
      )
    );
  };

  drawLine = (p1, p2) => {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  };

  drawCoordsPlane = () => {
    this.ctx.save();
    // style
    this.ctx.strokeStyle = "#E2E2E2";
    this.ctx.lineWidth = this.borderWidth;
    // draw x and y axis
    this.ctx.beginPath();
    this.ctx.moveTo(this.left, this.top);
    this.ctx.lineTo(this.left, this.bottom);
    this.ctx.lineTo(this.right, this.bottom);
    this.ctx.stroke();

    // draw horizontal grid
    const gridInterval = 5;
    const intervalHeight = (this.h - 20) / gridInterval;
    for (let i = 1; i < gridInterval; i++) {
      this.drawLine(
        { x: this.left, y: this.bottom - intervalHeight * i },
        { x: this.right, y: this.bottom - intervalHeight * i }
      );
    }
    this.ctx.restore();
  };

  drawLegands = (yLegand, normalizedData) => {
    this.ctx.save();
    this.ctx.fillStyle = "#7A7A7A";
    this.ctx.font = "10px sans-serif";
    this.ctx.textAlign = "center";
    // draw x legands
    normalizedData.forEach((point) => {
      this.ctx.fillText(point.xLegand, point.x, this.bottom + this.offset);
    });
    // draw y legands
    yLegand.forEach((point) => {
      this.ctx.fillText(point.yLegand, point.x, this.bottom - point.y);
    });
    this.ctx.restore();
  };

  clear = () => {
    this.ctx.clearRect(0, 0, this.w, this.h);
  };

  normalizeToCanvasData = (data) => {
    const range = data.reduce((acc, point, i) => {
      if (i === 0) {
        return { min: point.y, max: point.y };
      }
      return {
        min: Math.min(acc.min, point.y),
        max: Math.max(acc.max, point.y),
      };
    }, {});
    const yLegand = Array(6)
      .fill()
      .map((_, index) => ({
        yLegand: map(index, 0, 5, range.min, range.max),
        x: this.left - 10,
        y: map(index, 0, 5, this.top, this.bottom),
      }));
    const normalizedData = data.map((point, index) => ({
      x: map(index, 0, data.length, this.left + this.offset * 3, this.right),
      y: map(
        point.y,
        range.min,
        range.max,
        this.top + this.offset,
        this.bottom - this.offset
      ),
      xLegand: point.x,
    }));
    return { yLegand, normalizedData };
  };

  render = (data) => {
    const { yLegand, normalizedData } = this.normalizeToCanvasData(data);
    this.clear();
    this.drawCoordsPlane();
    this.drawLegands(yLegand, normalizedData);
    this.plotBar(normalizedData);
  };
}

export default BarGraphCanvas;

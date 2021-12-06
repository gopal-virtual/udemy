class BarGraphCanvas {
  constructor(canvas, w, h) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.w = w;
    this.h = h;
  }

  drawBar = () => {};

  drawLine = (p1, p2) => {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.stroke();
  };

  drawCoordsPlane = () => {
    // draw x and y axis
    this.ctx.beginPath();
    this.ctx.moveTo(10, 10);
    this.ctx.lineTo(10, this.h - 10);
    this.ctx.lineTo(this.w - 10, this.h - 10);
    this.ctx.stroke();

    // draw horizontal grid
    const gridInterval = 5;
    const left = 10;
    const right = this.w - 10;
    const top = 10;
    const bottom = this.h - 10;
    const intervalHeight = (this.h - 20) / gridInterval;
    for (let i = 1; i < gridInterval; i++) {
      this.drawLine(
        { x: left, y: bottom - intervalHeight * i },
        { x: right, y: bottom - intervalHeight * i }
      );
    }
  };

  drawLegands = () => {};

  clear = () => {
    this.ctx.clearRect(0, 0, this.w, this.h);
  };

  render = () => {
    this.clear();
    this.drawCoordsPlane();
    this.drawLegands();
    this.drawBar();
  };
}

export default BarGraphCanvas;

class BarGraphCanvas {
  constructor(canvas, w, h) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // consts
    this.w = this.canvas.width = w;
    this.h = this.canvas.height = h;
    this.left = 20;
    this.right = this.w - 10;
    this.top = 10;
    this.bottom = this.h - 20;
    this.borderWidth = 1;
    this.barWidth = 14;
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

  plotBar = () => {
    this.drawBar(
      { x: this.left + 30, y: this.bottom },
      { x: this.left + 30, y: this.top + 180 }
    );
    this.drawBar(
      { x: this.left + 80, y: this.bottom },
      { x: this.left + 80, y: this.top + 50 }
    );
    this.drawBar(
      { x: this.left + 130, y: this.bottom },
      { x: this.left + 130, y: this.top + 120 }
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

  drawLegands = () => {};

  clear = () => {
    this.ctx.clearRect(0, 0, this.w, this.h);
  };

  render = () => {
    this.clear();
    this.drawCoordsPlane();
    this.drawLegands();
    this.plotBar();
  };
}

export default BarGraphCanvas;

function Cuboid(s, col, off, time) {
  this.s = s;
  this.col = col;
  this.off = off;
  this.start = 0;
  this.time = time;

  this.now = [
    new p5.Vector(0, 0),
    new p5.Vector(0, 0),
    new p5.Vector(0, 0),
    new p5.Vector(0, 0),
    new p5.Vector(0, 0),
    new p5.Vector(0, 0)
  ];

  var o_x =  this.off * cos(PI/3);
  var o_y =  this.off * sin(PI/3);

  this.delta = [
    new p5.Vector(- 1.25 * o_x, 1.25 * o_y),
    new p5.Vector(1.25 * o_x, - 1.25 * o_y),
    new p5.Vector(1.25 * o_x, - 1.25 * o_y),
    new p5.Vector(1.25 * o_x, - 1.25 * o_y),
    new p5.Vector(- 1.25 * o_x, 1.25 * o_y),
    new p5.Vector(- 1.25 * o_x, 1.25 * o_y)
  ];

  this.startPos = [
    new p5.Vector(-s + 0.25 * o_x, - 0.25 * o_y),
    new p5.Vector(-s + s * cos(PI/3) - 0.25 * o_x, 0.25 * o_y - s * sin(PI/3)),
    new p5.Vector(s * cos(PI/3) - 0.25 * o_x, 0.25 * o_y - s * sin(PI/3)),
    new p5.Vector(s - 0.25 * o_x, 0.25 * o_y),
    new p5.Vector(s * cos(PI/3) + 0.25 * o_x, - 0.25 * o_y + s * sin(PI/3)),
    new p5.Vector(-s + s * cos(PI/3) + 0.25 * o_x, - 0.25 * o_y + s * sin(PI/3))
  ];

  this.reset();
}

Cuboid.prototype.run = function() {
  this.update();
  this.render();
};

Cuboid.prototype.impulse = function() {
  this.reset();
  this.start = frameCount;
};

Cuboid.prototype.update = function() {
  if (frameCount < this.start + this.time) {
    for (var i = this.now.length - 1; i >= 0; i--) {
      this.now[i].x = bounce(frameCount - this.start, this.startPos[i].x, this.delta[i].x, this.time);
      this.now[i].y = bounce(frameCount - this.start, this.startPos[i].y, this.delta[i].y, this.time);
    }
  }
};

Cuboid.prototype.reset = function() {
  for (var i = this.now.length - 1; i >= 0; i--) {
    this.now[i] = this.startPos[i].get();
    // this.now[i].x = this.startPos[i].x + this.delta[i].x;
    // this.now[i].y = this.startPos[i].y + this.delta[i].y;
  };
}

Cuboid.prototype.render = function() {
  noStroke();
  fill(this.col);
  beginShape();
    for (var i = 0; i < this.now.length; i++) {
      vertex(this.now[i].x, this.now[i].y);
    };
  endShape(CLOSE);
};

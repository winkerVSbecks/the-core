var delta;
var s = 120;
var start = 0;
var time = 60;
var gradSize;
var startPos;
var cuboids;
var now = [
  new p5.Vector(0, 0),
  new p5.Vector(0, 0),
  new p5.Vector(0, 0),
  new p5.Vector(0, 0),
  new p5.Vector(0, 0),
  new p5.Vector(0, 0)
];

var purple, pink, orange;

// -------------
// Setup
// -------------
function setup() {
  createCanvas(windowWidth, windowHeight);

  purple = color(54,29,72);
  pink = color(252,23,125);
  orange = color(253,125,36);

  fill(pink);

  var o_x =  80 * cos(PI/3);
  var o_y =  80 * sin(PI/3);
  gradSize = 2 * (s + o_x + 80 * cos(PI/3));

  delta = [
    // new p5.Vector(-s - o_x, o_y),
    // new p5.Vector(-s + s * cos(PI/3) + o_x, - o_y - s * sin(PI/3)),
    // new p5.Vector(s * cos(PI/3) + o_x, - o_y - s * sin(PI/3)),
    // new p5.Vector(s + o_x, - o_y),
    // new p5.Vector(s * cos(PI/3) - o_x, o_y + s * sin(PI/3)),
    // new p5.Vector(-s + s * cos(PI/3) - o_x, o_y + s * sin(PI/3))

    new p5.Vector(- o_x, o_y),
    new p5.Vector(o_x, - o_y),
    new p5.Vector(o_x, - o_y),
    new p5.Vector(o_x, - o_y),
    new p5.Vector(- o_x, o_y),
    new p5.Vector(- o_x, o_y)
  ];

  startPos = [
    // new p5.Vector(0, 0),
    // new p5.Vector(0, 0),
    // new p5.Vector(0, 0),
    // new p5.Vector(0, 0),
    // new p5.Vector(0, 0),
    // new p5.Vector(0, 0)

    new p5.Vector(-s, 0),
    new p5.Vector(-s + s * cos(PI/3), - s * sin(PI/3)),
    new p5.Vector(s * cos(PI/3), - s * sin(PI/3)),
    new p5.Vector(s, 0),
    new p5.Vector(s * cos(PI/3), s * sin(PI/3)),
    new p5.Vector(-s + s * cos(PI/3), s * sin(PI/3))

    // new p5.Vector(-s + o_x, - o_y),
    // new p5.Vector(-s + s * cos(PI/3) - o_x, o_y - s * sin(PI/3)),
    // new p5.Vector(s * cos(PI/3) - o_x, o_y - s * sin(PI/3)),
    // new p5.Vector(s - o_x, o_y),
    // new p5.Vector(s * cos(PI/3) + o_x, - o_y + s * sin(PI/3)),
    // new p5.Vector(-s + s * cos(PI/3) + o_x, - o_y + s * sin(PI/3))
  ];

  cuboids = [
    new Cuboid(20, color(255, 255, 171, 100), 80, 35),
    new Cuboid(40, color(255, 239, 171, 100), 80, 40),
    new Cuboid(60, color(255, 221, 171, 100), 80, 45),
    new Cuboid(80, color(255, 171, 171, 100), 80, 50),
    new Cuboid(100, color(255, 153, 171, 100), 80, 55)
  ];

  reset();
}

// -------------
// Draw
// -------------
function draw() {
  background(purple);

  if (frameCount < start + time) {
    for (var i = now.length - 1; i >= 0; i--) {
      now[i].x = bounce(frameCount - start, startPos[i].x, delta[i].x, time);
      now[i].y = bounce(frameCount - start, startPos[i].y, delta[i].y, time);
    }
  }

  push();
    translate(width/2, height/2);
    setGradient(-gradSize, -gradSize, 2*gradSize, 2*gradSize, pink, orange);
    fill(purple);
    noStroke();
    beginShape();
      // Exterior
      vertex(-4*s, -4*s);
      vertex(4*s, -4*s);
      vertex(4*s, 4*s);
      vertex(-4*s, 4*s);
      // Interior
      beginContour();
        for (var i = 0; i < now.length; i++) {
          vertex(now[i].x, now[i].y);
        };
      endContour();
    endShape(CLOSE);

    for (var i = cuboids.length - 1; i >= 0; i--) {
      cuboids[i].run();
    };
  pop();
}


function setGradient(x, y, w, h, c1, c2) {
  noFill();
  for (var i = y; i <= y+h; i++) {
    var inter = map(i, y, y+h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x+w, i);
  }
}


function mouseClicked() {
  reset();
  start = frameCount;
  for (var i = cuboids.length - 1; i >= 0; i--) {
    cuboids[i].start = frameCount;
  };
}


function reset() {
  for (var i = now.length - 1; i >= 0; i--) {
    now[i] = startPos[i].get();
  };
}


// @t is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time [3].
// @b is the beginning value of the property.
// @c is the change between the beginning and destination value of the property.
// @d is the total time of the tween.
function bounce(t, b, c, d) {
  var ts=(t/=d)*t;
  var tc=ts*t;
  return b+c*(33*tc*ts + -106*ts*ts + 126*tc + -67*ts + 15*t);
}
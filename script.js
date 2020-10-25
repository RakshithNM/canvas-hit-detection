const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
let circles = [];

class Color {
  constructor() {
    this.names = {
      aqua: "#00ffff",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      black: "#000000",
      blue: "#0000ff",
      brown: "#a52a2a",
      cyan: "#00ffff",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgrey: "#a9a9a9",
      darkgreen: "#006400",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkviolet: "#9400d3",
      fuchsia: "#ff00ff",
      gold: "#ffd700",
      green: "#008000",
      indigo: "#4b0082",
      khaki: "#f0e68c",
      lightblue: "#add8e6",
      lightcyan: "#e0ffff",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightyellow: "#ffffe0",
      lime: "#00ff00",
      magenta: "#ff00ff",
      maroon: "#800000",
      navy: "#000080",
      olive: "#808000",
      orange: "#ffa500",
      pink: "#ffc0cb",
      purple: "#800080",
      violet: "#800080",
      red: "#ff0000",
      silver: "#c0c0c0",
      white: "#ffffff",
      yellow: "#ffff00"
    };
  }

  random() {
    var result;
    var count = 0;
    for (var prop in this.names)
      if (Math.random() < 1/++count)
        result = this.names[prop];
        return result;
  }
};

class Circle {
  constructor(inX, inY, inRadius, inColor) {
    this.x = inX;
    this.y = inY;
    this.radius = inRadius;
    this.color = inColor;
    this.dragging = false;
    this.drag = this.drag;
    this.draw = this.draw;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color; 
    ctx.fill();
  }

  drag(inX, inY) {
    this.x = inX;
    this.y = inY;
    this.draw();
  }
};

function clear() {
  ctx.clearRect(0, 0, width, height);
}

function drawCircles() {
  circles.forEach((circle) => {
    circle.draw();
  });
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

let isDown = false;

canvas.addEventListener("mousedown", (e) => {
  isDown = true;
  circles.forEach(circle => {
    if(Math.sqrt((e.clientX-circle.x) ** 2 + (e.clientY - circle.y) ** 2) < circle.radius) { 
      circle.dragging = true;
      return;
    }
    circle.dragging = false;
  });
});

canvas.addEventListener("mousemove", (e) => {
  if(isDown) {
    clear();
    drawCircles();
    circles.forEach(circle => {
      if(circle.dragging) { 
        circle.x = e.clientX;
        circle.y = e.clientY;
        if(circle.drag) {
          circle.drag(circle.x, circle.y);
        }
      }
    });
  }
});

canvas.addEventListener("mouseup", (e) => {
  isDown = false;
  const pixel = ctx.getImageData(e.clientX, e.clientY, 1, 1).data;
  const color = `#${componentToHex(pixel[0])}${componentToHex(pixel[1])}${componentToHex(pixel[2])}`;
  if(color === "#000000") {
    c = new Circle(e.clientX, e.clientY, 30, new Color().random());
    c.draw();
    circles.push(c);
    return;
  }
  circles.forEach(circle => {
    if(circle.color === color) {
      return;
    }
  });
});


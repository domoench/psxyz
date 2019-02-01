import React from 'react';

/*
 * TODO: Add some rules
 *  - Don't make white borders on squares
 *  - If rendering a circle within a square with a border, adjust the circle's dimensions so it wont
 *    interrupt the square's border
 *  - Try passing rules down when partitioning - so there's some consistency in a given partition. e.g. forbid a color in
 *    this partition and all it's child partitions, or set a max/min grid chunk size
 *  - Fit it to the screen:
 *    - detect screen dimension (probably round to nearest 5 pixels)
 *    - Use euclid algorithm to divide the space into squares to find biggest square tiles that will work
 *    - either multiply or divide that GCD square to produce a target size grid square
 */

// Consts
const ns = 'http://www.w3.org/2000/svg';
const numMovements = 100;

// Flags
let nameDrawn = false; // TODO: ugly

// truePercent(0.5) returns true 50% of the time
const truePercent = p => Math.random() < p;

// Iterative Euclid algorithm for GCD
const gcd = (inA, inB) => {
  // Make input numbers positive.
  let a = Math.abs(inA);
  let b = Math.abs(inB);

  // Subtract one number from another until both numbers would become the same.
  // This will be out GCD. Also quit the loop if one of the numbers is zero.
  while (a && b && a !== b) {
    [a, b] = a > b ? [a - b, b] : [a, b - a];
  }

  // Return the number that is not equal to zero since the last subtraction (it will be a GCD).
  return a || b;
};

const getGridDimensions = () => {
  // Round window viewport dimensions to enforce a min cell size
  const viewW = window.innerWidth - (window.innerWidth % 50);
  const viewH = window.innerHeight - (window.innerHeight % 50);

  // Calculate the biggest square cells that will tile the viewport
  const cellW = gcd(viewW, viewH);

  // TODO figure out how to massage the drawing width/height and cell width to get towards
  // a target cell size. Set that target based on screen size.

  console.log(`updateWindowDimensions(). viewW:${viewW}. viewH:${viewH}. cellW:${cellW}`);
  return { viewW, viewH, cellW };
};

const moveStyles = () => {
  let result = '';
  for (let i = 0; i < numMovements; i += 1) {
    const dir = truePercent(0.5) ? 'X' : 'Y';
    const dist = (Math.floor(Math.random() * 80)) - 40;
    const time = (Math.floor(Math.random() * 3));
    result += `
      @keyframes slideIn${i} {
        from {
          opacity: 0;
          transform:translate${dir}(${dist}rem);
        }
        to {
          opacity: 1;
          transform:none;
        }
      }
      .mover${i} {
        animation: slideIn${i} ${time}s;
      }
    `;
  }
  return result;
};

const styles = moveStyles();

class Splash extends React.Component {
  constructor(props) {
    super(props);
    const { viewW, viewH, cellW } = getGridDimensions();
    this.state = {
      viewW, // width (pixels) of the browser window viewport
      viewH, // height (pixels) of the browser window viewport
      cellW, // grid cell width (pixels)
    };
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    const { viewW, viewH, cellW } = this.state;
    console.log(`draw(). viewW:${viewW}. viewH:${viewH}. cellW:${cellW}.`);
    const div = document.getElementById('drawing');
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    div.appendChild(svg);

    const singleCell = (w, h) => w === 1 && h === 1;
    const square = (x, y) => x === y;

    // Return a random movement class
    const randomMoveClass = () => `mover${Math.floor(Math.random() * numMovements)}`;
    const randomColor = () => {
      const colors = ['#2F4FA2', '#F6F3F4', '#FE0000', '#229446', '#FDD316', '#FFF'];
      const i = Math.floor(Math.random() * colors.length);
      return colors[i];
    };

    // fill the square defined by upper left hand corner (x,y) and width
    // with a square SVG. Units in pixels.
    const fillSquare = (x, y, width) => {
      let w = width;
      let trans = 0;

      const r = document.createElementNS(ns, 'rect');
      r.setAttribute('fill', randomColor());
      if (truePercent(0.5)) {
        const strokeWidth = Math.floor(Math.random() * 10);
        r.setAttribute('stroke', randomColor());
        r.setAttribute('stroke-width', strokeWidth);
        w -= strokeWidth;
        trans = strokeWidth / 2;
      }
      r.setAttribute('x', x + trans);
      r.setAttribute('y', y + trans);
      r.setAttribute('width', w);
      r.setAttribute('height', w);
      r.className.baseVal = randomMoveClass();
      svg.appendChild(r);
    };

    // fill the square defined by upper left hand corner (x,y) and width w
    // with a circle SVG. Units in pixels.
    const fillCircle = (x, y, w) => {
      let r = w / 2;
      const cx = x + r;
      const cy = y + r;
      const c = document.createElementNS(ns, 'circle');
      if (truePercent(0.5)) {
        const strokeWidth = Math.floor(Math.random() * 10);
        c.setAttribute('stroke', randomColor());
        c.setAttribute('stroke-width', strokeWidth);
        r -= strokeWidth / 2;
      }
      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('r', r);
      c.setAttribute('fill', randomColor());
      c.className.baseVal = randomMoveClass();
      svg.appendChild(c);
    };

    // Units in pixels
    const fillText = (x, y, w) => {
      const t = document.createElementNS(ns, 'text');
      const textWidth = 0.75 * w;
      // t.setAttribute('x', x + (w - textWidth) / 2);
      // t.setAttribute('y', y + w / 2);
      t.setAttribute('x', x + w / 2);
      t.setAttribute('y', y + w / 2);
      t.setAttribute('textLength', textWidth);
      t.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'central');
      t.className.baseVal = 'text';
      const textNode = document.createTextNode('PUBLIC SERVICE');
      t.appendChild(textNode);
      svg.appendChild(t);
    };

    // Units in pixels
    const fillRandom = (x, y, w, basePercent) => {
      if (truePercent(0.95 * basePercent)) {
        fillSquare(x, y, w);
      }
      if (truePercent(0.75 * basePercent)) {
        fillCircle(x, y, w);
      }
    };

    // Recursive function to partition up space and draw shapes
    // x, y: top left corner coords of rectangular area
    // w: width (in grid cells)
    // h: height (in grid cells)
    // depth: recursion depth for debug logging
    const partition = (x, y, w, h, depth) => {
      if (depth > 20) {
        return;
      }
      let indent = '';
      for (let i = 0; i < depth; i += 1) {
        indent += '  ';
      }
      console.log(`${indent}[D${depth}] partition(x:${x}, y:${y}, w:${w}, h:${h})`);

      // Convert grid cell widths to pixel widths
      const xPx = x * cellW;
      const yPx = y * cellW;
      const wPx = w * cellW;

      // Base cases: single cell, empty, or multi-cell square
      if (w === 0 || h === 0) {
        return;
      }
      if (singleCell(w, h)) {
        fillRandom(xPx, yPx, wPx, 0.1);
        if (truePercent(0.1) && !nameDrawn) {
          fillText(xPx, yPx, wPx);
          nameDrawn = true;
        }
        return;
      }
      if (square(w, h)) {
        fillRandom(xPx, yPx, wPx, 0.6);
        return;
      }

      // Recursive: Partition and recurse
      // Randomly partition rectangle into 4 rectangles
      const xPart = Math.floor(Math.random() * w);
      const yPart = Math.floor(Math.random() * h);
      // console.log(`${indent}[D${depth}] partition points: xPart:${xPart}. yPart:${yPart}`);

      // Top left quadrant
      partition(x, y, xPart, yPart, depth + 1);
      // Top right quadrant
      partition(x + xPart, y, w - xPart, yPart, depth + 1);
      // Bottom left quadrant
      partition(x, y + yPart, xPart, h - yPart, depth + 1);
      // Bottom right quadrant
      partition(x + xPart, y + yPart, w - xPart, h - yPart, depth + 1);
    };

    partition(0, 0, viewW / cellW, viewH / cellW, 0);
  }

  render() {
    const { viewW, viewH } = this.state;
    return (
      <React.Fragment>
        <div id="drawing">
          <style jsx global>
            {
              `
                ${styles}

                #drawing {
                  width: ${viewW}px;
                  height: ${viewH}px;
                }
                svg .text {
                  color: black;
                  font-family: Arial;
                  font-weight: bold;
                }
              `
            }
          </style>
        </div>
      </React.Fragment>
    );
  }
}

export default Splash;

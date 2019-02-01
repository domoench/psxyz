import React from 'react';

/*
 * TODO: Add some rules
 *  - Try passing rules down when partitioning - so there's some consistency in a given partition. e.g. forbid a color in
 *    this partition and all it's child partitions, or set a max/min grid chunk size
 */

// Consts
const DEBUG = false;
const ns = 'http://www.w3.org/2000/svg';
const numMovements = 100;

// Flags
let nameDrawn = false;

// truePercent(0.5) returns true 50% of the time
const truePercent = p => Math.random() < p;

const getGridDimensions = () => {
  let width = 900;
  let height = 600;
  if (typeof window !== 'undefined') {
    width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    console.log(`clientWidth:${document.documentElement.clientWidth}. innerWidth:${window.innerWidth}`);
    console.log(`clientHeight:${document.documentElement.clientHeight}. innerHeight:${window.innerHeight}`);
  }

  // Pick target cell width based on screen dimensions
  // XS: [0px,575px] => 50px
  // SM: [576px,767px] => 50px
  // MD: [768px,991px] => 75px
  // LG: [992px,1199] => 100px
  // XL: [1200px,∞px] => 120px
  const breakpoints = [
    { screen: 576, target: 50 },
    { screen: 768, target: 75 },
    { screen: 992, target: 100 },
    { screen: 1200, target: 120 },
  ];

  let targetCellW = 50;
  for (let i = 0; i < breakpoints.length; i += 1) {
    const bp = breakpoints[i];
    if (width < bp.screen) {
      break;
    }
    targetCellW = bp.target;
  }

  // Round width and height to nearest multiples of target cell width
  const viewW = width - (width % targetCellW);
  const viewH = height - (height % targetCellW);

  // Calculate vertical and horizontal padding needed to center drawing in viewport
  const padW = Math.floor((width - viewW) / 2);
  const padH = Math.floor((height - viewH) / 2);

  if (true) {
    console.log(`getGridDimensions().
      width:${width}. height:${height}.
      viewW:${viewW}. viewH:${viewH}.
      padW:${padW}.   padH:${padH}.
      cellW:${targetCellW}
    `);
  }
  return {
    viewW,
    viewH,
    padW,
    padH,
    cellW: targetCellW,
  };
};

// Return a CSS string defining varied CSS keyframe animations
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
    const {
      viewW,
      viewH,
      padW,
      padH,
      cellW,
    } = getGridDimensions();
    this.state = {
      viewW, // calculated width (pixels) of the drawing div
      viewH, // calculated height (pixels) of the drawing div
      padW, // calculated horizontal padding to center drawing div in viewport
      padH, // calculated vertical padding to center drawing div in viewport
      cellW, // grid cell width (pixels)
    };
  }

  componentDidMount() {
    this.draw();
  }

  draw() {
    const { viewW, viewH, cellW } = this.state;
    // console.log(`draw(). viewW:${viewW}. viewH:${viewH}. cellW:${cellW}.`);
    const div = document.getElementById('drawing');
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    div.appendChild(svg);

    const singleCell = (w, h) => w === 1 && h === 1;
    const isSquare = (x, y) => x === y;

    // Return a random movement class
    const randomMoveClass = () => `mover${Math.floor(Math.random() * numMovements)}`;
    const randomColor = (noWhite) => {
      let colors = ['#2F4FA2', '#F6F3F4', '#FE0000', '#229446', '#FDD316'];
      colors = noWhite ? colors : [...colors, '#FFF'];
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
      // Maybe draw a border
      let strokeWidth = 0;
      if (truePercent(0.5)) {
        strokeWidth = Math.floor(Math.random() * w * 0.25);
        r.setAttribute('stroke', randomColor(true));
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

      // TODO make the return values more consistent once you figure out what you're trying to do
      return {
        innerX: x + strokeWidth,
        innerY: y + strokeWidth,
        innerW: width - 2 * strokeWidth,
      };
    };

    // fill the square defined by upper left hand corner (x,y) and width w
    // with a circle SVG. Units in pixels.
    const fillCircle = (x, y, w) => {
      let r = w / 2;
      const cx = x + r;
      const cy = y + r;
      const c = document.createElementNS(ns, 'circle');
      if (truePercent(0.5)) {
        const strokeWidth = Math.floor(Math.random() * r * 0.75);
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
      const textWidth = 0.6 * w;
      // t.setAttribute('x', x + (w - textWidth) / 2);
      // t.setAttribute('y', y + w / 2);
      t.setAttribute('x', x + w / 2);
      t.setAttribute('y', y + w / 2);
      t.setAttribute('textLength', textWidth);
      t.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'central');
      t.setAttribute('style', `font-size:${0.12 * w}px`);
      t.className.baseVal = 'text';
      const textNode = document.createTextNode('PUBLIC SERVICE');
      t.appendChild(textNode);
      svg.appendChild(t);
    };

    // Units in pixels
    const fillRandom = (x, y, w, basePercent) => {
      let squareResults = null;
      if (truePercent(0.95 * basePercent)) {
        squareResults = fillSquare(x, y, w);
      }
      if (truePercent(0.75 * basePercent)) {
        // If drawing circle within a square, ensure it's inside the square's border
        let [cx, cy, cw] = [x, y, w];
        if (squareResults) {
          const { innerX, innerY, innerW } = squareResults;
          [cx, cy, cw] = [innerX, innerY, innerW];
        }
        fillCircle(cx, cy, cw);
      }
    };

    // Recursive function to partition up space and draw shapes
    // x, y: top left corner coords of rectangular area
    // w: width (in grid cells)
    // h: height (in grid cells)
    // depth: recursion depth for debug logging
    const partition = (x, y, w, h, depth) => {
      if (DEBUG) {
        let indent = '';
        for (let i = 0; i < depth; i += 1) {
          indent += '  ';
        }
        console.debug(`${indent}[D${depth}] partition(x:${x}, y:${y}, w:${w}, h:${h})`);
      }

      // Convert grid cell dimensions to pixel dimensions
      const [xPx, yPx, wPx] = [x, y, w].map(e => e * cellW);

      // Base cases: single cell, empty, or multi-cell square
      if (w === 0 || h === 0) {
        return;
      }
      if (singleCell(w, h)) {
        fillRandom(xPx, yPx, wPx, 0.1);
        return;
      }
      if (depth > 0 && isSquare(w, h)) {
        fillRandom(xPx, yPx, wPx, 0.6);
        if (depth > 4 && !nameDrawn) {
          fillText(xPx, yPx, wPx);
          nameDrawn = true;
        }
        return;
      }

      // Recursive: Partition and recurse
      // Randomly partition rectangle into 4 rectangles
      const xPart = Math.floor(Math.random() * w);
      const yPart = Math.floor(Math.random() * h);

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
    const {
      viewW,
      viewH,
      padW,
      padH,
    } = this.state;
    return (
      <React.Fragment>
        <div id="drawing">
          <style jsx global>
            {
              `
                ${styles}
                body {
                  margin: 0;
                }
                #drawing {
                  width: ${viewW}px;
                  height: ${viewH}px;
                  margin: ${padH}px ${padW}px;
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

import { getInputLists } from "../utils/utils.js";

function getFrequencies(map) {
  const freqs = new Set();
  map = map.map((line) => line.trim());
  for (const line of map) {
    for (let c of line) {
      if (!freqs.has(c) && c !== ".") {
        freqs.add(c);
      }
    }
  }
  return freqs;
}

function getAntinodes(frequency, posX, posY, map) {
  let antinodes = [];
  const maxY = map.length;
  const maxX = map[0].length;
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      if (map[y][x] === frequency && x !== posX && y !== posY) {
        const antinodesAux = calcAntinode(
          { x: posX, y: posY },
          { x, y },
          maxX,
          maxY
        );
        //console.log(antinodesAux);
        antinodes.push(...antinodesAux);
      }
    }
  }
  return antinodes;
}

function calcAntinode(nodeA, nodeB, maxX, maxY) {
  const distY = nodeA.y - nodeB.y;
  const distX = nodeA.x - nodeB.x;
  let pointA = {};
  let pointB = {};
  const points = [];

  if ((distY === distX) === 0) {
    return points;
  }

  if (distY > 0) {
    // B está más arriba
    if (distX > 0) {
      // B está a la izquierda
      pointA = {
        x: nodeA.x + Math.abs(distX),
        y: nodeA.y + Math.abs(distY),
      };
      pointB = {
        x: nodeB.x - Math.abs(distX),
        y: nodeB.y - Math.abs(distY),
      };
    }
    if (distX < 0) {
      // B está a la derecha
      pointA = {
        x: nodeA.x - Math.abs(distX),
        y: nodeA.y + Math.abs(distY),
      };
      pointB = {
        x: nodeB.x + Math.abs(distX),
        y: nodeB.y - Math.abs(distY),
      };
    }
    if (distX === 0) {
      // B está en la vertical
      pointA = {
        x: nodeA.x,
        y: nodeA.y + Math.abs(distY),
      };
      pointB = {
        x: nodeB.x,
        y: nodeB.y - Math.abs(distY),
      };
    }
  } else if (distY < 0) {
    // A está más arriba
    if (distX > 0) {
      // B está a la izquierda
      pointA = {
        x: nodeA.x + Math.abs(distX),
        y: nodeA.y - Math.abs(distY),
      };
      pointB = {
        x: nodeB.x - Math.abs(distX),
        y: nodeB.y + Math.abs(distY),
      };
    }
    if (distX < 0) {
      // B está a la derecha
      pointA = {
        x: nodeA.x - Math.abs(distX),
        y: nodeA.y - Math.abs(distY),
      };
      pointB = {
        x: nodeB.x + Math.abs(distX),
        y: nodeB.y + Math.abs(distY),
      };
    }
    if (distX === 0) {
      // B está en la vertical
      pointA = {
        x: nodeA.x,
        y: nodeA.x - Math.abs(distY),
      };
      pointB = {
        x: nodeB.x,
        y: nodeB.y + Math.abs(distY),
      };
    }
  } else {
    // están en la horizontal
    pointA = {
      x: nodeA.x + Math.abs(distX),
      y: nodeA.y,
    };
    pointB = {
      x: nodeB.x - Math.abs(distX),
      y: nodeB.y,
    };
  }

  if (!(pointA.x >= maxX || pointA.x < 0 || pointA.y >= maxY || pointA.y < 0)) {
    points.push(pointA);
  }
  if (!(pointB.x >= maxX || pointB.x < 0 || pointB.y >= maxY || pointB.y < 0)) {
    points.push(pointB);
  }

  return points;
}

function main() {
  const file = getInputLists("./src/inputs-and-docs/day-08/input.txt");
  const freqs = getFrequencies(file);
  let antinodes = [];

  for (let frequency of freqs) {
    for (const [y, line] of file.entries()) {
      for (let x = 0; x < line.length; x++) {
        if (line[x] === frequency) {
          const antinodesAux = getAntinodes(frequency, x, y, file);
          antinodes.push(...antinodesAux);
        }
      }
    }
  }
  let newAntinodes = new Array(0);
  for (let i = 0; i < antinodes.length; i++) {
	if (!newAntinodes.some((n) => 
		n.x === antinodes[i].x && n.y === antinodes[i].y
	)) {
		newAntinodes.push(antinodes[i])
	}
  }
  console.log(newAntinodes.length);
}

main();

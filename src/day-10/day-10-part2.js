import { getInputLists } from "../utils/utils.js";

function findPeaks(map) {
  const peaks = [];
  for (let i = 0; i < map.length; i++) {
	for (let j = 0; j < map[i].length; j++) {
	  if (map[i][j] === 9) {
		peaks.push({ x: j, y: i });
	  }
	}
  }
  return peaks;
}

function findTrails(peaks, map) {
  const trails = [];
  for (let peak of peaks) {
	const trail = findTrail(peak, map, 9);
	if (trail !== -1) trails.push(...trail);
  }
  return trails;
}

function findTrail(peak, map, value) {
 // console.log(value, peak);
  const trails = [];
  if (value === 0) return [peak];
  else {
	const { x, y } = peak;
	// X bounds
	if (x < map[0].length - 1 && map[y][x + 1] === value - 1) {
	  const t = findTrail({ x: peak.x + 1, y }, map, value - 1);
	  if (t !== -1) trails.push(...t);
	}

	if (x > 0 && map[y][x - 1] === value - 1) {
	  const t = findTrail({ x: peak.x - 1, y }, map, value - 1);
	  if (t !== -1) trails.push(...t);
	}

	// Y bounds
	if (y < map.length - 1 && map[y + 1][x] === value - 1) {
	  const t = findTrail({ x, y: peak.y + 1 }, map, value - 1);
	  if (t !== -1) trails.push(...t);
	}
	if (y > 0 && map[y - 1][x] === value - 1) {
	  const t = findTrail({ x, y: peak.y - 1 }, map, value - 1);
	  if (t !== -1) trails.push(...t);
	}
	
	return trails.length > 0 ? trails : -1;
  }
}

function main() {
  const file = getInputLists("./src/inputs-and-docs/day-10/input.txt");
  const map = [];
  file.map((line) => {
	map.push(line.split("").map((x) => parseInt(x)));
  });
  const peaks = findPeaks(map);
  const trails = findTrails(peaks, map);
  console.log(trails.length);
}

console.time("execution time");
main();
console.timeEnd("execution time");

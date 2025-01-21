import { getFileArray } from "../utils/utils.js";

/*
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
*/
let lastPositionX = -1;
let lastPositionY = -1;

function updateMap(map, visitedPlaces) {
  const limitY = map.length;
  const limitX = map[0].length;
  switch (map[lastPositionY][lastPositionX]) {
    case "^":
      if (lastPositionY - 1 >= 0) {
        if (map[lastPositionY - 1][lastPositionX] === "#") {
          map[lastPositionY][lastPositionX] = ">";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionY--;
          map[lastPositionY][lastPositionX] = "^";
          visitedPlaces[lastPositionX][lastPositionY] = 1;
        }
      } else {
        return false;
      }
	  return map;
    case ">":
      if (lastPositionX + 1 < limitX) {
        if (map[lastPositionY][lastPositionX + 1] === "#") {
          map[lastPositionY][lastPositionX] = "v";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionX++;
          map[lastPositionY][lastPositionX] = ">";
          visitedPlaces[lastPositionX][lastPositionY] = 1;
        }
      } else {
        return false;
      }
	  return map;
    case "<":
      if (lastPositionX - 1 >= 0) {
        if (map[lastPositionY][lastPositionX - 1] === "#") {
          map[lastPositionY][lastPositionX] = "^";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionX--;
          map[lastPositionY][lastPositionX] = "<";
          visitedPlaces[lastPositionX][lastPositionY] = 1;
        }
      } else {
        return false;
      }
	  return map;
    case "v":
      if (lastPositionY + 1 < limitY) {
        if (map[lastPositionY + 1][lastPositionX] === "#") {
          map[lastPositionY][lastPositionX] = "<";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionY++;
          map[lastPositionY][lastPositionX] = "v";
          visitedPlaces[lastPositionX][lastPositionY] = 1;
        }
      } else {
        return false;
      }
	  return map;
  }
  return false;
}

function formatMapString (map) {
	let formattedMap = '';
	map.map((line) => {
		line.map(value => {
			formattedMap += value
		})
		formattedMap += '\n'
	})
	return formattedMap
}

function main() {
  let file = getFileArray("./src/inputs-and-docs/day-06/input.txt");
  

  let visitedPlaces = Array(file.length).fill(Array(file[0].length).fill(0));
  
  visitedPlaces = visitedPlaces.map((line, indexRow) => {
    const newLine = line.map((element, indexCol) => {
      const symbol = file[indexRow][indexCol];
      let returnValue = 0;
      if (
        symbol === "^" ||
        symbol === ">" ||
        symbol === ">" ||
        symbol === "v"
      ) {
        returnValue = 1;
        lastPositionX = indexCol;
        lastPositionY = indexRow;
      }
      return returnValue;
    });
    return newLine;
  });
  let updatedMap = file;
  while (updatedMap = updateMap(updatedMap, visitedPlaces)) {
    // console.log(formatMapString(updatedMap));
  }
  let sumVisitedPlaces = 0;
  visitedPlaces.map((line) => {
	line.map(value => {
		sumVisitedPlaces += value
	})
})

  console.log(sumVisitedPlaces);
}

main();

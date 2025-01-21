import { getFileArray, deepCopy } from "../utils/utils.js";

let lastPositionX = -1;
let lastPositionY = -1;

function updateMap(mapRef, visitedPlaces) {
  const map = deepCopy(mapRef);
  const limitY = map.length;
  const limitX = map[0].length;
  switch (map[lastPositionY][lastPositionX]) {
    case "^":
      if (lastPositionY - 1 >= 0) {
        if (
          map[lastPositionY - 1][lastPositionX] === "#" ||
          map[lastPositionY - 1][lastPositionX] === "O"
        ) {
          map[lastPositionY][lastPositionX] = ">";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionY--;
          map[lastPositionY][lastPositionX] = "^";
          visitedPlaces[lastPositionY][lastPositionX] = 1;
        }
      } else {
        return false;
      }
      return map;
    case ">":
      if (lastPositionX + 1 < limitX) {
        if (
          map[lastPositionY][lastPositionX + 1] === "#" ||
          map[lastPositionY][lastPositionX + 1] === "O"
        ) {
          map[lastPositionY][lastPositionX] = "v";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionX++;
          map[lastPositionY][lastPositionX] = ">";
          visitedPlaces[lastPositionY][lastPositionX] = 1;
        }
      } else {
        return false;
      }
      return map;
    case "<":
      if (lastPositionX - 1 >= 0) {
        if (
          map[lastPositionY][lastPositionX - 1] === "#" ||
          map[lastPositionY][lastPositionX - 1] === "O"
        ) {
          map[lastPositionY][lastPositionX] = "^";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionX--;
          map[lastPositionY][lastPositionX] = "<";
          visitedPlaces[lastPositionY][lastPositionX] = 1;
        }
      } else {
        return false;
      }
      return map;
    case "v":
      if (lastPositionY + 1 < limitY) {
        if (
          map[lastPositionY + 1][lastPositionX] === "#" ||
          map[lastPositionY + 1][lastPositionX] === "O"
        ) {
          map[lastPositionY][lastPositionX] = "<";
        } else {
          map[lastPositionY][lastPositionX] = ".";
          lastPositionY++;
          map[lastPositionY][lastPositionX] = "v";
          visitedPlaces[lastPositionY][lastPositionX] = 1;
        }
      } else {
        return false;
      }
      return map;
  }
  return false;
}

function formatMapString(map) {
  let formattedMap = "";
  map.map((line) => {
    line.map((value) => {
      formattedMap += value;
    });
    formattedMap += "\n";
  });
  return formattedMap;
}

function initVisitedPlaces(map) {
  const visitedPlaces = map.map((row, indexRow) =>
    row.map((symbol, indexCol) => {
      if ("^>v<".includes(symbol)) {
        lastPositionX = indexCol;
        lastPositionY = indexRow;
        return 1;
      }
      return 0;
    })
  );
  return visitedPlaces;
}

function getGuard(map) {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if ("^<v>".includes(map[row][col])) {
        return row + "-" + col + "-" + map[row][col]; // 40-25-^
      }
    }
  }
}

function itEndsWithLoop(map, row, col) {
  const visitedStates = new Set();
  let visitedPlaces = initVisitedPlaces(map);
  let updatedMap = deepCopy(map);
  let loopDetected = false;
  while (updatedMap) {
    const stateKey = getGuard(updatedMap);
    if (visitedStates.has(stateKey)) {
      loopDetected = true;
      updatedMap = false;
      return loopDetected;
    }
    visitedStates.add(stateKey);
    updatedMap = updateMap(updatedMap, visitedPlaces);
  }
  return loopDetected;
}

function main() {
  let file = getFileArray("./src/inputs-and-docs/day-06/input.txt");

  let visitedPlaces = initVisitedPlaces(file);

  let updatedMap = deepCopy(file);
  while ((updatedMap = updateMap(updatedMap, visitedPlaces))) {}
  let sumVisitedPlaces = 0;
  visitedPlaces.map((line) => {
    line.map((value) => {
      sumVisitedPlaces += value;
    });
  });

  let loopsDetected = 0;
  for (let row = 0; row < visitedPlaces.length; row++) {
    for (let col = 0; col < visitedPlaces[row].length; col++) {
      if (visitedPlaces[row][col] === 1) {
        var newMap = deepCopy(file);
        newMap[row][col] = "O";
        if (itEndsWithLoop(newMap, row, col)) {
          loopsDetected++;
          // console.log("LOOP DETECTADO " + loopsDetected);
        }
      }
    }
  }
  console.log(`Loops detectados: ${loopsDetected}`);
}

main();

import { getInputLists } from "../utils/utils.js";

let area = 0;
let perimeter = 0;
let result = 0;
let height = 0;
let width = 0;
const processed = [];
let currentSymbol = "";
const garden = getInputLists("./src/inputs-and-docs/day-12/input.txt");

function processPlot(row, col) {
  area = 1;
  perimeter = 0;
  if (processed[row][col]) {
    return;
  }
  currentSymbol = garden[row][col];
  processed[row][col] = true;
  tryNeighbour(row + 1, col);
  tryNeighbour(row - 1, col);
  tryNeighbour(row, col + 1);
  tryNeighbour(row, col - 1);
  result += area * perimeter;
}

function tryNeighbour(row, col) {
  if (row < 0 || col < 0 || row == height || col == width) {
    perimeter++;
    return;
  }
  if (garden[row][col] !== currentSymbol) {
    perimeter++;
    return;
  }
  if (processed[row][col]) {
    return;
  }
  processed[row][col] = true;
  area++;
  tryNeighbour(row + 1, col);
  tryNeighbour(row - 1, col);
  tryNeighbour(row, col + 1);
  tryNeighbour(row, col - 1);
}

function main() {
  height = garden.length;
  width = garden[0].length;

  for (const line of garden) {
    const newLine = [];
    processed.push(newLine);
    for (const symbol of line) {
      newLine.push(false);
    }
  }

  for (let row = 0; row < garden.length; row++) {
    for (let col = 0; col < garden[row].length; col++) {
      processPlot(row, col);
    }
  }

  console.log(`The result is ${result}`);
}

console.time("execution time");
main();
console.timeEnd("execution time");

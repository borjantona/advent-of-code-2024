import { getInputLists } from "./../utils/utils.js";

const file = getInputLists("./src/day-04/input.txt");

/*
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX*/

function searchXCoincidences(x, y) {
  let coincidences = 0;
  const maxX = file[y].length - 1;
  const maxY = file.length - 1;
  const maxWord = "XMAS".length - 1;
  //console.log(`X ${x} Y ${y}`);
  // DERECHA
  if (
    x <= maxX - maxWord &&
    file[y][x + 1] === "M" &&
    file[y][x + 2] === "A" &&
    file[y][x + 3] === "S"
  ) {
    //console.log(`X ${x} Y ${y} DERECHA`);
    coincidences++;
  }
  // IZQUIERDA
  if (
    x >= maxWord &&
    file[y][x - 1] === "M" &&
    file[y][x - 2] === "A" &&
    file[y][x - 3] === "S"
  ) {
    //console.log(`X ${x} Y ${y} IZQUIERDA`);
    coincidences++;
  }
  // ARRIBA
  if (
    y >= maxWord &&
    file[y - 1][x] === "M" &&
    file[y - 2][x] === "A" &&
    file[y - 3][x] === "S"
  ) {
    //console.log(`X ${x} Y ${y} ARRIBA`);
    coincidences++;
  }
  // ABAJO
  if (
    y <= maxY - maxWord &&
    file[y + 1][x] === "M" &&
    file[y + 2][x] === "A" &&
    file[y + 3][x] === "S"
  ) {
    //console.log(`X ${x} Y ${y} ABAJO`);
    coincidences++;
  }
  // DIAG ARRIBA DER
  if (
    x <= maxX - maxWord &&
    y >= maxWord &&
    file[y - 1][x + 1] === "M" &&
    file[y - 2][x + 2] === "A" &&
    file[y - 3][x + 3] === "S"
  ) {
    //console.log(`X ${x} Y ${y} DIAG ARRIBA DER`);
    coincidences++;
  }
  // DIAG ARRIBA IZQ
  if (
    x >= maxWord &&
    y >= maxWord &&
    file[y - 1][x - 1] === "M" &&
    file[y - 2][x - 2] === "A" &&
    file[y - 3][x - 3] === "S"
  ) {
    //console.log(`X ${x} Y ${y} DIAG ARRIBA IZQ`);
    coincidences++;
  }
  // DIAG ABAJO DER
  if (
    x <= maxX - maxWord &&
    y <= maxY - maxWord &&
    file[y + 1][x + 1] === "M" &&
    file[y + 2][x + 2] === "A" &&
    file[y + 3][x + 3] === "S"
  ) {
    //console.log(`X ${x} Y ${y} DIAG ABAJO DER`);
    coincidences++;
  }
  // DIAG ABAJO IZQ
  if (
    x >= maxWord &&
    y <= maxY - maxWord &&
    file[y + 1][x - 1] === "M" &&
    file[y + 2][x - 2] === "A" &&
    file[y + 3][x - 3] === "S"
  ) {
    //console.log(`X ${x} Y ${y} DIAG ABAJO IZQ`);
    coincidences++;
  }
  return coincidences;
}

function searchAxCoincidences(x, y) {
  let coincidences = 0;
  const maxX = file[y].length - 1;
  const maxY = file.length - 1;
  if (y > 0 && x > 0 && y < maxY && x < maxX) {
    if (
      file[y - 1][x + 1] === "S" &&
      file[y + 1][x + 1] === "S" &&
      file[y - 1][x - 1] === "M" &&
      file[y + 1][x - 1] === "M"
    ) {
      coincidences++;
    }
    if (
      file[y - 1][x + 1] === "M" &&
      file[y + 1][x + 1] === "M" &&
      file[y - 1][x - 1] === "S" &&
      file[y + 1][x - 1] === "S"
    ) {
      coincidences++;
    }
    if (
      file[y - 1][x + 1] === "S" &&
      file[y + 1][x + 1] === "M" &&
      file[y - 1][x - 1] === "S" &&
      file[y + 1][x - 1] === "M"
    ) {
      coincidences++;
    }
    if (
      file[y - 1][x + 1] === "M" &&
      file[y + 1][x + 1] === "S" &&
      file[y - 1][x - 1] === "M" &&
      file[y + 1][x - 1] === "S"
    ) {
      coincidences++;
    }
  }
  return coincidences;
}

function main() {
  let coincidences = 0;
  for (let y = 0; y < file.length; y++) {
    for (let x = 0; x < file[y].length; x++) {
      if (file[y][x] === "A") {
        coincidences += searchAxCoincidences(x, y);
      }
    }
  }
  console.log(coincidences);
}

main();

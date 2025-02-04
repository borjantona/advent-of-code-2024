import { getFile } from "../utils/utils.js";

function arrangeFiles(disk) {
  let resultDisk = [];
  let emptySpace = false;
  let index = 0;
  for (let i = 0; i < disk.length; i++) {
    const diskMapVar = parseInt(disk[i]);
    const newArr = emptySpace
      ? Array(diskMapVar).fill(".")
      : Array(diskMapVar).fill(index);
    resultDisk = [...resultDisk, ...newArr];
    if (emptySpace) index++;
    emptySpace = !emptySpace;
  }
  //console.log(resultDisk);
  return resultDisk;
}

function fragmentDisk(disk) {
  const newDisk = [...disk];
  for (let i = newDisk.length - 1; i >= 0; i--) {
    const diskMapVar = newDisk[i];
    //console.log(`DiskMapVar ${diskMapVar} Index ${i}`)
    if (diskMapVar === ".") continue;
    const firstEmpty = newDisk.findIndex((val) => val === ".");
    //console.log(`firstEmpty ${firstEmpty}`)
    //console.log(newDisk.join(''))
    if (firstEmpty > i) break;
    if (firstEmpty !== -1) {
      newDisk[firstEmpty] = diskMapVar;
      newDisk[i] = ".";
    }
  }
  return newDisk;
}

function checksum(disk) {
  let value = 0;
  let index = -1;
  for (const val of disk) {
    index++;
    if (val === ".") continue;
    value += val * index;
  }
  return value;
}

function main() {
  const disk = getFile("./src/inputs-and-docs/day-09/input.txt");
  const diskArranged = arrangeFiles(disk);
  const diskFragmented = fragmentDisk(diskArranged);
  console.log(checksum(diskFragmented));
}

main();

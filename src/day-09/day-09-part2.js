import { getFile } from "../utils/utils.js";

function arrangeFiles(disk) {
  let resultDisk = [];
  let emptySpace = false;
  let index = 0;

  for (let i = 0; i < disk.length; i++) {
    const diskMapVar = parseInt(disk[i]);
    const newArr = new Array(diskMapVar).fill(emptySpace ? "." : index);
    resultDisk.push(...newArr);
    if (emptySpace) index++;
    emptySpace = !emptySpace;
  }
  return resultDisk;
}

function fragmentDisk(disk) {
  let newDisk = disk.slice(); // Copia directa para evitar modificar el original
  const diskLength = newDisk.length;

  for (let i = diskLength - 1; i >= 0; i--) {
    const diskMapVar = newDisk[i];
    if (diskMapVar === ".") continue;

    const fileSize = getFileSize(diskMapVar, i, newDisk);
    const firstEmpty = newDisk.indexOf(".");

    if (firstEmpty !== -1) {
      const indexAvailable = isSpaceAvailable(firstEmpty, newDisk, fileSize, i);
      if (indexAvailable !== -1) {
        newDisk.fill(diskMapVar, indexAvailable, indexAvailable + fileSize);
        setEmptySpace(diskMapVar, newDisk, indexAvailable + fileSize);
      }
    }
  }
  return newDisk;
}

function isSpaceAvailable(start, disk, fileSize, end) {
  let indexAvailable = -1;
  for (let i = start; i <= end; i++) {
    if (disk[i] === ".") {
      const emptySpace = getEmptySpace(i, disk);
      if (emptySpace >= fileSize) {
        indexAvailable = i;
        break;
      }
    }
  }
  return indexAvailable;
}

function getFileSize(index, pos, disk) {
  let count = 0;
  let start = Math.max(0, pos - 10);
  let end = Math.min(disk.length, pos + 10);

  for (let i = start; i < end; i++) {
    if (disk[i] === index) count++;
  }
  return count;
}

function getEmptySpace(index, disk) {
  let count = 0;
  for (let i = index; i < disk.length && disk[i] === "."; i++) {
    count++;
    if (count > 10) break; // Limitar para evitar recorridos largos
  }
  return count;
}

function setEmptySpace(index, disk, start) {
  for (let i = start; i < disk.length; i++) {
    if (disk[i] === index) disk[i] = ".";
  }
}

function checksum(disk) {
  return disk.reduce((acc, val, idx) => (val === "." ? acc : acc + val * idx), 0);
}

function main() {
  const disk = getFile("./src/inputs-and-docs/day-09/input.txt");
  const diskArranged = arrangeFiles(disk);
  const diskFragmented = fragmentDisk(diskArranged);
  console.log(checksum(diskFragmented));
}

console.time("execution time")
main()
console.timeEnd("execution time") 
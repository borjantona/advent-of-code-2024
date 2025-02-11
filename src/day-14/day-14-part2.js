import { getInputLists } from "../utils/utils.js";

const robotFile = getInputLists("./src/inputs-and-docs/day-14/input.txt");
let result = 0;
const robots = [];
const width = 101;
const height = 103;
let minResult = 999999999999999;
let minResultIndex = 0;

function processRobot(robot) {
  const p = robot.split(" ")[0].split("=")[1].split(",");
  const v = robot.split(" ")[1].split("=")[1].split(",");

  return {
    p: { x: parseInt(p[0]), y: parseInt(p[1]) },
    v: { x: parseInt(v[0]), y: parseInt(v[1]) },
  };
}

function drawTree(robots) {
  const tree = Array.from({ length: height }, () => Array(width).fill("."));
  robots.forEach((robot) => {
    const value = tree[robot.p.y][robot.p.x];
    if (value === ".") {
      tree[robot.p.y][robot.p.x] = "1";
    } else {
      tree[robot.p.y][robot.p.x] = (parseInt(value) + 1).toString();
    }
  });
  console.log(tree.map((row) => row.join("")).join("\n"));
}

async function main() {
  robotFile.forEach((robot) => {
    const robotData = processRobot(robot);
    robots.push(robotData);
  });
  for (let i = 0; i < 7672; i++) {
    const cuadrantNW = [];
    const cuadrantNE = [];
    const cuadrantSW = [];
    const cuadrantSE = [];

    for (const robot of robots) {
      robot.p.x = (robot.v.x + robot.p.x) % width;
      robot.p.y = (robot.v.y + robot.p.y) % height;
      if (robot.p.x < 0) {
        robot.p.x += width;
      }
      if (robot.p.y < 0) {
        robot.p.y += height;
      }
      if (robot.p.x < width / 2 - 1 && robot.p.y < height / 2 - 1) {
        cuadrantNW.push(robot);
      } else if (robot.p.x > width / 2 && robot.p.y < height / 2 - 1) {
        cuadrantNE.push(robot);
      } else if (robot.p.x < width / 2 - 1 && robot.p.y > height / 2) {
        cuadrantSW.push(robot);
      } else if (robot.p.x > width / 2 && robot.p.y > height / 2) {
        cuadrantSE.push(robot);
      }
    }

    /*drawTree(robots);
    console.log(
      `--------------------------------- ${i} ---------------------------------`
    );*/

    result =
      cuadrantNW.length *
      cuadrantNE.length *
      cuadrantSW.length *
      cuadrantSE.length;
    if (result < minResult) {
      console.log(i);
      drawTree(robots);
      minResult = result;
      minResultIndex = i;
    }
  }

  console.log(`The result is ${minResult} at index ${minResultIndex}`);
}
// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.time("execution time");
await main();
console.timeEnd("execution time");

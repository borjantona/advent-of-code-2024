import { getInputLists } from "../utils/utils.js";

const robotFile = getInputLists("./src/inputs-and-docs/day-14/input.txt");
let result = 0;
const robots = [];
const width = 101;
const height = 103;

function processRobot(robot) {
	const p = robot.split(" ")[0].split("=")[1].split(",");
	const v = robot.split(" ")[1].split("=")[1].split(",");

	return { p: { x: parseInt(p[0]), y: parseInt(p[1]) }, v: { x: parseInt(v[0]), y: parseInt(v[1]) } }
}

function main() {
	robotFile.forEach(robot => {
		const robotData = processRobot(robot);
		robots.push(robotData);
	});

	robots.forEach(robot => {
		robot.p.x = (100*robot.v.x + robot.p.x) % width;
		robot.p.y = (100*robot.v.y + robot.p.y) % height;
		if (robot.p.x < 0) {
			robot.p.x += width;
		}
		if (robot.p.y < 0) {
			robot.p.y += height;
		}
	});

	const cuadrantNW = [];
	const cuadrantNE = [];
	const cuadrantSW = [];
	const cuadrantSE = [];

	robots.forEach(robot => {
		if (robot.p.x < (width / 2) - 1 && robot.p.y < (height / 2) - 1) {
			cuadrantNW.push(robot);
		} else if (robot.p.x > width / 2 && robot.p.y < (height / 2) - 1) {
			cuadrantNE.push(robot);
		} else if (robot.p.x < (width / 2) - 1 && robot.p.y > height / 2) {
			cuadrantSW.push(robot);
		} else if (robot.p.x > width / 2 && robot.p.y > height / 2) {
			cuadrantSE.push(robot);
		}
	});

	result = cuadrantNW.length * cuadrantNE.length * cuadrantSW.length * cuadrantSE.length;
	console.log(`The result is ${result}`);
}

console.time("execution time");
main();
console.timeEnd("execution time");

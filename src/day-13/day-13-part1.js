import { getFile } from "../utils/utils.js";

const prizeCoordinates = getFile("./src/inputs-and-docs/day-13/input.txt");
const aTokens = 3;
const bTokens = 1;
let result = 0;

function solveLinearSystem(a, b, target) {
  const D = a[0] * b[1] - a[1] * b[0];

  if (D === 0) {
    throw new Error("El sistema no tiene solución única");
  }

  const atimes = (target[0] * b[1] - target[1] * b[0]) / D;
  const btimes = (a[0] * target[1] - a[1] * target[0]) / D;

  return { atimes, btimes };
}

function extractCoordinates(text) {
    const regex = /Button A: X\+(\d+), Y\+(\d+)\s+Button B: X\+(\d+), Y\+(\d+)\s+Prize: X=(\d+), Y=(\d+)/g;
    let matches;
    const results = [];

    while ((matches = regex.exec(text)) !== null) {
        const [_, Ax, Ay, Bx, By, Px, Py] = matches.map(Number);
        results.push({ Ax, Ay, Bx, By, Px, Py });
    }

    return results;
}

function main() {
	const coords = extractCoordinates(prizeCoordinates);
	for (let i = 0; i < coords.length; i++) {
		const { Ax, Ay, Bx, By, Px, Py } = coords[i];

		try {
			const { atimes, btimes } = solveLinearSystem([Ax, Ay], [Bx, By], [Px, Py]);
			if (Number.isInteger(atimes) && atimes <= 100 && Number.isInteger(btimes) && btimes <= 100) {
				result += aTokens * atimes + bTokens * btimes;
			}

		} catch (e) {
			console.log(e);
		}
	}
	console.log(`The result is ${result}`);
}

console.time("execution time");
main();
console.timeEnd("execution time");

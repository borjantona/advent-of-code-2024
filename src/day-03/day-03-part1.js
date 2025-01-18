import { getFile } from "../utils/utils.js";

const FUNCTION_NAME = "mul";
const OPEN_PARENTHESIS = "(";
const CLOSE_PARENTHESIS = ")";

function cleanCorruptedData(file = "") {
  let index = 0;
  let startIndex = 0;
  let multiplication = 0;
  while (index >= 0) {
    index = file.indexOf(FUNCTION_NAME + OPEN_PARENTHESIS, startIndex);
    startIndex = index + 4;
	multiplication += analyzeString(file.substring(index, index+12));
  }
  return multiplication;
}

function analyzeString(string = "") {
	const closeParenthesisIndex = string.indexOf(CLOSE_PARENTHESIS);
	const posibleFn = string.substring(0,closeParenthesisIndex);
	const parameters = posibleFn.substring(4, posibleFn.length);
	const paramsSplit = parameters.split(',');
	if (paramsSplit.length !== 2) {
		return 0;
	} else {
		const left = paramsSplit[0];
		const right = paramsSplit[1];
		if (isNaN(left) || isNaN(right)) {
			return 0;
		} else {
			// console.log(`${string} parameters are ${left} and ${right}`)
			return left * right;
		}
	}

}

function main() {
  const file = getFile("./src/day-03/input.txt");
  console.log(cleanCorruptedData(file));
}

main();

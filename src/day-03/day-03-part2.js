import { getFile } from "../utils/utils.js";

const FUNCTION_MUL_NAME = "mul(";
const FUNCTION_DO_NAME = "do()";
const FUNCTION_DONT_NAME = "don't()";
const CLOSE_PARENTHESIS = ")";

function cleanCorruptedData(file = "") {
  let index = 0;
  let startIndex = 0;
  let doIndex = 0;
  let dontIndex = 0;
  let multiplication = 0;
  let shouldDo = true;
  while (index >= 0) {
    index = file.indexOf(FUNCTION_MUL_NAME, startIndex);
    doIndex = file.indexOf(FUNCTION_DO_NAME, startIndex);
    dontIndex = file.indexOf(FUNCTION_DONT_NAME, startIndex);

	let smallestIndex = Math.min(Math.min(index, doIndex), dontIndex);;

	if (doIndex === -1) {
		smallestIndex = Math.min(index, dontIndex);
	}
	if (dontIndex === -1) {
		smallestIndex = Math.min(index, doIndex);
	}
	if (doIndex === -1 && dontIndex === -1) {
		smallestIndex = index;
	}
    
	// console.log(`Between ${index}, ${doIndex} and ${dontIndex}, the smallest number is ${smallestIndex}`)

    if (doIndex === smallestIndex && doIndex !== -1) {
      shouldDo = true;
	  startIndex = smallestIndex + 4;
    } else if (dontIndex === smallestIndex) {
      shouldDo = false;
	  startIndex = smallestIndex + 6;
    } else {
      if (shouldDo) {
        multiplication += analyzeString(file.substring(index, index + 12));
      }
	  startIndex = smallestIndex + 4;
    }
    
  }
  return multiplication;
}

function analyzeString(string = "") {
  const closeParenthesisIndex = string.indexOf(CLOSE_PARENTHESIS);
  const posibleFn = string.substring(0, closeParenthesisIndex);
  const parameters = posibleFn.substring(4, posibleFn.length);
  const paramsSplit = parameters.split(",");
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
  const file = getFile("./src/inputs-and-docs/day-03/input.txt");
  console.log(cleanCorruptedData(file));
}

main();

import { getInputLists } from "../utils/utils.js";

/*
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
*/

const OPERATIONS = {
  SUM: "+",
  MULT: "*",
  OR: "||",
};

function checkMath(expectedResult, numbers, numberIndex, result, operation) {
  const number = numbers[numberIndex];
  const nextIndex = numberIndex + 1;
  let newResult = result;
  //console.log(number, nextIndex, newResult, operation)

  if (
    operation === OPERATIONS.SUM &&
    (newResult = result + number) > expectedResult
  ) {
    return false;
  } else if (
    operation === OPERATIONS.MULT &&
    (newResult = result * number) > expectedResult
  ) {
    return false;
  } else if (
    operation === OPERATIONS.OR &&
    (newResult = parseInt(result.toString() + number.toString())) >
      expectedResult
  ) {
    return false;
  }

  if (nextIndex == numbers.length) {
    return expectedResult == newResult;
  }

  switch (operation) {
    case OPERATIONS.SUM:
      if (
        checkMath(
          expectedResult,
          numbers,
          nextIndex,
          newResult,
          OPERATIONS.MULT
        )
      ) {
        return true;
      }
      if (
        checkMath(expectedResult, numbers, nextIndex, newResult, OPERATIONS.SUM)
      ) {
        return true;
      }
      if (
        checkMath(expectedResult, numbers, nextIndex, newResult, OPERATIONS.OR)
      ) {
        return true;
      }
      break;
    case OPERATIONS.MULT:
      if (
        checkMath(
          expectedResult,
          numbers,
          nextIndex,
          newResult,
          OPERATIONS.MULT
        )
      ) {
        return true;
      }
      if (
        checkMath(expectedResult, numbers, nextIndex, newResult, OPERATIONS.SUM)
      ) {
        return true;
      }
      if (
        checkMath(expectedResult, numbers, nextIndex, newResult, OPERATIONS.OR)
      ) {
        return true;
      }
      break;
    case OPERATIONS.OR:
      if (
        checkMath(
          expectedResult,
          numbers,
          nextIndex,
          newResult,
          OPERATIONS.MULT
        )
      ) {
        return true;
      }
      if (
        checkMath(expectedResult, numbers, nextIndex, newResult, OPERATIONS.SUM)
      ) {
        return true;
      }
      if (
        checkMath(expectedResult, numbers, nextIndex, newResult, OPERATIONS.OR)
      ) {
        return true;
      }
      break;
  }

  return false;
}

function checkMathDeep(target, operands, indexOfOperand, result, operator) {
  const operand = operands[indexOfOperand];

  if (operator == "+") {
    result += operand;
  } else if (operator == "*") {
    result *= operand;
  } else {
    result = parseInt(result.toString() + operand.toString());
  }

  if (result > target) {
    return false;
  }

  indexOfOperand += 1;

  if (indexOfOperand == operands.length) {
    return target == result;
  }

  if (checkMathDeep(target, operands, indexOfOperand, result, "+")) {
    return true;
  }
  if (checkMathDeep(target, operands, indexOfOperand, result, "*")) {
    return true;
  }
  if (checkMathDeep(target, operands, indexOfOperand, result, "||")) {
    return true;
  }

  return false;
}

function main() {
  const file = getInputLists("./src/inputs-and-docs/day-07/input.txt");
  let totalResult = 0;

  for (const line of file) {
    const [expectedResult, numbers] = line.split(":");
	const numbersArr = numbers
      .trim()
      .split(" ")
      .map((x) => +x);

    if (checkMath(expectedResult, numbersArr, 0, 0, OPERATIONS.SUM)) {
      totalResult += +expectedResult;
      continue;
    }
    if (checkMath(expectedResult, numbersArr, 0, 0, OPERATIONS.MULT)) {
      totalResult += +expectedResult;
      continue;
    }
    if (checkMath(expectedResult, numbersArr, 0, 0, OPERATIONS.OR)) {
      totalResult += +expectedResult;
      continue;
    }
  }
  console.log(+totalResult);
}

main();

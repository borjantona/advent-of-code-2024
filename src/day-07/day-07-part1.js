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

function* combinationN(array, n) {
  if (n === 1) {
    for (const a of array) {
      yield [a];
    }
    return;
  }

  for (let i = 0; i <= array.length - n; i++) {
    for (const c of combinationN(array.slice(i + 1), n - 1)) {
      yield [array[i], ...c];
    }
  }
}

function checkValidity(numbers, expectedResult) {
  let numMult = 1;
  let positions = [...Array(numbers.length - 1).keys()].map((x) => x); // [0 1 2] +1 => [1 2 3]
  if (numbers.reduce((acum, value) => +acum + value) === expectedResult) {
    return true;
  } else if (
    numbers.reduce((acum, value) => +acum * value) === expectedResult
  ) {
    return true;
  }
  while (numMult < numbers.length-1) {
    for (const posiblePos of combinationN(positions, numMult)) {
	  let acumm = 0;
	  for (const pos of positions) {
		let reduceAcum = numbers[pos];
		if (pos > 0) {
			reduceAcum = acumm;
		} 
		if (posiblePos.includes(pos)) {
			acumm = reduceAcum * numbers[pos+1]
		} else {
			acumm = reduceAcum + numbers[pos+1]
		}
	  }

	  if (acumm === +expectedResult) {
		return true;
	  }
    }
    numMult++;
  }

  return false;
}

function main() {
  const file = getInputLists("./src/inputs-and-docs/day-07/input.txt");
  let totalResult = 0;
  for (const line of file) {
    const [expectedResult, numbers] = line.split(":");
	//console.log(numbers);
    if (
      checkValidity(
        numbers
          .trim()
          .split(" ")
          .map((x) => +x),
        +expectedResult
      )
    ) {
      totalResult += +expectedResult;
    }
  }
  console.log(totalResult);
}

main();

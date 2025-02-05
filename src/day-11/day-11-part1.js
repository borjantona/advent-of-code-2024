import { getFile } from "../utils/utils.js";

function blink(stones) {
	const newStones = [];
	for (let i = 0; i < stones.length; i++) {
		newStones.push(...transformStone(stones[i]));
	}
	return newStones;
}

function transformStone(stone) {
	if (stone === '0') {
		return ['1'];
	} else if (stone.length % 2 === 0) {
		const left = parseInt(stone.substring(0, stone.length/2))
		const right = parseInt(stone.substring(stone.length/2, stone.length))
		return [left.toString(), right.toString()]
	} else {
		return [(parseInt(stone)*2024).toString()];
	}
}

function main() {
  const file = getFile("./src/inputs-and-docs/day-11/input.txt");

  const stones = file.split(" ");
	let newStones = [...stones];
  for (let i = 0; i < 25; i++) {
	newStones = blink(newStones)
  }
  console.log(newStones.length);
}

console.time("execution time");
main();
console.timeEnd("execution time");

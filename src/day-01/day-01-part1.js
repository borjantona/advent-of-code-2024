import { getInputLists } from "../utils/utils.js";

var locationsDistance = 0;
var locationsGroupOne = [];
var locationsGroupTwo = [];

const fileRows = getInputLists('./src/day-01/input.txt');

fileRows.map((row) => {
	const rowSplit = row.split("   ")
	locationsGroupOne.push(+rowSplit[0])
	locationsGroupTwo.push(+rowSplit[1]);
})

locationsGroupOne.sort()
locationsGroupTwo.sort()

for(let i = 0; i < locationsGroupOne.length; i++) {
	locationsDistance += Math.abs(locationsGroupOne[i] - locationsGroupTwo[i]);
}

console.log(locationsDistance)
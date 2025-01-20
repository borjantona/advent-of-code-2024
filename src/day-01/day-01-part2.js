import { getInputLists } from "../utils/utils.js";

var locationsSimilarity = 0;
var locationsGroupOne = [];
var locationsGroupTwo = [];

const fileRows = getInputLists('./src/inputs-and-docs/day-01/input.txt');

fileRows.map((row) => {
	const rowSplit = row.split("   ")
	locationsGroupOne.push(+rowSplit[0])
	locationsGroupTwo.push(+rowSplit[1]);
})

locationsGroupOne.sort()
locationsGroupTwo.sort()


for(let i = 0; i <  locationsGroupOne.length; i++) {
	const rowNumber = locationsGroupOne[i];
	let appearances = 0;
	
	const firstIndex = locationsGroupTwo.indexOf(rowNumber);
	if (firstIndex !== -1) {
		const lastIndex = locationsGroupTwo.lastIndexOf(rowNumber);
		appearances = (lastIndex - firstIndex + 1);
	}

	locationsSimilarity += rowNumber * appearances;
}

console.log(locationsSimilarity)
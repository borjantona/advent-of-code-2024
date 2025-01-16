const { readFileSync } = require("fs");

var locationsDistance = 0;
var locationsGroupOne = [];
var locationsGroupTwo = [];

var getInputLists = function () {
    var file = readFileSync('./input.txt', 'utf8');
	return file.split('\n');
};

const fileRows = getInputLists();

fileRows.map((row) => {
	const rowSplit = row.split("   ")
	locationsGroupOne.push(rowSplit[0])
	locationsGroupTwo.push(rowSplit[1]);
})

locationsGroupOne.sort((a,b) => a - b)
locationsGroupTwo.sort((a,b) => a - b)

for(let i = 0; i < locationsGroupOne.length; i++) {
	locationsDistance += Math.abs(locationsGroupOne[i] - locationsGroupTwo[i]);
}

console.log(locationsDistance)
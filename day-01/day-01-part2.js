const { readFileSync } = require("fs");

var locationsSimilarity = 0;
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


for(let i = 0; i < locationsGroupOne.length; i++) {
	const rowNumber = locationsGroupOne[i];
	let appearances = 0;
	for (let j = 0; j < locationsGroupTwo.length; j++) {
		if (+locationsGroupTwo[j] === +rowNumber) {
			appearances++;
		}
	}

	locationsSimilarity += rowNumber * appearances;
}

console.log(locationsSimilarity)
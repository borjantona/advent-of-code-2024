import { getInputLists } from "../utils/utils.js";

function isSafe(report, removedOneLevel = false) {
  let reportValues = report
    .trim()
    .split(" ")
    .map((x) => parseInt(x));

  if (reportValues.length === 0) {
    return false;
  }

  const trendIsDescendent = reportValues[0] > reportValues[1]; // true desc; false asc

  for (let i = 0; i < reportValues.length - 1; i++) {
    if (
      Math.abs(reportValues[i] - reportValues[i + 1]) > 3 ||
      reportValues[i] === reportValues[i + 1] ||
      trendIsDescendent !== reportValues[i] > reportValues[i + 1]
    ) {
      if (!removedOneLevel) {
		let wouldBeSafe = false;
		for (let j = 0; j < reportValues.length; j++) {
			const newArr = [...reportValues];
			newArr.splice(j, 1);
			wouldBeSafe ||= isSafe(newArr.join(" "), true)
		}
        return wouldBeSafe;
      }
      return false;
    }
  }
  return true;
}

function main() {
  const fileRows = getInputLists("./src/day-02/input.txt");

  let safeReports = 0;
  fileRows.map((report) => {
	const isSafeReport = isSafe(report)
    if (isSafeReport) safeReports++;
	// console.log(isSafe(report))
  });
  console.log(safeReports);
}

main();

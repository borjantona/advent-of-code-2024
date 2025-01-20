import { getInputLists } from "../utils/utils.js";

let pageRules = [];
let pagesToProduce = [];

function isValidBefore(value, compareValue) {
  // 75 47
  return !pageRules.includes(`${compareValue}|${value}`);
}
function isValidAfter(value, compareValue) {
  // 47 75
  return !pageRules.includes(`${value}|${compareValue}`);
}
function findMiddleValue(array) {
  //console.log(array);
  return +array[Math.floor(array.length / 2)];
}

function checkPageValid(pagesArray) {
  let validPages = true;
  for (let i = 0; i < pagesArray.length - 1; i++) {
    const page = pagesArray[i];

    /* CHECKS BEFORE */
    for (let j = i + 1; j < pagesArray.length; j++) {
      const pageToCompare = pagesArray[j];
      //console.log(`Is ${page} before ${pageToCompare}?: ${isValidBefore(page, pageToCompare)}`)
      //console.log(isValidBefore(page, pageToCompare));
      validPages &&= isValidBefore(page, pageToCompare);
    }
    /* CHECKS AFTER */
    for (let z = i - 1; z >= 0; z--) {
      const pageToCompare = pagesArray[z];
      //console.log(`Is ${page} after ${pageToCompare}?: ${isValidAfter(pageToCompare ,page)}`)
      validPages &&= isValidAfter(page, pageToCompare);
    }
  }
  return validPages;
}

function main() {
  const file = getInputLists("./src/inputs-and-docs/day05/input.txt");
  let sumMiddles = 0;
  let sumMiddlesInc = 0;
  pageRules = file.filter((val) => val.includes("|"));
  pagesToProduce = file.filter((val) => val.includes(","));

  for (let pages of pagesToProduce) {
    const pagesArray = pages.split(",");
    let validPages = checkPageValid(pagesArray);

    if (!validPages) {
		let arraySorted = [...pagesArray];
		while (!checkPageValid(arraySorted)) {
			arraySorted.sort((a, b) => { // compare returns -1 if a < b
				return (isValidAfter(a,b)) ? 1 : -1
			})
		}
		sumMiddlesInc += findMiddleValue(arraySorted);
    } else {
      sumMiddles += findMiddleValue(pagesArray);
    }
  }

  console.log(sumMiddles);
  console.log(sumMiddlesInc);
}

main();

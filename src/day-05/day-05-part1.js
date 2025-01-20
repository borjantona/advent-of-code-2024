import { getInputLists } from "../utils/utils.js";

let pageRules = [];
let pagesToProduce = [];

function isValidBefore(value, compareValue) { // 75 47
  return !pageRules.includes(`${compareValue}|${value}`);
}
function isValidAfter(value, compareValue) { // 47 75
  return !pageRules.includes(`${value}|${compareValue}`);
}
function findMiddleValue(array) {
  //console.log(array);
  return +array[Math.floor(array.length / 2)];
}

function main() {
  const file = getInputLists("./src/inputs-and-docs/day-05/input.txt");
  let sumMiddles = 0;
  pageRules = file.filter((val) => val.includes("|"));
  pagesToProduce = file.filter((val) => val.includes(","));

  for (let pages of pagesToProduce) {
    const pagesArray = pages.split(",");
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
    if (!validPages) continue;
    sumMiddles += findMiddleValue(pagesArray);
  }

  console.log(sumMiddles);
}

main();

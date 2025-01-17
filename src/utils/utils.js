import { readFileSync } from "fs";
import path from "path";

export const getInputLists = function (filepath) {
	const inputFilepath = path.resolve(filepath);
    const file = readFileSync(inputFilepath, 'utf8');
	return file.split('\n');
};
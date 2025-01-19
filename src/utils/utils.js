import { readFileSync } from "fs";
import path from "path";

export const getInputLists = function (filepath) {
	const inputFilepath = path.resolve(filepath);
    const file = readFileSync(inputFilepath, 'utf8');
	return file.trim().split('\n').map(x => x.trim());
};

export const getFile = function (filepath) {
	const inputFilepath = path.resolve(filepath);
	return readFileSync(inputFilepath, 'utf-8');
}
import { readFile } from "fs/promises";
import pretty = require("pretty");
import { compileFile } from "pug";

const getLocals = async (localsFile?: string) => {
  if (localsFile) {
    const buffer = await readFile(localsFile);
    return JSON.parse(buffer.toString());
  }

  return {};
};

export const pugc = async (inputFile: string, localsFile: string) => {
  try {
    const locals = await getLocals(localsFile);
    const pugOutput = compileFile(inputFile)(locals);
    const output = pretty(pugOutput);
    console.log(output);
  } catch (e: any) {
    console.error(e.message);
    process.exit(1);
  }
};

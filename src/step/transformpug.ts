import { compileFile } from "pug";
import { readFile, writeFile } from "fs/promises";
import pretty = require("pretty");

type TransformPugProps = {
  inputFile: string;
  outputFile: string;
  localsFile?: string;
};

const getLocals = async (localsFile?: string) => {
  if (localsFile) {
    const buffer = await readFile(localsFile);
    return JSON.parse(buffer.toString());
  }

  return {};
};

const description = (props: TransformPugProps) => {
  return `transformpug (localsFile: ${props.localsFile}, ${props.inputFile} -> ${props.outputFile})`;
};

const step = async (props: TransformPugProps) => {
  const locals = await getLocals(props.localsFile);
  const pugOutput = compileFile(props.inputFile)(locals);
  const output = pretty(pugOutput);
  return writeFile(props.outputFile, output);
};

export default { description, step };

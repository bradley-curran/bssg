import { compileFile } from "pug";
import { readFile, writeFile } from "fs/promises";

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
  return `transformpug (locals: ${props.localsFile}, ${props.inputFile} -> ${props.outputFile})`;
};

const step = async (props: TransformPugProps) => {
  const locals = getLocals(props.localsFile);
  const output = compileFile(props.inputFile)(locals);
  return writeFile(props.outputFile, output);
};

export default { description, step };

import { readFile, writeFile } from "fs/promises";
import { render } from "less";

type LessCProps = {
  inputFile: string;
  outputFile: string;
};

const description = (props: LessCProps) => {
  return `lessc (${props.inputFile} -> ${props.outputFile})`;
};

const step = async (props: LessCProps) => {
  const input = await readFile(props.inputFile);
  const output = await render(input.toString());
  return writeFile(props.outputFile, output.css);
};

export default { description, step };

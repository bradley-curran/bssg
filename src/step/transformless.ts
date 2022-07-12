import { readFile, writeFile } from "fs/promises";
import { render } from "less";

type TransformLessProps = {
  inputFile: string;
  outputFile: string;
};

const description = (props: TransformLessProps) => {
  return `transformless (${props.inputFile} -> ${props.outputFile})`;
};

const step = async (props: TransformLessProps) => {
  const input = await readFile(props.inputFile);
  const output = await render(input.toString());
  return writeFile(props.outputFile, output.css);
};

export default { description, step };

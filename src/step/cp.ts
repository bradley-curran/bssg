import { cp } from "fs/promises";

type CpProps = {
  inputFile: string;
  outputFile: string;
};

const description = (props: CpProps) => {
  return `cp (${props.inputFile} -> ${props.outputFile})`;
};

const step = async (props: CpProps) => {
  return cp(props.inputFile, props.outputFile);
};

export default { description, step };

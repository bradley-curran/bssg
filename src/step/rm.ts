import { rm } from "fs/promises";

type RmProps = {
  path: string;
};

const description = (props: RmProps) => {
  return `rm (${props.path})`;
};

const step = async (props: RmProps) => {
  return rm(props.path, { recursive: true, force: true });
};

export default { description, step };

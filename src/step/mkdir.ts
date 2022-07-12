import { mkdir } from "fs/promises";

type MkdirProps = {
  path: string;
};

const description = (props: MkdirProps) => {
  return `mkdir (${props.path})`;
};

const step = async (props: MkdirProps) => {
  return mkdir(props.path);
};

export default { description, step };

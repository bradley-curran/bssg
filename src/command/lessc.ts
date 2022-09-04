import { readFile } from "fs/promises";
import { render } from "less";

export const lessc = async (inputFile: string) => {
  try {
    const buf = await readFile(inputFile);
    const output = await render(buf.toString());
    console.log(output.css);
  } catch (e: any) {
    console.error(e.message);
    process.exit(1);
  }
};

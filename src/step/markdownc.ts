import { readFile, writeFile } from "fs/promises";
import unified = require("unified");
import remarkParse = require("remark-parse");
import remarkRehype = require("remark-rehype");
import rehypeStringify = require("rehype-stringify");
import { compileFile } from "pug";
import pretty = require("pretty");

type MarkdownCProps = {
  inputFile: string;
  outputFile: string;
  extends: string;
};

const description = (props: MarkdownCProps) => {
  return `markdownc (extends: ${props.extends}, ${props.inputFile} -> ${props.outputFile})`;
};

const step = async (props: MarkdownCProps) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify);

  const input = await readFile(props.inputFile);
  const converted = await processor.process(input.toString());
  const htmlOutput = converted.contents as string;
  const pugOutput = compileFile(props.extends)();
  const combinedOutput = pugOutput.replace("BLOCK_CONTENT", htmlOutput);
  const output = pretty(combinedOutput);
  return writeFile(props.outputFile, output);
};

export default { description, step };

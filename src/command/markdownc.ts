import { readFile } from "fs/promises";
import pretty = require("pretty");
import { compileFile } from "pug";
import remarkParse = require("remark-parse");
import remarkRehype = require("remark-rehype");
import rehypeStringify = require("rehype-stringify");
import unified = require("unified");

export const markdownc = async (inputFile: string, extendsFile: string) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify);

  const buf = await readFile(inputFile);
  const converted = await processor.process(buf.toString());
  const htmlOutput = converted.contents as string;

  if (extendsFile) {
    const pugOutput = compileFile(extendsFile)();
    const combinedOutput = pugOutput.replace("BLOCK_CONTENT", htmlOutput);
    const output = pretty(combinedOutput);
    console.log(output);
  } else {
    console.log(htmlOutput);
  }
};

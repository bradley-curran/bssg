#!/usr/bin/env node
import { readFileSync } from "fs";
import path = require("path/posix");
const program = require("commander");

import { lessc } from "./command/lessc";
import { markdownc } from "./command/markdownc";
import { pugc } from "./command/pugc";

const packageInfo = () => {
  const p = path.join(__dirname, "package.json");
  return JSON.parse(readFileSync(p).toString());
};

program
  .name("bssg")
  .description("Brad's Static Website Generator")
  .version(packageInfo().version);

program
  .command("lessc")
  .description("compile a less file")
  .argument("<input-file>", "less file to compile")
  .action(lessc);

program
  .command("markdownc")
  .description("compile a markdown file")
  .argument("<input-file>", "pug file to inject content into")
  .argument("[extends-file]", "pug file to extend from")
  .action(markdownc);

program
  .command("pugc")
  .description("compile a pug file")
  .argument("<input-file>", "pug file to inject content into")
  .argument("[locals-file]", "JSON file for locals")
  .action(pugc);

program.parse();

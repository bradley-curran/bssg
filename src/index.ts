#!/usr/bin/env node
import { readFile } from "fs/promises";
import * as toml from "toml";

import cp from "./step/cp";
import mkdir from "./step/mkdir";
import rm from "./step/rm";
import transformless from "./step/transformless";
import transformmarkdown from "./step/transformmarkdown";
import transformpug from "./step/transformpug";

const steps: any = {
  cp,
  mkdir,
  rm,
  transformless,
  transformmarkdown,
  transformpug,
};

const getBuildConfig = async () => {
  const buf = await readFile("bssg.toml");
  const parsed = toml.parse(buf.toString());
  const result = JSON.parse(JSON.stringify(parsed));

  if (!result.hasOwnProperty("bssg")) {
    throw new Error("bssg.toml does not have a 'bssg' top-level key");
  }

  return result;
};

const processBuildConfig = async (buildConfig: any) => {
  for (const buildStep of buildConfig.build.steps) {
    const step = steps[buildStep.step];
    console.log(`start: ${step.description(buildStep)}`);
    await step.step(buildStep);
    console.log(`done:  ${step.description(buildStep)}`);
  }

  console.log("bssg build complete");
};

getBuildConfig()
  .then(processBuildConfig)
  .catch((e) => console.log(e));

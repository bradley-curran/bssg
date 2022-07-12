#!/usr/bin/env node
import { readFile } from "fs/promises";

import cp from "./step/cp";
import mkdir from "./step/mkdir";
import rm from "./step/rm";
import transformless from "./step/transformless";
import transformpug from "./step/transformpug";

const steps: any = {
  cp,
  mkdir,
  rm,
  transformless,
  transformpug,
};

const getBuildConfig = async () => {
  const buffer = await readFile("bssg.json");
  return JSON.parse(buffer.toString());
};

const processBuildConfig = async (buildConfig: any) => {
  for (const buildStep of buildConfig.buildSteps) {
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

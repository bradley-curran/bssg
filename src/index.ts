#!/usr/bin/env node
import { readFile } from "fs/promises";
import * as toml from "toml";

import cp from "./step/cp";
import mkdir from "./step/mkdir";
import rm from "./step/rm";
import steplist from "./step/steplist";
import lessc from "./step/lessc";
import markdownc from "./step/markdownc";
import pugc from "./step/pugc";

const steps: any = {
  cp,
  lessc,
  markdownc,
  mkdir,
  pugc,
  rm,
  steplist,
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
  const runStep = async (stepName: string) => {
    const stepConfig = buildConfig[stepName];

    if (stepConfig === undefined) {
      throw new Error(`Could not find step '${stepName}'`);
    }

    const step = steps[stepConfig.step];
    console.log(`${stepName}: ${step.description(stepConfig)}`);
    await step.step(stepConfig, runStep);
  };

  await runStep("build");

  console.log("bssg build complete");
};

getBuildConfig()
  .then(processBuildConfig)
  .catch((e) => console.log(e.message));

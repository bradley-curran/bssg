type StepListProps = {
  steps: string[];
};

const description = (props: StepListProps) => {
  return `steplist (${props.steps})`;
};

const step = async (
  props: StepListProps,
  runStep: (stepName: string) => any
) => {
  for (const stepName of props.steps) {
    await runStep(stepName);
  }
};

export default { description, step };

import { useState } from "react";
import { Button, Group, Stepper, Textarea } from "@mantine/core";

export const StepperComponent = () => {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" mt={"xl"}>
        <Stepper.Step label="Encode" description="Encode your content">
          Step 1: Encode content
          <Textarea placeholder="Some content" label="Content" withAsterisk minRows={4} />
        </Stepper.Step>
        <Stepper.Step label="Collect" description="Collect bruh">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Publish" description="Publish content">
          Step 3 content: Get full access
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        <Button variant="outline" onClick={nextStep}>
          Next step
        </Button>
      </Group>
    </>
  );
};

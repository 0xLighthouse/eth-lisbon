import { useState } from "react";
import Head from "next/head";
import { Container } from "@mantine/core";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { StepperComponent } from "~~/components/Stepper";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Create: NextPage = () => {
  const account = useAccount();
  const [active, setActive] = useState(0);
  const nextStep = () => setActive(current => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  return (
    <>
      <Head>
        <title>ETHGlobal Lisbon 2023</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>
      <Container sx={{ width: "60%" }} mt={"lg"}>
        {account.address ? (
          <>
            <StepperComponent
              nextStep={nextStep}
              prevStep={prevStep}
              active={active}
              setActive={() => setActive(active)}
            />
          </>
        ) : (
          <RainbowKitCustomConnectButton />
        )}
      </Container>
    </>
  );
};

export default Create;

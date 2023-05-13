import { useState } from "react";
import Head from "next/head";
import { Avatar, Box, Card, Container, Flex, Group, Tabs, Text } from "@mantine/core";
import { IconCloudLockOpen, IconNewSection } from "@tabler/icons-react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { AddNewAdress } from "~~/components/AddAddressModal";
import { DropdownMenu } from "~~/components/Drodown";
import { StepperComponent } from "~~/components/Stepper";



const Home: NextPage = () => {
  const account = useAccount();
  const [isOpenedModal, setIsOpenedModal] = useState(false);

  return (
    <>
      <Head>
        <title>Scaffold-ETH 2 App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth-2" />
      </Head>
      <Container size={"xxl"} py={"xl"}>
        <Tabs defaultValue="gallery" fz="lg">
          <Tabs.List>
            <Tabs.Tab value="gallery" fz={"md"} icon={<IconNewSection size="1.4rem" />}>
              Create
            </Tabs.Tab>
            <Tabs.Tab value="messages" fz={"md"} icon={<IconCloudLockOpen size="1.4rem" />}>
              Verify
            </Tabs.Tab>
          </Tabs.List>

          {/* -------------------Create -------------------*/}
          <Tabs.Panel value="gallery" pt="xs">
            {/* List of addresses */}
            <Group align="start">
              <Flex direction={"column"} gap={"xs"}>
                <Card p={"md"} shadow="sm" sx={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                  <Flex direction={"row"} align={"center"} gap={"sm"}>
                    <Avatar src={`https://cdn.stamp.fyi/avatar/${account.address}`} size={"sm"} />
                    <Text size={"sm"}>{account.address}</Text>
                  </Flex>

                  <Flex direction={"row"} align={"center"} gap={"sm"}>
                    <Avatar src={`https://cdn.stamp.fyi/avatar/${account.address}`} size={"sm"} />
                    <Text size={"sm"}>{account.address}</Text>
                  </Flex>

                  <Flex direction={"row"} align={"center"} gap={"sm"}>
                    <Avatar src={`https://cdn.stamp.fyi/avatar/${account.address}`} size={"sm"} />
                    <Text size={"sm"}>{account.address}</Text>
                  </Flex>
                </Card>
              </Flex>

              {/* Authors add new  */}
              <Flex direction={"column"}>
                <Text size={"sm"}>Authors</Text>
                <DropdownMenu onClick={() => setIsOpenedModal(true)} />
              </Flex>
            </Group>
            <Box></Box>
            <StepperComponent />
          </Tabs.Panel>

          {/* -------------------Verify -------------------*/}

          <Tabs.Panel value="messages" pt="xs">
            Messages tab content
          </Tabs.Panel>
        </Tabs>
        <AddNewAdress isOpened={isOpenedModal} onClose={() => setIsOpenedModal(false)} />
      </Container>
    </>
  );
};

export default Home;

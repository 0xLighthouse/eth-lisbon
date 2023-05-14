import { useState } from "react";
import { useRouter } from "next/router";
import VerifyItem from "./VerifyItem";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  CopyButton,
  Flex,
  Grid,
  Group,
  Loader,
  Stepper,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { isAddress } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";

interface Props {
  active: number;
  nextStep: () => void;
  prevStep: () => void;
  setActive: any;
}
export const StepperComponent: React.FC<Props> = ({ active, nextStep, prevStep, setActive }) => {
  const account = useAccount();
  const [isShown, setIsShown] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [bodyValue, setBodyValue] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [authorsList, setAuthorsList] = useState([{ address: account.address, name: "" }]);
  const [name, setName] = useState("");
  const [createdAnnouncement, setCreatedAnnouncement] = useState("");
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();

  const [isPublished, setPublished] = useState(false);

  const shortenString = (str: string) => {
    const length = str.length;
    const firstFive = str.slice(0, 7);
    const lastFive = str.slice(length - 7, length);
    return `${firstFive}.....${lastFive}`;
  };

  const handleNext = () => {
    if (active == 1) {
      handleCreate();
    }
    if (active == 3) {
      handlePublish();
    }
    nextStep();
  };

  const handlePublish = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/publish`, {
      method: "POST",
      body: JSON.stringify({ id: titleValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPublished(true);
  };

  const handleCreate = async () => {
    const requestBody = {
      authors: authorsList,
      titleValue,
      bodyValue,
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/create`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data) {
      setCreatedAnnouncement(data.name);
    }
    setTitleValue(data.name);
  };

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm" mt={"sm"} size="sm">
        <Stepper.Step label="Publish" description="Any arbitrary content (Soon)">
          {/* <TextInput
            label="Title"
            placeholder="Announcement title"
            withAsterisk
            value={titleValue}
            onChange={e => setTitleValue(e.currentTarget.value)}
          /> */}
          <Textarea
            placeholder="WAGMI, ETHGlobal!"
            label="Your content"
            withAsterisk
            minRows={8}
            mt="xs"
            value={bodyValue}
            onChange={e => setBodyValue(e.currentTarget.value)}
          />
        </Stepper.Step>
        <Stepper.Step label="Sign" description="SomeRegistry.sol">
          <Grid mt={"sm"}>
            <Grid.Col span={7}>
              <Card withBorder sx={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <Text size={`md`}>{bodyValue}</Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={5}>
              <Flex direction={"column"} gap={"xs"}>
                {authorsList.map(auth => (
                  <Flex direction="column" key={auth.address} mb={`md`}>
                    <Flex direction={"row"} align={"center"} gap={"sm"} key={auth.address}>
                      <Avatar src={`https://cdn.stamp.fyi/avatar/${auth}`} size={"sm"} />
                      <Text size={"sm"}>{shortenString(auth.address)}</Text>
                    </Flex>
                    <Text size={`xs`} transform={`uppercase`}>
                      {auth.name}
                    </Text>
                  </Flex>
                ))}

                <Flex direction={"column"} align={"start"} gap={"sm"}>
                  {isShown && (
                    <>
                      <TextInput
                        size="sm"
                        fz={"sm"}
                        miw={"100%"}
                        label="Address"
                        onChange={e => setNewAddress(e.currentTarget.value)}
                        error={!isAddress(newAddress) && "Not a valid address"}
                        value={newAddress}
                      />
                      <Group align="end">
                        <TextInput
                          size="sm"
                          fz={"sm"}
                          miw={"60%"}
                          label="Name"
                          onChange={e => setName(e.currentTarget.value)}
                          value={name}
                        />
                        <Button
                          variant="default"
                          disabled={!isAddress(newAddress)}
                          onClick={() => {
                            setAuthorsList(prevNames => [...prevNames, { address: newAddress, name: name }]);
                            setIsShown(false);
                          }}
                        >
                          Save
                        </Button>
                      </Group>
                    </>
                  )}
                  {!isShown && (
                    <Button
                      variant="default"
                      onClick={() => {
                        setName("");
                        setNewAddress("");
                        setIsShown(true);
                      }}
                    >
                      Add address
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Grid.Col>
          </Grid>
        </Stepper.Step>
        <Stepper.Step label="Publish" description="Post your content">
          {createdAnnouncement !== "" ? (
            <>
              <Center sx={{ flexDirection: "column" }} p={`lg`}>
                <Text size={`md`} style={{ textAlign: "center" }}>
                  Your content is ready to be signed. Share the following URL with your signers.
                </Text>
                <br />
                <Badge size={`xl`}>{`${process.env.NEXT_PUBLIC_APP_URI}/${createdAnnouncement}/sign`}</Badge>
                <br />
                <CopyButton value={`${process.env.NEXT_PUBLIC_APP_URI}/${createdAnnouncement}/sign`}>
                  {({ copied, copy }) => (
                    <Button color={copied ? "teal" : "blue"} variant="outline" onClick={copy} uppercase>
                      {copied ? "Copied url" : "Copy url"}
                    </Button>
                  )}
                </CopyButton>
              </Center>
            </>
          ) : (
            <Loader />
          )}
        </Stepper.Step>
        <Stepper.Completed>
          <VerifyItem id={titleValue} setIsValid={setIsValid} s={undefined} />
        </Stepper.Completed>
      </Stepper>

      <Group position="center" m={`lg`}>
        {!isPublished && (
          <Button
            variant={"light"}
            onClick={handleNext}
            disabled={(active == 0 && !bodyValue) || (active == 3 && !isValid)}
            size={"md"}
            uppercase
          >
            {active == 3 && !isPublished ? "Publish" : active == 3 && !isPublished ? "Published" : "Next"}
          </Button>
        )}
        {isPublished && (
          <Button variant="outline" onClick={() => router.push("/")}>
            Go to feed
          </Button>
        )}
      </Group>
    </>
  );
};

import { useEffect, useState } from "react";
import { createSignaturiMessage, verifySignaturiMessage } from "../lib/signaturi";
import { Badge, Button, Card, Grid, Group, List, Loader, Text, Title, Tooltip } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed, IconCircleXFilled } from "@tabler/icons-react";
import { Result } from "~~/lib/signaturi/types";

interface VerifyItemProps {
  id: string;
  setIsValid: (v: boolean) => void;
  s;
}

function VerifyItem({ id, setIsValid }: VerifyItemProps) {
  const [item, setItem] = useState<any>(null);
  const [verifyResult, setVerifyResult] = useState<Result>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/items?id=${id}`);
      const data = await res.json();
      console.log("Setting item=", data.data);
      setItem(data.data);
    };

    if (id) {
      fetchData();
    }
  }, [id, reload]);

  useEffect(() => {
    if (item) {
      const { authors, content } = item;
      console.log(JSON.stringify(authors, null, 4));
      const signers = authors.map(({ signature, address, name }) => ({
        account: address,
        name: name ?? "",
      }));
      const signatures = authors.map(a => a.signature ?? null);
      const message = {
        content: content,
        accounts: signers,
      };
      const signaturiMessage = createSignaturiMessage(message, signatures);
      const verifyResult = verifySignaturiMessage(signaturiMessage);
      console.log("verifyResult");
      console.log(verifyResult);
      setVerifyResult(verifyResult);
      setIsValid(verifyResult.isValid);
    }
  }, [item]);

  if (!item) {
    return (
      <div>
        Loading item... <Loader />
      </div>
    );
  } else if (!verifyResult) {
    return <div>Verifying...</div>;
  }

  return (
    <Grid mt={"md"}>
      <Grid.Col span={4}>
        <Text size={"md"}>{item.content} </Text>
        <Grid>
          <Grid.Col span={"auto"}>
            <Badge mt={"sm"} size={"lg"} color={verifyResult.isValid ? "blue" : "red"}>
              {verifyResult.isValid ? "Ready for publishing" : "Not verified"}
            </Badge>
          </Grid.Col>
        </Grid>
        <Button variant="outline" onClick={() => setReload(!reload)} mt="md">
          Reload
        </Button>
      </Grid.Col>
      <Grid.Col span={"auto"} ml={"sm"}>
        <Grid>
          <Grid.Col span={"auto"}>
            <List>
              <SignatureResultz verifyResult={verifyResult} item={item} />
            </List>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
}

interface SignatureResultProps {
  verifyResult: any;
  item: any;
}

const SignatureResultz = ({ verifyResult, item }: SignatureResultProps) => {
  return (
    <Card shadow="xs" withBorder radius={"lg"}>
      {item.authors.map((a, i) => (
        <Group key={i} mt={"xs"}>
          <List.Item
            fz={"sm"}
            icon={
              verifyResult.signatures[i].result === "good" ? (
                <IconCircleCheck color="green" size={"2.3rem"} />
              ) : verifyResult.signatures[i].result === "bad" ? (
                <IconCircleXFilled color="red" size={"2.3rem"} />
              ) : (
                <Tooltip label="Missing signature">
                  <IconCircleDashed size={"2.3rem"} />
                </Tooltip>
              )
            }
          >
            {a.address}
          </List.Item>
        </Group>
      ))}
    </Card>
  );
};

export default VerifyItem;

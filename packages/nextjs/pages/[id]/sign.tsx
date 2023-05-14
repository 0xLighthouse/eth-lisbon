import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { encodeMessage } from "../../lib/signaturi";
import { Button, Center, Container, Grid, Text } from "@mantine/core";
import { IconShieldCheckered } from "@tabler/icons-react";
import { signTypedData } from "@wagmi/core";
import { useAccount } from "wagmi";

function ItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [signPayload, setSignPayload] = useState(null);
  const [item, setItem] = useState(null);

  const account = useAccount();
  const [isSigned, setIsSigned] = useState(false);

  /**
   * Save the signature to the databasegs
   *
   */
  const handleSignedType = async () => {
    signPayload.domain.chainId = 1;
    signPayload.value = signPayload.message;
    const signature = await signTypedData(signPayload);
    // TODO: send signature to API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/collect-signature`, {
      method: "POST",
      body: JSON.stringify({
        id: router.query.id,
        account: account.address,
        signature,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setIsSigned(true);

    console.log(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/items?id=${id}`);
      const data = await res.json();
      console.log(data);
      setItem(data.data);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (item && item.authors && item.content) {
      const authorAddress = item.authors.map(author => ({ name: author.name, account: author.address }));
      const message = {
        content: item.content,
        accounts: authorAddress,
      };
      const encodedMessage = encodeMessage(message);
      setSignPayload(encodedMessage);
    }
  }, [item]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Grid mt="lg">
        <Grid.Col span={4}>
          <Text size={"md"}>Title</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size={"sm"}>{item.title}</Text>
        </Grid.Col>
      </Grid>

      <Grid mt={"sm"}>
        <Grid.Col span={4}>
          <Text size={"md"}>Content</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text size={"sm"}>{item.content}</Text>
        </Grid.Col>
      </Grid>
      <Grid mt={"sm"}>
        <Grid.Col span={4}>
          <Text size={"md"}>Authors</Text>
        </Grid.Col>
        <Grid.Col span={8}>
          {item.authors.map((auth, i) => (
            <Text size={"sm"} key={i}>
              {auth.address}
            </Text>
          ))}
        </Grid.Col>
      </Grid>
      <Center>
        <Button
          variant="outline"
          color={isSigned ? "green" : "blue"}
          mt={"lg"}
          rightIcon={isSigned && <IconShieldCheckered />}
          onClick={() => handleSignedType()}
        >
          {isSigned ? "Signed" : "Sign"}
        </Button>
      </Center>
    </Container>
  );
}

export default ItemPage;

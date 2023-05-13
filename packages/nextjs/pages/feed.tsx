import { Avatar, Badge, Card, Container, Flex, Grid, Group, Text, Title } from "@mantine/core";

const FeedPage = () => {
  const feedItems = [
    {
      id: 1,
      address: "0x1234",
      title: "Welcome team 1",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum autem asperiores ",
      status: "signed",
      authors: [
        { signature: "1234", accountAddress: "0x0x1", source: "Metamask", status: "Signed" },
        { signature: "12345", accountAddress: "0x0x2", source: "Safe", status: "Not signed" },
        { signature: "12346", accountAddress: "0x0x3", source: "Ledger", status: "Signed" },
      ],
    },
    {
      id: 2,
      address: "0x12345",
      title: "Welcome team 2",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum autem asperiores ",
      status: "declined",
      authors: [
        { signature: "a1", accountAddress: "0x0x1", source: "Metamask", status: "Not signed" },
        { signature: "a2", accountAddress: "0x0x2", source: "Safe", status: "Not signed" },
        { signature: "a3", accountAddress: "0x0x3", source: "Ledger", status: "Signed" },
      ],
    },
    {
      id: 3,
      address: "0x123456",
      title: "Welcome team 3",
      status: "signed",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum autem asperiores ",
      authors: [
        { signature: "b1", accountAddress: "0x1x1", source: "Metamask", status: "Signed" },
        { signature: "b2", accountAddress: "0x1x2", source: "Safe", status: "Not signed" },
        { signature: "b3", accountAddress: "0x1x3", source: "Ledger", status: "Signed" },
      ],
    },
    {
      id: 4,
      address: "0x123456",
      title: "Welcome team 4",
      status: "pending",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum autem asperiores ",
      authors: [
        { signature: "b1", accountAddress: "0x1x1", source: "Metamask", status: "Signed" },
        { signature: "b2", accountAddress: "0x1x2", source: "Safe", status: "Not signed" },
        { signature: "b3", accountAddress: "0x1x3", source: "Ledger", status: "Signed" },
      ],
    },
  ];

  return (
    <Container>
      <Title order={4}>Feed</Title>
      <Grid>
        {feedItems.map(item => (
          <Grid.Col key={item.id} span={6} mt={"sm"}>
            <Card shadow="md">
              <Flex direction={"column"} gap={"sm"}>
                <Group>
                  <Text size={"md"} sx={{ lineHeight: 1 }}>
                    {item.title}
                  </Text>
                  <Badge color={item.status == "signed" ? "green" : item.status == "pending" ? "yellow" : "red"}>
                    {item.status}
                  </Badge>
                </Group>
                <Text size={"sm"}>{item.content}</Text>
                <Group spacing={"xs"}>
                  {item.authors.map(author => (
                    <Avatar
                      key={author.accountAddress}
                      src={`https://cdn.stamp.fyi/avatar/${item.address}`}
                      size={"md"}
                      radius={"xl"}
                      sx={{ border: author.status == "Signed" ? "3px solid #00fa03" : "3px solid red" }}
                    />
                  ))}
                </Group>
                <Text>{item.address}</Text>
              </Flex>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default FeedPage;

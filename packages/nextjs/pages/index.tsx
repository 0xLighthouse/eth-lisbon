import { Avatar, Badge, Box, Card, Container, Flex, Group, Text, Title } from "@mantine/core";
import { GetServerSideProps } from "next";
import { timeAgo } from "~~/utils/scaffold-eth/timeAgo";

const Home = ({ feedItems }) => {
  return (
    <Container>
      <Title order={3}>Feed list</Title>
      <Flex direction={"column"} gap={"xl"}>
        {feedItems
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(item => (
            <Flex direction={"row"} key={item.id} mt="sm" gap={"sm"} sx={{ position: "relative" }}>
              <Flex direction={"column"} miw={"30%"} sx={{ textAlign: "end" }} mt={"sm"}>
                <Text size={"sm"} sx={{ lineHeight: 1 }}>
                  {item.title}
                </Text>
                <Text size={"xs"}>{timeAgo(item.created_at)}</Text>
              </Flex>

              <Card shadow="xs" miw={"100%"}>
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
                        key={author.address}
                        src={`https://cdn.stamp.fyi/avatar/${author.address}`}
                        size={"md"}
                        radius={"xl"}
                        sx={{
                          border: author.status == "Signed" ? "3px solid #00fa03" : "3px solid red",
                        }}
                      />
                    ))}
                  </Group>
                  <Text>{item.address}</Text>
                </Flex>
              </Card>
              <Box sx={{ position: "absolute" }}></Box>
            </Flex>
          ))}
      </Flex>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/feed`);
  const data = await res.json();
  console.log(data);

  // Return the data as props
  return { props: { feedItems: data.data } };
};

export default Home;

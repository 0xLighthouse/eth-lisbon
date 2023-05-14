import Link from "next/link";
import { Avatar, Badge, Box, Card, Container, Flex, Group, Text, Title, Tooltip } from "@mantine/core";
import { GetServerSideProps } from "next";
import { timeAgo } from "~~/utils/scaffold-eth/timeAgo";

const Home = ({ feedItems }) => {
  return (
    <Container w={"70%"}>
      <Title order={4} my={"lg"}>
        Feed list
      </Title>
      <Flex direction={"column"} gap={"lg"}>
        {feedItems
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map(item => (
            <Flex direction={"row"} key={item.id} mt="xs" gap={"md"} sx={{ position: "relative" }}>
              <Flex direction={"column"} miw={"30%"} sx={{ textAlign: "start" }} mt={"sm"} gap={"sm"} align={"start"}>
                <Link href={`${process.env.NEXT_PUBLIC_APP_URI}/${item.title}`}>
                  <Text size={"sm"} sx={{ lineHeight: 1 }} underline>
                    {item.title}
                  </Text>
                </Link>

                <Text size={"xs"}>{timeAgo(item.created_at)}</Text>
                <Badge color={item.published_at ? "green" : "yellow"}>
                  {item.published_at ? "Published" : "Pending"}
                </Badge>
              </Flex>

              <Card withBorder radius={"lg"} p={"sm"} miw={"80%"}>
                <Flex direction={"column"} gap={"lg"}>
                  <Text size={"sm"}>{item.content}</Text>
                  <Group spacing={"md"}>
                    {item.authors.map(author => (
                      <Tooltip label={author.address} key={author.address}>
                        <Avatar
                          src={`https://cdn.stamp.fyi/avatar/${author.address}`}
                          size={"lg"}
                          radius={"xl"}
                          sx={{
                            border: author.signature ? "3px solid #00fa03" : "3px solid red",
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Group>
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

  // Return the data as props
  return { props: { feedItems: data.data } };
};

export default Home;

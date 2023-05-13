import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createSignaturiMessage, encodeMessage } from "@0xlighthouse/signaturi";
import { Button, Container, Title } from "@mantine/core";
import { signTypedData } from "@wagmi/core";
import { ethers } from "ethers";

function ItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [signPayload, setSignPayload] = useState(null);
  const [item, setItem] = useState(null);

  const handleSignedType = async () => {
    console.log("signPayload");
    console.log(signPayload);
    signPayload.domain.chainId = 1;
    signPayload.value = signPayload.message;

    const signature = await signTypedData(signPayload);
    console.log(signature);
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
      console.log(authorAddress);
      console.log(authorAddress);
      console.log(authorAddress);
      const message = {
        content: item.content,
        accounts: authorAddress,
      };
      const encodedMessage = encodeMessage(message);
      console.log(encodeMessage);
      setSignPayload(encodedMessage);
    }
  }, [item]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Title order={4}>{item.title}</Title>
      <Title order={4}>{item.content}</Title>
      <Title order={4}>{item.status}</Title>
      {item.authors.map(auth => (
        <Title key={auth.address} order={4}>
          {auth.address}
        </Title>
      ))}
      <Button variant="outline" onClick={() => handleSignedType()}>
        Sign
      </Button>
    </Container>
  );
}

export default ItemPage;
// Verify the signature

// useEffect(() => {
//   const messageBytes = ethers.utils.toUtf8Bytes(message);
//   const messageHash = ethers.utils.hashMessage(messageBytes);
//   if (signature) {
//     const signingAddress = ethers.utils.recoverAddress(messageHash, signature);
//     console.log("signingAddress");
//     console.log(signingAddress);
//   }

//   if (data) {
//   }
// }, [data, message, signature]);

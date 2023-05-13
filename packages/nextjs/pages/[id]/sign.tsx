import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { encodeMessage } from "../../lib/signaturi";
import { Button, Container, Title } from "@mantine/core";
import { signTypedData } from "@wagmi/core";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

function ItemPage() {
  const router = useRouter();
  const { id } = router.query;

  const [signPayload, setSignPayload] = useState(null);
  const [item, setItem] = useState(null);
  const account = useAccount();

  /**
   * Save the signature to the database
   */
  const handleSignedType = async () => {
    signPayload.domain.chainId = 1;
    signPayload.value = signPayload.message;
    const signature = await signTypedData(signPayload);

    // TODO: send signature to API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/add-signature`, {
      method: "POST",
      body: JSON.stringify({
        account: account.address,
        signature
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    console.log(data)

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

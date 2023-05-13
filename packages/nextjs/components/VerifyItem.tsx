import { useEffect, useState } from "react";
import { verifySignaturiMessage } from "../lib/signaturi";
import { Result, SignatureResult } from "~~/lib/signaturi/types";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed, IconCircleXFilled } from '@tabler/icons-react';

interface VerifyItemProps {
  id: string;
}

function VerifyItem({ id }: VerifyItemProps) {
  const [item, setItem] = useState(null);
  const [verifyResult, setVerifyResult] = useState<Result>(null);

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
  }, [id]);

  useEffect(() => {
    if (item) {
      const message = {
        message: {
          content: "Helloooo ETHGlobal hackers!",
          accounts: [
            { name: "Signaturi Test", account: "0x18d07e528Ad5E863d89afFe7f27f861F323a2eC5" },
            { name: "Dah Hacker", account: "0x0505f6743331f6C47e711516d03A415bbc979133" },
          ],
        },
        signatures: [
          "0xa027c21c68111d46604c4b63b5e449f8e3763e386d4b60c1d2332ebb7fc4ccc111b419f6ce6fd6078ee7e9f32c6fef379971c11e577ecc9338ac2af6d78345fc1c",
          "0xa97b7f3bc17d3762d1c802042f3d18cbc7f835949c34b310429d186959a496086a38dacdb59d5b0e5e25481013778cc584d0526b587d72f2ed7d511d8669ca171c",
        ],
        version: "1" as const,
      };
      const verifyResult = verifySignaturiMessage(message);
      console.log(verifyResult);
      setVerifyResult(verifyResult);
    }
  }, [item]);

  if (!item) {
    return <div>Loading item...</div>;
  } else if (!verifyResult) {
    return <div>Verifying...</div>;
  }

  return (
    <dl>
      <dt>Result</dt>
      <dd>{verifyResult.isValid ? "Good" : "Bad"}</dd>
      <dt>Signatures</dt>
      <dd>
        <List>{verifyResult.signatures.map(s => <SignatureResult sigResult={s} />)}</List>
      </dd>
    </dl>
  );
}

interface SignatureResultProps {
  sigResult: SignatureResult
}

const SignatureResult = ({sigResult}: SignatureResultProps) => {
  const { result } = sigResult
  const icon = (result === 'good' ? <IconCircleCheck color="green" /> : result === 'bad' ? <IconCircleXFilled color="red" /> : <IconCircleDashed />);
  return <List.Item icon={icon}>{result}</List.Item>;
}

export default VerifyItem;

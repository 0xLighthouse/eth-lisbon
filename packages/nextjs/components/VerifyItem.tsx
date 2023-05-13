import { useEffect, useState } from "react";
import { createSignaturiMessage, verifySignaturiMessage } from "../lib/signaturi";
import { Result, SignatureResult } from "~~/lib/signaturi/types";
import { List } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed, IconCircleXFilled } from '@tabler/icons-react';

interface VerifyItemProps {
  id: string;
}

function VerifyItem({ id }: VerifyItemProps) {
  const [item, setItem] = useState<any>(null);
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
      const { authors, content } = item;
      console.log(JSON.stringify(authors, null, 4));
      const signers = authors.map(({signature, address, name}) => ({
        account: address,
        name: name ?? ""
      }));
      const signatures = authors.map(a => a.signature ?? null);
      const message = {
        content: content,
        accounts: signers,
      }
      const signaturiMessage = createSignaturiMessage(message, signatures);
      const verifyResult = verifySignaturiMessage(signaturiMessage);
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

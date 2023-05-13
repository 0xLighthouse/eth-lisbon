import { useRouter } from "next/router";
import { Container } from "@mantine/core";
import VerifyItem from "~~/components/VerifyItem";

function ItemPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Container>
      <VerifyItem id={id} />
    </Container>
  );
}

export default ItemPage;

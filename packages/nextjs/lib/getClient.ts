import { VercelClient, createClient } from "@vercel/postgres";

let client: VercelClient | undefined = undefined;

export const getClient = () => {
  if (!client) {
    client = createClient();
  }
  return client;
};

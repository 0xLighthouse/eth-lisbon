import { createClient } from "@vercel/postgres";
import { getClient } from "~~/lib/getClient";

export default async function handler(req, res) {
  const client = getClient()
  await client.connect();

  try {
    const resp = await client.sql`SELECT * FROM feed ORDER BY created_at DESC LIMIT 100`;
    return res.status(200).json({
      data: resp.rows,
      count: resp.rowCount,
    });
  } catch (err) {
    console.log(err)
  }
}

import { createClient } from "@vercel/postgres";

export default async function handler(req, res) {
  const client = createClient();
  await client.connect();

  try {
    const resp = await client.sql`SELECT * FROM feed LIMIT 100`;
    return res.status(200).json({
      data: resp.rows,
      count: resp.rowCount,
    });
  } catch (err) {
    console.log(err);
  }
}

import { db } from "@vercel/postgres";

export default async function handler(req, res) {
  const client = await db.connect();

  try {
    const resp = await client.sql`SELECT * FROM feed ORDER BY created_at DESC LIMIT 100`;
    return res.status(200).json({
      data: resp.rows,
      count: resp.rowCount,
    });
  } catch (err) {
    console.log(err);
  }
  await client.end();
}

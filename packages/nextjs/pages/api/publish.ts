import { db } from "@vercel/postgres";

export default async function handler(req, res) {
  const payload = req.body;
  const client = await db.connect();
  console.log("payload publish");
  console.log(payload);
  console.log(payload);
  console.log(payload);

  // --- fetch the record
  const resp = await client.query(`SELECT * FROM feed WHERE title = $1 LIMIT 1`, [payload.id]);
  const feedItem = resp.rows[0];

  try {
    // --- update the record
    await client.query(
      `
      UPDATE feed
      SET
         published_at = now()
      WHERE
        title = $1 AND published_at IS NULL`,
      [payload.id],
    );
    return res.status(200).json({ record: feedItem });
  } catch (err) {
    console.log(err);
  }
}

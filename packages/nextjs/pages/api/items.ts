import { db } from "@vercel/postgres";

export default async function handler(req, res) {
  const client = await db.connect();

  const { id } = req.query;

  try {
    const resp = await client.query(`SELECT * FROM feed WHERE title = $1 LIMIT 1`, [id]);
    return res.status(200).json({
      data: resp.rows[0],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  } finally {
    await client.end();

    console.log("Heya...");
  }
}

import { db } from "@vercel/postgres";
import { generateName } from "~~/lib/generateName";

export default async function handler(req, res) {
  const client = await db.connect();

  try {
    console.log(req.body);
    const bodyResp = req.body;

    const name = generateName();

    const resp = await client.sql`INSERT INTO feed(id, title, content, authors) VALUES(uuid_generate_v4(), ${name}, ${
      bodyResp.bodyValue
    }, ${JSON.stringify(bodyResp.authors)}) RETURNING *;`;

    console.log(resp);
    return res.status(201).json({ name });
  } catch (err) {
    console.log(err);
  }
}

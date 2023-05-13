import { generateName } from "~~/lib/generateName";
import { getClient } from "~~/lib/getClient";

export default async function handler(req, res) {
  const client = getClient()
  await client.connect();

  try {
    console.log(req.body);
    const bodyResp = req.body;

    const name = generateName();

    const resp = await client.sql`INSERT INTO feed(id, title, content, authors) VALUES(uuid_generate_v4(), ${name}, ${
      bodyResp.bodyValue
    }, ${JSON.stringify(bodyResp.authors)}) RETURNING *;`;

    console.log(resp);
    await client.end()
    return res.status(201).json({ name });
  } catch (err) {
    await client.end()
    return res.status(400).json(err);
  }
}

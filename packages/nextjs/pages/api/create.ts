import { createClient } from "@vercel/postgres";
import { generateName } from "~~/lib/generateName";

export default async function handler(req, res) {
    const client = createClient()
    await client.connect()
        
    try {
        const name = generateName()
        const resp = await client.sql`INSERT INTO feed(id, title, content) VALUES(uuid_generate_v4(), ${name}, 'World') RETURNING *;`
        console.log(resp)
        return res.status(201).json({ name });
    } catch (err) {
        console.log(err)
    }
  }
  
import { sql } from "@vercel/postgres";

export const fetchFeed = async () => {
    const { rows } = await sql`SELECT * FROM feed;`;
    console.log(rows)
    return rows;
};

export const newDocument = async () => {
    const { rows } = await sql`
    INSERT INTO feed (id, title, content, likes) VALUES (uuid_generate_v4(), '${generateName()}', 'World', 100) RETURNING *;`;
    console.log(rows)
    return rows;
};


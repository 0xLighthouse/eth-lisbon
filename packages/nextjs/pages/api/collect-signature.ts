import { db } from "@vercel/postgres";

export default async function handler(req, res) {
  console.log("Collect signature");
  console.log(req.body);
  const payload = req.body;

  console.log("body", payload);
  const client = await db.connect();

  await client.connect();

  // --- fetch the record
  const resp = await client.query(`SELECT * FROM feed WHERE title = $1 LIMIT 1`, [payload.id]);
  const feedItem = resp.rows[0];

  try {
    console.log("before ---");
    console.log(feedItem.authors);
    // find index of the signer
    // find index of the signer

    const signerIndex = feedItem.authors.findIndex(o => o.address.toLowerCase() === payload.account.toLowerCase());

    // mutate the record
    feedItem.authors[signerIndex] = {
      ...feedItem.authors[signerIndex],
      signature: payload.signature,
    };

    console.log("after ---");
    console.log(feedItem.authors);

    // --- update the record
    await client.query(
      `
      UPDATE feed
      SET
         authors = $1
      WHERE
        title = $2`,
      [JSON.stringify(feedItem.authors), payload.id],
    );

    console.log(feedItem);
    return res.status(200).json({ record: feedItem });
  } catch (err) {
    console.log(err);
  }
  await client.end();
}

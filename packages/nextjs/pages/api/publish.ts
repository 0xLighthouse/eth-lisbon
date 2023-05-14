import { db } from "@vercel/postgres";
import { Web3Storage } from 'web3.storage'


export default async function handler(req, res) {
  const payload = req.body;
  const client = await db.connect();

  // --- fetch the record
  const resp = await client.query(`SELECT * FROM feed WHERE title = $1 LIMIT 1`, [payload.id]);
  const feedItem = resp.rows[0];

  try {
    // --- update the record
    const isUpdated = await client.query(
      `
      UPDATE feed
      SET
         published_at = now()
      WHERE
        title = $1 AND published_at IS NULL`,
      [payload.id],
    );

    // Record has been updated, return early
    if (isUpdated.rowCount === 0) {
      return res.status(200).json({ record: feedItem });
    }

    // --- Write proof to IPFS
    const storage = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN! })

    const _payload = { hello: 'world' }
    const buffer = Buffer.from(JSON.stringify(_payload))

    const files = [
      new File([buffer], `${feedItem.title}.json`)
    ]

    const cid = await storage.put(files, {
      wrapWithDirectory: false,
      name: `${feedItem.title}.json`
    })

    // --- update the record with IPFS CID
    await client.query(
      `
      UPDATE feed
      SET
        ipfs_cid = $2
      WHERE
        title = $1`,
      [payload.id, cid],
    );
    return res.status(200).json({ record: feedItem });

  } catch (err) {
    console.log(err);
  }
}

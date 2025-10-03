import db from "../config/dbclient.js";

//* Get all data.
export const loadLinks = async () => {
  const [rows] = await db.execute(`SELECT * FROM shortener`);
  return rows;
};

//* Get a specific data, for shortCode.
export const checkShortCode = async (finalShortCode) => {
  const [rows] = await db.execute(
    `SELECT * FROM shortener WHERE shortCode = ?`,
    [finalShortCode]
  );
  return rows;
};

//* Insert data.
export const addShortenerLinks = async ({ shortCode, url }) => {
  return await db.execute(
    `INSERT INTO shortener(shortCode, url) VALUES(?, ?)`,
    [shortCode, url]
  );
};

// console.log(
//   await addShortenerLinks({
//     shortCode: "twilio",
//     url: "https://xyz.com/example.com/vc.com",
//   })
// );
// console.log(await loadLinks());
// console.log(await checkShortCode("twilio"));

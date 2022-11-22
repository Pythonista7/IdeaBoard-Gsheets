import { google } from "googleapis";

/* https://gist.github.com/kevin-smets/e0f14b76279f4624f2b3b3c1d7474a97 */
async function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;
    console.log("body", body);

    const { Name, Ideas } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });
    console.log("SheetId", process.env.DATABASE_ID);
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.DATABASE_ID,
      range: "Sheet1!A2:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[Name, Ideas]],
      },
    });

    res.status(201).json({ message: "Success", response });
    return;
  }

  res.status(200).json({ message: "Wrong Method!" });
  return;
}

export default handler;

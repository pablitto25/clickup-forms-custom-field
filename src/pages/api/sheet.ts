import { google } from "googleapis";
import keys from "../../../key.json";

export default function handler(req: any, res: any) {
    try {
        const client = new google.auth.JWT(
            keys.client_email, undefined, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
        );

        client.authorize(async function (err: any, tokens: any) {
            if (err) {
                return res.status(500).send(JSON.stringify({ error: true, message: 'Internal Server Error' }));
            }

            const gsapi = google.sheets({ version: 'v4', auth: client });

            // CUSTOMIZATION FROM HERE
            const opt = {
                spreadsheetId: '1uRp0uf_TIFannxVSkV6oCzWZ_oyK490CktDz22bI39U',
                range: 'Hoja1!E2:F'
            };

            let data = await gsapi.spreadsheets.values.get(opt);
            return res.status(200).send(JSON.stringify({ error: false, data: data.data.values }));
        });
    } catch (e) {
        return res.status(500).send(JSON.stringify({ error: true, message: 'Internal Server Error' }));
    }
}

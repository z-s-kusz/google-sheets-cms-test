import { google } from 'googleapis';

const serviceEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets';
const sheetId = process.env.SHEET_ID;
const sheetName = 'QUESTS';
const keys = JSON.parse(process.env.GOOG_CREDENTIALS);

const client = google.auth.fromJSON(keys);
client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const getAll = async () => {
    // A1 notation https://developers.google.com/sheets/api/guides/concepts#cell
    const range = `${sheetName}!A2:B500`;
    const options = {
        url: `${serviceEndpoint}/${sheetId}/values/${range}`,
    };

    try {
        const res = await client.request(options);
        console.log('res!!!!!!!!');
        console.log(res.data);
        console.log(':)');
    } catch (err) {
        console.error('error getting all spreadsheet data', err);
    }
};

getAll();

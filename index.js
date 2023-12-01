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
        console.log('table data!', res.data);

        const quests = mapSheetData(res.data.values);
        console.log('quests', quests);
    } catch (err) {
        console.error('error getting all spreadsheet data', err);
    }
};

/*
    specific to my sheet data from here on out
    column A is Names
    column B contains JSON with all the item names and counts
*/
const mapSheetData = (data) => {
    return data.map((row) => {
        const title = row[0];
        const body = JSON.parse(row[1]);

        const quest = {
            name: title,
            id: '', // ids are generated upon cloning a quest in the client, no need to assign here
            items: mapItemsInQuest(body),
            editing: false,
        };
        return quest;
    });
};

const mapItemsInQuest = (itemsObject) => {
    return Object.entries(itemsObject).map(([key, value], i) => {
        return {
            name: key,
            id: i,
            count: value,
            completed: false,
            editing: false,
        };
    });
};

getAll();

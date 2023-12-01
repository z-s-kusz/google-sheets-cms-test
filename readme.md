# Proof of Concept for a google sheets doc as a CMS

Inspired by "Google Sheets... Your Next Database?" by Jeff Delany

https://www.youtube.com/watch?v=K6Vcfm7TA5U

# To Run

Requires Node v20.6.0 or higher (I suggest using the version in the .nvmrc file).

Create a google sheet and allow public access. Go to the Google Cloud Console website to create a project. Enable sheets api and get default credentials. The Fireship video above explains it better.

Create `.env` file and set your variable values (see .env structure)

```
npm i
```

```
npm run dev
```

## .env structure

Sheet ID can be found in the URL when viewing your sheet via the google docs website.

I don't plan on using this with Next or a server where I have access to the secrets.json file so I added the json directly in the .env file. Make sure to condense it to one line so it is a valid env varaible. Google auth will read it as JSON and parse it out.

```
SHEET_ID=your_sheet_id
GOOG_CREDENTIALS={"type":"...","project_id":"...","private_key_id":"..." etc...}
```

## My Google Sheet setup

Sheet has 2 columns and 500 rows. The CMS this will eventually support is not likely to go to even half of that.
Spreadsheet name and sheet name differ, be sure to set the sheet name.
I went with 'QUESTS' for my quests list. Default name is 'Sheet1'.

To add another 'table' I would go with a second sheet over adding more columns.

## API response

Here is what the response I was getting back in the console log looks like:

```
{
  range: 'QUESTS!A2:B500',
  majorDimension: 'ROWS',
  values: [
    [
      'Storage Lvl 1',
      '{\n' +
        '  "Scrap Material": 35,\n' +
        '  "Screw Nut": 10,\n' +
        '  "Nail": 10,\n' +
        '  "Hammer": 1,\n' +
        '  "Screwdriver": 1,\n' +
        '  "Wrench": 1,\n' +
        '  "Duct Tape": 1,\n' +
        '  "Metal Pipe": 2\n' +
        '}'
    ],
    [
      'Storage Lvl 2',
      '{\n' +
        '  "Scrap Material": 80,\n' +
        '  "Wrench": 1,\n' +
        '  "Screw Nut": 40,\n' +
        '  "Drill": 1,\n' +
        '  "Nail": 40,\n' +
        '  "Duct Tape": 2,\n' +
        '  "Metal Pipe": 4,\n' +
        '  "Hammer": 2,\n' +
        '  "Screwdriver": 1\n' +
        '}'
    ]
  ]
}
```

## Other Notes

googleapis for node looks like it has some better methods and structures for using sheets but this is working for now
and I don't need to get any complex cell ranges or do anything besides read the data.

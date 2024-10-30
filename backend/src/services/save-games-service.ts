import fs from 'fs';
import path from 'path';
import fetch from "node-fetch";

async function getWeekData(week){
    try {
        const response = await fetch(`https://api.collegefootballdata.com/games?year=2024&week=${week}&seasonType=regular&division=fbs`, {
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer R79Lh35u8BLJp+DlEsbZTCXqHazp4MfyvwXergccwThsXxYGkrRFxkPlq39he2nG',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching external data', error);
        throw new Error();
    }
}

async function fetchAndSaveWeekData(week) {
    try {
        const filePath = path.resolve(__dirname, `../data/games/week${week}.json`);

        // Check if the file already exists
        if (fs.existsSync(filePath)) {
            console.log(`File for week ${week} already exists, skipping fetch.`);
            return;
        }

        // If file doesn't exist, fetch the data and save it
        const data = await getWeekData(week);

        // Write the response data to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Successfully saved week ${week} data to ${filePath}`);
    } catch (error) {
        console.error(`Failed to fetch or save week ${week} data:`, error);
    }
}

export async function saveGames() {
    for (let week = 1; week <= 14; week++) {
        await fetchAndSaveWeekData(week);
    }
}
import fs from 'fs';
import path from 'path';
import {forEach} from "lodash";

export function loadTerritory(week) {
    const fullPath = path.resolve(__dirname, `../data/territories/territories-week-${week}.json`);
    return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

function loadGame(week) {
    const fullPath = path.resolve(__dirname, `../data/games/week${week}.json`);
    return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

// Function to save JSON data
function saveJSON(week, data) {
    const fullPath = path.resolve(__dirname, `../data/territories/territories-week-${week}.json`);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
}

export function analyzeTerritories() {
    // Load initial territories for week 0
    let initialTerritories = loadTerritory(0);

    if(!initialTerritories){
        throw new Error('No initial territories')
    }

    // Iterate through weeks 1 to 14
    for (let week = 1; week <= 14; week++) {
        // const loadedTerritory = loadTerritory(week)
        // if(loadedTerritory){
        //     initialTerritories = loadedTerritory;
        //     console.log('territory already analyzed.')
        //     continue;
        // }
        const games = loadGame(week);
        const weekTerritories = analyzeTerritory(initialTerritories, games);
        const countyTerritories = getCountyTeams(weekTerritories);

        saveJSON(week, countyTerritories);
        initialTerritories = weekTerritories;
    }

    console.log("Territory analysis completed and saved for all weeks.");
}

function getCountyTeams(week1Territories) {
    const week1CountyTerritories: Record<string, string> = {};
    forEach(week1Territories, (counties, team) => {
        forEach(counties, (county) => {
            week1CountyTerritories[county] = team;
        });
    });

    return week1CountyTerritories;
}


function analyzeTerritory(initialTerritories, games){
    let updatedTeamTerritories = {
        ...initialTerritories,
    };
    games.forEach((game) => {
        const homeWon = game.home_points > game.away_points;
        const winnerId = homeWon ? game.home_id : game.away_id;
        const loserId = homeWon ? game.away_id : game.home_id;

        if (
            (homeWon && game.home_division === 'fcs') ||
            (!homeWon && game.away_division === 'fcs')
        ) {
            updatedTeamTerritories[loserId] = [];
            return;
        }
        updatedTeamTerritories[winnerId] = [
            ...(updatedTeamTerritories[game.home_id] ?? []),
            ...(updatedTeamTerritories[game.away_id] ?? []),
        ];

        updatedTeamTerritories[loserId] = [];
    });

    return updatedTeamTerritories;
}
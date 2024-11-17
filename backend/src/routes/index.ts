import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import {saveGames} from "../services/save-games-service";
import {analyzeTerritories, loadTerritory} from "../services/territories-service";

const router = Router();

router.get('/teams', async (req: Request, res: Response) => {
    try {
        // Make an API request to JSONPlaceholder to fetch user data
        const response = await fetch('https://api.collegefootballdata.com/teams/fbs?year=2023', {
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer R79Lh35u8BLJp+DlEsbZTCXqHazp4MfyvwXergccwThsXxYGkrRFxkPlq39he2nG',
            },
        });

        // Check if the response is ok (status code in the range 200-299)
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse the response body as JSON
        const data = await response.json();

        // Send the data back to the client
        res.json(data);
    } catch (error) {
        // Handle errors and send a response with a status code of 500
        console.error('Error fetching external data', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/games', async (req: Request, res: Response) => {
    try {
        await saveGames();
        await analyzeTerritories();

        console.log('finished analytzing!')
        res.status(200).json({ message: 'Finished analyzing' });
    } catch (error) {
        // Handle errors and send a response with a status code of 500
        console.error('Error fetching external data', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/territory/week/:weekId', async (req: Request, res: Response) => {
    try {
        res.json(loadTerritory(req.params.weekId))
    } catch (error) {
        // Handle errors and send a response with a status code of 500
        console.error('Error fetching external data', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/counties', async () => {
    return null;
});

export default router;

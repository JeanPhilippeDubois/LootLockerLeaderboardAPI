const express = require('express');
const apiRouter = express.Router();
const db = require('../db.js');
const { checkLootLockerSession } = require('./securityCheck.js');

apiRouter.get('/api/leaderboard/top10/:game_level_id', async (req, res, next) => {
    const { game_level_id } = req.params;
    try {
        const top10Results = await db.getTop10ResultsForLevel(game_level_id);
        res.status(200).json({ top10Results: top10Results });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
apiRouter.get('/api/leaderboard/top5/:game_level_id', async (req, res, next) => {
    const { game_level_id } = req.params;
    try {
        const top10Results = await db.getTop10ResultsForLevel(game_level_id);
        res.status(200).json({ top10Results: top10Results });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
apiRouter.get('/api/leaderboard/user/:lootlocker_UID/:game_level_id', async (req, res, next) => {
    const { lootlocker_UID, game_level_id } = req.params;
    try {
        const userStats = await db.getUserStatsAndPosition(lootlocker_UID, game_level_id);
        res.status(200).json({ userStats: userStats });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

apiRouter.post('/api/upsert', async (req, res, next) => {
    const { user_display_name, lootlocker_UID, lootlocker_session_id, game_level_id, user_laptime, user_inputs } = req.body;

    // Sanitize and validate inputs based on column types
    const sanitizedUserDisplayName = String(user_display_name).substring(0, 50); // Truncate to 50 characters
    const sanitizedLootlockerUID = String(lootlocker_UID).substring(0, 75); // Truncate to 75 characters
    const sanitizedLootlockerSessionID = String(lootlocker_session_id).substring(0, 100); // Truncate to 100 characters
    const sanitizedGameLevelID = String(game_level_id).substring(0, 50); // Truncate to 50 characters
    const sanitizedUserInputs = String(user_inputs); // Longtext has no specific validation
    var separated = user_laptime.split(":")

    if(separated && separated.length > 3) {
        var minutes = separated[0];
        var seconds = separated[1];
        var hundreds = separated[2];
    }

    var result = "";

    try {
        result = await checkLootLockerSession(sanitizedLootlockerSessionID);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    
    if (sanitizedUserLaptime === null && result !== "" && minutes !== null) {
        return res.status(400).json({ error: 'Invalid user_laptime format' });
    } else {
        try {
            await db.upsertUserStats(
                sanitizedUserDisplayName,
                sanitizedLootlockerUID,
                sanitizedLootlockerSessionID,
                sanitizedGameLevelID,
                sanitizedUserInputs,
                minutes,
                seconds,
                hundreds
            );
            res.status(200).json({ message: 'Upsert operation successful' });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
});

 
module.exports = apiRouter;
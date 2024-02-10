const mysql = require('mysql2');
 
const pool = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});
 
let db = {};
 
db.getTop10ResultsForLevel = (game_level_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT user_display_name, user_laptime FROM leaderboard WHERE game_level_id = ? ORDER BY user_laptime ASC LIMIT 10';
        pool.query(sql, [game_level_id], (error, topResults) => {
            if (error) {
                return reject(error);
            }
            return resolve(topResults);
        });
    });
};
db.getTop5ResultsForLevel = (game_level_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT user_display_name, user_laptime FROM leaderboard WHERE game_level_id = ? ORDER BY user_laptime ASC LIMIT 5';
        pool.query(sql, [game_level_id], (error, topResults) => {
            if (error) {
                return reject(error);
            }
            return resolve(topResults);
        });
    });
};
db.getUserStatsAndPosition = (lootlocker_UID, game_level_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT 
                user_display_name,
                user_laptime,
                RANK() OVER (ORDER BY user_laptime ASC) AS position
            FROM leaderboard
            WHERE game_level_id = ? AND lootlocker_UID = ?
            ORDER BY user_laptime ASC LIMIT 10
        `;
        pool.query(sql, [game_level_id, lootlocker_UID], (error, userStats) => {
            if (error) {
                return reject(error);
            }
            return resolve(userStats);
        });
    });
};

db.upsertUserStats = (user_display_name, lootlocker_UID, lootlocker_session_id, game_level_id, user_inputs, minutes, seconds, hundreds) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO leaderboard (user_display_name, lootlocker_UID, lootlocker_session_id, game_level_id, user_laptime, user_inputs)
            VALUES (?, ?, ?, ?, MAKETIME(?, ?, ?), ?)
            ON DUPLICATE KEY UPDATE
            user_laptime = CASE
                WHEN MAKETIME(?, ?, ?) < user_laptime THEN MAKETIME(?, ?, ?)
                ELSE user_laptime
            END,
            user_inputs = VALUES(user_inputs),
            user_display_name = VALUES(user_display_name),
            lootlocker_session_id = VALUES(lootlocker_session_id)
        `;
        pool.query(sql, [user_display_name, lootlocker_UID, lootlocker_session_id, game_level_id, minutes, seconds, hundreds, user_inputs,], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
module.exports = db;
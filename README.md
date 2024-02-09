
.ENV CREATION 

Create a .env file with the following data : 

PORT = YOUR_LOCAL_PORT
DB_PORT = YOUR_DB_PORT
DB_HOST = YOUR_DB_HPOST
DB_USER = YOUR_DB_USER
DB_PASS = YOUR_DB_PASS
MYSQL_DB = YOUR_DB_NAME
CONNECTION_LIMIT = 10

DATABASE CREATION

You will need to create a database either locally or remotely, a remote connection will require server knowledge to make it work compared to using Mysql Workbench locally.

CREATE TABLE `leaderboard` (
  `user_display_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_laptime` time NOT NULL,
  `user_inputs` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `game_level_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `lootlocker_UID` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lootlocker_session_id` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

# Leaderboard API

This API is public and has the following features:

- Async/await promises
- MySQL connection pooling
- Session verification via LootLocker Services to protect Leaderboard entries

## Installation

### .env Creation

Create a `.env` file with the following data:

```dotenv
PORT=YOUR_LOCAL_PORT
DB_PORT=YOUR_DB_PORT
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASS=YOUR_DB_PASS
MYSQL_DB=YOUR_DB_NAME
CONNECTION_LIMIT=10
```

### Database Creation

You will need to create a database either locally or remotely. A remote connection will require server knowledge to make it work compared to using MySQL Workbench locally.

```sql
CREATE TABLE `leaderboard` (
  `user_display_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_laptime` time NOT NULL,
  `user_inputs` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `game_level_id` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `lootlocker_UID` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lootlocker_session_id` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## Usage

You will find all the needed details to install this API here, stay tuned.

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repository.git

# Navigate to the project directory
cd your-repository

# Install dependencies
npm install

# Start the server
npm start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize the content further, add badges, or include any additional information relevant to your project. This is a basic template to get you started. Adjust placeholder values and paths based on your project structure.

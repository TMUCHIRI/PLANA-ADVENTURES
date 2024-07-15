CREATE TABLE Users(user_id VARCHAR(255) PRIMARY KEY NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, role VARCHAR(50) DEFAULT 'user')

ALTER TABLE Users ADD isWelcomed BIT DEFAULT(0)

SELECT * FROM Users

UPDATE Users
SET isWelcomed = 0
WHERE isWelcomed IS NULL;

ALTER TABLE Users
ALTER COLUMN isWelcomed BIT NOT NULL;

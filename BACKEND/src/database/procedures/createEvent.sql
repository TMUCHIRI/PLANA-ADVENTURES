CREATE OR ALTER PROCEDURE createEvent
    @event_id VARCHAR(255),
    @title VARCHAR(255),
    @description VARCHAR(255),
    @date DATETIME,
    @location VARCHAR(255),
    @ticket_type VARCHAR(255),
    @price FLOAT,
    @image VARCHAR(255)
AS
BEGIN
    INSERT INTO Events (event_id, title, description, date, location, ticket_type, price, image)
    VALUES (@event_id, @title, @description, @date, @location, @ticket_type, @price, @image)
END

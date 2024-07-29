CREATE PROCEDURE bookEvent
    @booking_id VARCHAR(255),
    @user_id VARCHAR(255),
    @event_id VARCHAR(255)
AS
BEGIN
    INSERT INTO Bookings (booking_id, user_id, event_id, booking_date)
    VALUES (@booking_id, @user_id, @event_id, GETDATE());

    SELECT 
        Users.username,
        Events.title AS event_name
    FROM Bookings
    JOIN Users ON Bookings.user_id = Users.user_id
    JOIN Events ON Bookings.event_id = Events.event_id
    WHERE Bookings.booking_id = @booking_id;
END

import mssql from 'mssql';
import { v4 } from 'uuid';
import { sqlconfig } from '../config/sql.config';
import { booking } from '../models/booking.interface';
import lodash from 'lodash';

export class BookingService {
    async bookEvent(booking: booking) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let booking_id = v4();

            let isBooked = (await pool.request()
                .input('user_id', mssql.VarChar, booking.user_id)
                .input('event_id', mssql.VarChar, booking.event_id)
                .query(`SELECT * FROM Bookings WHERE user_id = @user_id AND event_id = @event_id`)
            ).recordset;

            if (!lodash.isEmpty(isBooked)) {
                return {
                    error: 'Booking already exists'
                };
            }

            let result = (await pool.request()
                .input('booking_id', mssql.VarChar, booking_id)
                .input('user_id', mssql.VarChar, booking.user_id)
                .input('event_id', mssql.VarChar, booking.event_id)
                .execute('bookEvent')).recordset;

            if (result.length === 0) {
                return {
                    error: 'Booking not created'
                };
            } else {
                return {
                    message: 'Booking created successfully',
                    bookingDetails: result[0]
                };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getAllBookings() {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = await pool.request().query(`
                SELECT 
                    b.booking_id, 
                    b.user_id, 
                    u.username, 
                    b.event_id, 
                    e.title as event_title,
                    e.ticket_type as ticket_type,
                    e.isApproved as isApproved, 
                    b.booking_date 
                FROM 
                    Bookings b
                JOIN 
                    Users u ON b.user_id = u.user_id
                JOIN 
                    Events e ON b.event_id = e.event_id;
            `);
            return {
                bookings: result.recordset
            };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getBookingsByUser(user_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = (await pool.request()
                .input('user_id', mssql.VarChar, user_id)
                .query(`
                    SELECT 
                        b.booking_id, 
                        b.user_id, 
                        u.username, 
                        b.event_id, 
                        e.title as event_title,
                        e.ticket_type as ticket_type,
                        e.isApproved as isApproved, 
                        b.booking_date 
                    FROM 
                        Bookings b
                    JOIN 
                        Users u ON b.user_id = u.user_id
                    JOIN 
                        Events e ON b.event_id = e.event_id
                    WHERE 
                        b.user_id = @user_id
                `)
            ).recordset;

            if (result.length > 0) {
                return {
                    bookingsByUser: result
                };
            } else {
                return {
                    error: 'No bookings found for this user'
                };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getBookingsByEvent(event_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = (await pool.request()
                .input('event_id', mssql.VarChar, event_id)
                .query(`
                    SELECT 
                        b.booking_id, 
                        b.user_id, 
                        u.username, 
                        b.event_id, 
                        e.title as event_title,
                        e.isApproved as isApproved, 
                        b.booking_date 
                    FROM 
                        Bookings b
                    JOIN 
                        Users u ON b.user_id = u.user_id
                    JOIN 
                        Events e ON b.event_id = e.event_id
                    WHERE 
                        b.event_id = @event_id
                `)
            ).recordset;

            if (!lodash.isEmpty(result)) {
                return {
                    bookingsByEvent: result
                };
            } else {
                return {
                    error: 'No bookings found for this event'
                };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async cancelBooking(booking_id: string) {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = (await pool.request()
                .input('booking_id', mssql.VarChar, booking_id)
                .execute('cancelBooking')).rowsAffected

            if (result[0] === 0) {
                return {
                    error: 'Booking not found'
                };
            } else {
                return {
                    message: 'Booking canceled successfully'
                };
            }
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }

    async getTotalRevenue() {
        try {
            let pool = await mssql.connect(sqlconfig);
            let result = await pool.request().execute('getTotalRevenue');
            return { totalRevenue: result.recordset[0].totalRevenue };
        } catch (error) {
            console.error('SQL error', error);
            throw error;
        }
    }
}

// src/app/components/manager-bookings/manager-bookings.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { BookingDetails } from '../../interfaces/bookingdetails';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-bookings.component.html',
  styleUrls: ['./manager-bookings.component.css']
})
export class ManagerBookingsComponent implements OnInit {
  bookings: BookingDetails[] = [];
  selectedEventId: string | null = null;
  eventBookings: BookingDetails[] = [];
  showModal: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.authService.fetchAllBookings().subscribe(
      response => {
        this.bookings = response.bookings;
      },
      error => {
        console.error('Error loading bookings', error);
      }
    );
  }

  viewBookings(eventId: string): void {
    this.selectedEventId = eventId;
    this.authService.fetchBookingsByEvent(eventId).subscribe(
      response => {
        if (response.bookingsByEvent.length > 0) {
          this.eventBookings = response.bookingsByEvent;
        } else {
          this.eventBookings = [];
          alert('No bookings found for this event');
        }
        this.showModal = true;
      },
      error => {
        console.error('Error fetching bookings for event', error);
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }
}

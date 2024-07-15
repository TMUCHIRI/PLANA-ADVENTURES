import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserBookingsComponent } from '../user-bookings/user-bookings.component';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [RouterLink, UserBookingsComponent],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent {

}

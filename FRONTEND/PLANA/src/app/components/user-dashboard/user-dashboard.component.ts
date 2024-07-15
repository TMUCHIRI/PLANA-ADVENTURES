import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterLink, EventDetailsComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

}

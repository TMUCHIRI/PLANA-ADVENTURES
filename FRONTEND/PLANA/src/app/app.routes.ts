import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { UserBookingsComponent } from './components/user-bookings/user-bookings.component';
import { ManagerSidebarComponent } from './components/manager/manager-sidebar/manager-sidebar.component';
import { ManagerDashboardComponent } from './components/manager/manager-dashboard/manager-dashboard.component';
import { ManagerEventsComponent } from './components/manager/manager-events/manager-events.component';
import { ManagerUsersComponent } from './components/manager/manager-users/manager-users.component';
import { ManagerBookingsComponent } from './components/manager/manager-bookings/manager-bookings.component';
import { ManagerProfileComponent } from './components/manager/manager-profile/manager-profile.component';
import { ManagerComponent } from './components/manager/manager.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminEventsComponent } from './components/admin/admin-events/admin-events.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user-dashboard', component: UserDashboardComponent},
    {path:'event-details', component: EventDetailsComponent},
    {path: 'user-bookings', component: UserBookingsComponent},

    {path: 'user-profile', component: UserProfileComponent},
    {
        path: 'manager', component: ManagerComponent,
        children: [
            {path: 'manager-home', component: ManagerDashboardComponent},
            {path: 'manager-events', component: ManagerEventsComponent},
            {path: 'manager-users', component: ManagerUsersComponent},
            {path: 'manager-bookings', component: ManagerBookingsComponent},
            {path: 'manager-profile', component: ManagerProfileComponent}
        ]
        
    },

    {
        path: 'admin', component: AdminComponent,
        children: [
            {path: 'admin-home', component: AdminDashboardComponent},
            {path: 'admin-events', component: AdminEventsComponent},
            {path: 'admin-users', component: AdminUsersComponent},
            {path: 'admin-profile', component: AdminProfileComponent}
        ]
    }
];

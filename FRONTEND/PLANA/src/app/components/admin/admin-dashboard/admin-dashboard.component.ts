// src/app/components/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  numberOfUsers: number = 0;
  numberOfEvents: number = 0;
  totalRevenue: number = 0;

  userChartData: any;
  eventChartData: any;
  revenueChartData: any;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit() {
    this.loadAnalytics();
  }

  loadAnalytics() {
    this.adminDashboardService.getUserCount().subscribe(
      (response) => {
        this.numberOfUsers = response.numberOfUsers;
        this.updateUserChart();
      },
      (error) => {
        console.error('Error fetching user count:', error);
      }
    );

    this.adminDashboardService.getEventCount().subscribe(
      (response) => {
        this.numberOfEvents = response.numberOfEvents;
        this.updateEventChart();
      },
      (error) => {
        console.error('Error fetching event count:', error);
      }
    );

    this.adminDashboardService.getTotalRevenue().subscribe(
      (response) => {
        this.totalRevenue = response.totalRevenue;
        this.updateRevenueChart();
      },
      (error) => {
        console.error('Error fetching total revenue:', error);
      }
    );
  }

  updateUserChart() {
    this.userChartData = {
      labels: ['Users'],
      datasets: [
        {
          label: 'Number of Users',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [this.numberOfUsers]
        }
      ]
    };
  }

  updateEventChart() {
    this.eventChartData = {
      labels: ['Events'],
      datasets: [
        {
          label: 'Number of Events',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [this.numberOfEvents]
        }
      ]
    };
  }

  updateRevenueChart() {
    this.revenueChartData = {
      labels: ['Revenue'],
      datasets: [
        {
          label: 'Total Revenue',
          backgroundColor: '#FF7043',
          borderColor: '#F4511E',
          data: [this.totalRevenue]
        }
      ]
    };
  }
}

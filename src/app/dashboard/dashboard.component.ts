import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalProducts: number = 100; // Example value, replace with actual data
  totalStockValue: number = 50000; // Example value, replace with actual data
  lowStockProducts: number = 5; // Example value, replace with actual data
  recentOrders: number = 10; // Example value, replace with actual data

  constructor() { }

  ngOnInit(): void {
    // Fetch data from the backend and update the properties
  }
}

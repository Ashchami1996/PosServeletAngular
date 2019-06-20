import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalCustomers = 20;
  totalItems = 50;
  totalOrders = 3;

  constructor() { }

  ngOnInit() {
    // this.getTotalCustomers();
    // this.getTotalItems();
    // this.getTotalOrders();
  }

  // getTotalCustomers(): void {
  //   // this.customerService.getTotalCustomers().subscribe(
  //   //   (count) =>{
  //   //     this.totalCustomers = count;
  //   //   }
  //   // )
  // }
  //
  //
  // getTotalItems(): void {
  //   this.itemService.getTotalItems().subscribe(
  //     (count) => {
  //       this.totalItems = count;
  //     }
  //   );
  // }
  //
  // getTotalOrders(): void {
  //   this.placeOrderService.getTotalOrders().subscribe(
  //     (result) => {
  //       this.totalOrders = result;
  //     }
  //   );
  // }

}

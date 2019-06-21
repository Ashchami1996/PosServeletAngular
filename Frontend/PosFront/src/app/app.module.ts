import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageCustomerComponent } from './view/manage-customer/manage-customer.component';
import { ItemsComponent } from './view/items/items.component';
import { OrderComponent } from './view/order/order.component';
import { MainComponent } from './view/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./view/dashboard/dashboard.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ItemService} from "./service/item.service";
import {OrdersService} from "./service/order.service";
import {CustomerService} from "./service/customer.service";

const  routes : Routes =[
  {
    path : 'Dashboard',
    component: DashboardComponent
  },
  {
    path : 'Customer',
    component: ManageCustomerComponent
  },
  {
    path : 'item',
    component: ItemsComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path : '',
    component: DashboardComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ManageCustomerComponent,
    ItemsComponent,
    OrderComponent,
    MainComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule



  ],
  providers: [ItemService,OrdersService,CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

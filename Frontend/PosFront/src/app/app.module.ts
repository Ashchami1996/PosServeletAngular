import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageCustomerComponent } from './view/manage-customer/manage-customer.component';
import { ItemsComponent } from './view/items/items.component';
import { OrderComponent } from './view/order/order.component';
import { MainComponent } from './view/main/main.component';
import {RouterModule, Routes} from "@angular/router";

const  routes : Routes =[
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
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ManageCustomerComponent,
    ItemsComponent,
    OrderComponent,
    MainComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import {Customer} from "../../dto/CustomerDto";
import {Item} from "../../dto/ItemDto";
import {ItemService} from "../../service/item.service";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cus: Customer[] =[];
  selectedCustomer: Customer = new Customer('', '', '');
  selectedCustomer1: Customer = new Customer('', '', '');
  ite: Item[] =[];
  selectedItem: Item = new Item('','','','');
  selectedItem1: Item = new Item('','','','');

  constructor(private customerservice: CustomerService, private  itemservice: ItemService) { }

  ngOnInit() {
    this.getAllCustomers();
    this.getAllItems();
  }

  getAllCustomers(){
    this.customerservice.getAllCustomers().subscribe(cust =>{
      this.cus = cust;
    });
    console.log(this.cus);
  }


  searchCustomer(event: any): void{
    for (this.selectedCustomer of this.cus){
      if(this.selectedCustomer.id===event.target.value){
        this.selectedCustomer1=this.selectedCustomer;
      }
    }
  }

  getAllItems(){
    this.itemservice.getAllItems().subscribe(i =>{
      this.ite = i;
    });
    console.log(this.ite);
  }
  searchItem(event: any): void{
    for(this.selectedItem of this.ite){
      if(this.selectedItem.code===event.target.value){
        this.selectedItem1= this.selectedItem;
      }
    }
  }

}

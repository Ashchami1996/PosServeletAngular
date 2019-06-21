import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../dto/CustomerDto";
import {Item} from "../../dto/ItemDto";
import {ItemService} from "../../service/item.service";
import {CustomerService} from "../../service/customer.service";
import { OrdersDto} from "../../dto/OrderDto";
import {OrderDetailsDto} from "../../dto/OrderDetailsDto";
import {NgForm} from "@angular/forms";
import {OrdersService} from "../../service/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cus: Customer[] =[];
  serchedItems: Item = new Item('','','','');
  serchedCustomers:  Customer = new Customer('', '', '');
  selectedCustomer: Customer = new Customer('', '', '');
  selectedCustomer1: Customer = new Customer('', '', '');
  ite: Item[] =[];
  selectedItem: Item = new Item('','','','');
  selectedItem1: Item = new Item('','','','');
  od: OrdersDto[] =[];
  orders: OrdersDto;
  selectedOrders: OrdersDto =new OrdersDto('','','','');
  odd: OrderDetailsDto;
  oddetails: OrderDetailsDto[]=[];
  selectedItems: Array<OrderDetailsDto> = [];
  selectedOrderDetails: OrderDetailsDto =new OrderDetailsDto('','','','');
  Total: 0;
  FullTotal:0;
  @ViewChild('txtId') txtId: ElementRef;
  @ViewChild('frmCustomer') frmOrder:NgForm;
  constructor(private customerservice: CustomerService,private elem: ElementRef,
              private  itemservice: ItemService, private  orderservice: OrdersService) { }


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


  searchCustomers(event: any): void{
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

  saveOrder(): void {

    this.selectedOrders=this.orders;


      this.orderservice.saveOrder(this.selectedOrders)
        .subscribe(resp => {
          if (resp) {
          for (this.selectedOrderDetails of this.selectedItems) {
            this.orderservice.saveOrderDetails(this.selectedOrderDetails)
              .subscribe(resp1 => {
                if (resp && resp1) {
                  alert('Order has been saved successfully');
                } else {
                  alert('Failed to save the Order');
                }
              });
          }
          }
        });

  }

  SelectOrderDetails(): void {

    const orderDate = this.elem.nativeElement.querySelector('#orderDate').value;
    const qty = this.elem.nativeElement.querySelector('#qty').value;
    console.log(qty);
    const orderId = this.elem.nativeElement.querySelector('#orderId').value;

    this.Total = 0;
    this.FullTotal =0;
    const price = this.FullTotal;
    console.log(this.serchedCustomers.id);

    this.orders = new OrdersDto(orderId, orderDate, this.FullTotal+"",this.serchedCustomers.id);
    console.log(this.orders.total);
    this.odd = new OrderDetailsDto('','','','');
    this.odd.qty = qty;
    this.odd.unitPrice = this.serchedItems.unitPrice;
    this.odd.code = this.serchedItems.code;
    this.odd.oid = this.orders.oid;
  console.log(this.odd);
    this.selectedItems.push(this.odd);
    console.log(this.selectedItems);
  }

  searchCustomer(event: any): void {
    for (this.selectedCustomer of this.cus){
      if(this.selectedCustomer.id===event.target.value){
        this.serchedCustomers=this.selectedCustomer;
      }
    }
  }

  searchItems(event: any): void {
    console.log(event.target.value);
    for (this.selectedItem of this.ite){
      console.log(this.selectedItem);
      if(this.selectedItem.code===event.target.value){
        this.serchedItems=this.selectedItem;
        console.log(this.serchedItems);
      }
    }
  }

}

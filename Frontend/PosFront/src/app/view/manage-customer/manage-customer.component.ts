import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Customer} from "../../dto/CustomerDto";
import {NgForm} from "@angular/forms";
import {CustomerService} from "../../service/customer.service";

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {

  cus: Customer[] =[];
  selectedCustomer: Customer = new Customer('', '', '');
  @ViewChild('txtId') txtId: ElementRef;
  @ViewChild('frmCustomer') frmCustomer:NgForm;

  constructor(private customerservice: CustomerService) { }

  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.customerservice.getAllCustomers().subscribe(cust =>{
      this.cus = cust;
    });
    console.log(this.cus);
  }
  addCustomer(id,name,address) {
    if (name === '' || address) {
      alert('Please input values');
      return;
    }
  }

  saveCustomer(): void {
    if (!this.frmCustomer.invalid) {

      this.customerservice.saveCustomer(this.selectedCustomer)
        .subscribe(resp => {
          if (resp) {
            alert('Customer has been saved successfully');
            this.cus.push(this.selectedCustomer);
          } else {
            alert('Failed to save the customer');
          }
        });

    } else {
      alert('Invalid Data, Please Correct...!');
    }
  }

  tableRow_Click(customer: Customer): void {
    console.log(customer);
    this.selectedCustomer = Object.assign({}, customer);
  }


  deleteCustomer(id): void {
    console.log(id);
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerservice.deleteCustomer(id).subscribe(
        (result) => {
          if (!result) {
            alert('Customer has been deleted successfully');
            this.getAllCustomers();
          } else {
            alert('Failed to delete the customer');
          }
          this.getAllCustomers();
        }
      );
    }
  }
  updateCustomer(): void {

    if (!this.frmCustomer.invalid) {

      this.customerservice.updateCustomer(this.selectedCustomer)
        .subscribe(resp => {

          if (!resp) {
            alert('Customer has been updated successfully');
          } else {
            alert('Failed to updated the Customer');
          }
        });

    } else {
      alert('Invalid Data, Please Correct...!');
    }
  }


}

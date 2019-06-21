import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Customer} from "../dto/CustomerDto";
import {environment} from "../../environments/environment";

@Injectable( {
  providedIn: 'root'
})
export class CustomerService {

  readonly baseUrl = environment.apiUrl + '/customers';
  readonly baseUrl1 = environment.apiUrl + '/customers?id=';

  constructor(private  http: HttpClient) {

  }
  getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>('http://localhost:8080/pos/customers');
  }

  saveCustomer(customer: Customer): Observable<boolean> {
    console.log(customer);
    return this.http.post<boolean>(this.baseUrl, customer);
  }

  searchCustomer(id: String): Observable<Customer> {
    return this.http.get<Customer>(this.baseUrl+ id);
  }

  deleteCustomer(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl1+ id);
  }
  updateCustomer(customer: Customer):Observable<boolean>{
    console.log(customer);
    return this.http.put<boolean>(this.baseUrl1+customer.id, customer);
  }

}

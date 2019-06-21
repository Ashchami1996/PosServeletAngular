import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {Customer} from "../dto/CustomerDto";
import {OrderDetailsDto} from "../dto/OrderDetailsDto";
import {OrdersDto} from "../dto/OrderDto";

@Injectable( {
  providedIn: 'root'
})
export class OrdersService {

  readonly baseUrl = environment.apiUrl + '/orders';
  readonly baseUrl1 = environment.apiUrl + '/orderdetails';


  constructor(private  http: HttpClient) {

  }

  saveOrder(order: OrdersDto): Observable<boolean> {
    console.log(order);
    return this.http.post<boolean>(this.baseUrl, order);
  }

  saveOrderDetails(orderde: OrderDetailsDto): Observable<boolean> {
    console.log(orderde);
    return this.http.post<boolean>(this.baseUrl1, orderde);
  }
}

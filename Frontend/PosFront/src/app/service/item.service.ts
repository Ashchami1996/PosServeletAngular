import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Item} from "../dto/ItemDto";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly baseUrl = environment.apiUrl + '/Items';
  readonly baseUrl1 = environment.apiUrl + '/Items?code=';

  constructor(private http: HttpClient) {

  }

  getAllItems(): Observable<Item[]>{
    return this.http.get<Item[]>('http://localhost:8080/pos/Items');
  }

  saveItems(item: Item): Observable<boolean> {
    console.log(item);
    return this.http.post<boolean>(this.baseUrl, item);
  }

  deleteItem(code: string): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl1+ code);
  }

  updateItems(item: Item): Observable<boolean>{
    console.log(item);
    return this.http.put<boolean>(this.baseUrl1+item.code, item);
  }
}

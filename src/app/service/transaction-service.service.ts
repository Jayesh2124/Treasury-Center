import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:3000/Transaction';
  constructor(private http: HttpClient) { }

  getTransactions() {
    return this.http.get<any>(this.apiUrl);
  }
  postTransaction(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }
}

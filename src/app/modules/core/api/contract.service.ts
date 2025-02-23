import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiUrl = 'http://localhost:5000/contracts';

  constructor(private http: HttpClient) {}

  getContracts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addContract(contract: any): Observable<any> {
    return this.http.post(this.apiUrl, contract);
  }

  deleteContract(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

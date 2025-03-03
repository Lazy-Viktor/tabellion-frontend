import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Contract {
  _id: string;
  client: string;
  description: string;
  totalprice: number;
  fee: number;
}

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {
  contracts: Contract[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadContracts();
  }

  loadContracts() {
    this.http.get<Contract[]>('http://localhost:5000/contracts').subscribe((data) => {
      this.contracts = data;
    });
  }
}
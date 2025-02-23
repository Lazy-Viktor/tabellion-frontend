import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface User {
  _id: string;
  name: string;
  phone: string;
}

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface Contract {
  client: string;
  services: string[];
  totalprice: number;
  fee: number;
  description: string;
}

@Component({
  selector: 'app-create-contract',
  imports: [FormsModule],
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {
  users: User[] = [];
  services: Service[] = [];
  selectedClientId: string = '';
  contract: Contract = {
    client: '',
    services: [],
    totalprice: 0,
    fee: 0,
    description: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
    this.loadServices();
  }

  loadUsers() {
    this.http.get<User[]>('http://localhost:5000/users').subscribe((data) => {
      this.users = data;
    });
  }

  loadServices() {
    this.http.get<Service[]>('http://localhost:5000/services').subscribe((data) => {
      this.services = data;
    });
  }

  toggleService(service: Service) {
    const index = this.contract.services.indexOf(service.name);
    if (index === -1) {
      this.contract.services.push(service.name);
      this.contract.totalprice += service.price;
    } else {
      this.contract.services.splice(index, 1);
      this.contract.totalprice -= service.price;
    }
    this.updateContractDetails();
  }

  updateContractDetails() {
    this.contract.fee = this.contract.totalprice * 0.3;
    const selectedUser = this.users.find(user => user._id === this.selectedClientId);
    if (selectedUser) {
      this.contract.description = `Клієнт ${selectedUser.name} уклав угоду з наступних послуг: ${this.contract.services.join(', ')}, за які він заплатив ${this.contract.totalprice} грн.`;
    }
  }

  createContract() {
    if (!this.selectedClientId) {
      alert('Будь ласка, виберіть клієнта');
      return;
    }
    if (this.contract.services.length === 0) {
      alert('Будь ласка, виберіть хоча б одну послугу');
      return;
    }

    this.contract.client = this.selectedClientId;
    this.updateContractDetails(); // Переконуємося, що всі значення оновлені

    this.http.post('http://localhost:5000/contracts', this.contract).subscribe(() => {
      alert('Угоду успішно створено');
      this.contract = {
        client: '',
        services: [],
        totalprice: 0,
        fee: 0,
        description: ''
      };
      this.selectedClientId = '';
    });
  }
}

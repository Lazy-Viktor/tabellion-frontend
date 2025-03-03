import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Client {
  _id: string;
  name: string;
  phone: string;
  userID: string;
};

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
};

interface Contract {
  clientId: string;
  client: string;
  services: string[];
  totalprice: number;
  fee: number;
  description: string;
};

@Component({
  selector: 'app-create-contract',
  imports: [FormsModule],
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {
  user: any = {};
  userClients: any[] = [];
  clients: Client[] = [];
  services: Service[] = [];
  selectedClientId: string = '';
  contract: Contract = {
    clientId: '',
    client: '',
    services: [],
    totalprice: 0,
    fee: 0,
    description: ''
};

constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUserAndClients();
    this.loadServices();
  }

  loadUserAndClients() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.http.get<Client[]>('http://localhost:5000/clients').subscribe(clients => {
      this.clients = clients;
      
      this.filterUserClients();
    });
  }

  filterUserClients() {
    if (this.user && this.user.id) {
      const userId = this.user.id.toString();
  
      this.userClients = this.clients.filter(client => {
        return client.userID?.toString() === userId;
      });
  
    }
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
    const selectedClient = this.clients.find(client => client._id === this.selectedClientId);
    if (selectedClient) {
      this.contract.clientId = selectedClient._id;
      this.contract.client = selectedClient.name;
      this.contract.description = `Клієнт ${selectedClient.name} уклав угоду з наступних послуг: ${this.contract.services.join(', ')}, за які він заплатив ${this.contract.totalprice} грн.`;
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

    this.updateContractDetails();

    this.http.post('http://localhost:5000/contracts', this.contract).subscribe(() => {
      alert('Угоду успішно створено');
      this.contract = {
        clientId: '',
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


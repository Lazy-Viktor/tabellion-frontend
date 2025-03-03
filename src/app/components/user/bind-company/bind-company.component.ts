import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bind-company',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './bind-company.component.html',
  styleUrl: './bind-company.component.css'
})
export class BindCompanyComponent {
  client = { name: '', practice: '', address: '', phone: '', userID: '' };
  errorMessage = '';
  successMessage = '';
  clients: any[] = [];

  practices = [
    'Сільське господарство',
    'Фінансові послуги',
    'Розважальні компанії',
    'Промисловість',
    'Нерухомість',
    'Торгівля та логістика',
    'Комунальні підприємства',
    'Спортивна індустрія',
    'Транспорт',
  ];

  constructor(private http: HttpClient) {
    this.loadClients();
  }

  loadClients() {
    this.http.get<any[]>('http://localhost:5000/clients').subscribe(clients => {
      this.clients = clients;
    });
  }

  addClient() {
    this.errorMessage = '';
    this.successMessage = '';

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.id) {
      this.errorMessage = 'Не вдалося отримати ідентифікатор користувача';
      return;
    }

    this.client.userID = user.id;

    this.http.post('http://localhost:5000/clients', this.client).subscribe(
      () => {
        this.updateUserHasCompany(user.id);
      },
      () => {
        this.errorMessage = 'Помилка додавання компанії';
      }
    );
  }

  updateUserHasCompany(userID: string) {
    const token = localStorage.getItem('token');
    this.http.patch(
      `http://localhost:5000/auth/users/${userID}`,
      { hasCompany: true },
      { headers: { Authorization: `Bearer ${token}` } } 
    ).subscribe(
      () => {
        const updatedUser = { ...JSON.parse(localStorage.getItem('user') || '{}'), hasCompany: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
  
        this.successMessage = 'Компанію успішно додано!';
      },
      (error) => {
        console.error('Помилка оновлення статусу користувача:', error);
        this.errorMessage = 'Помилка оновлення статусу користувача';
      }
    );
  }
  
}


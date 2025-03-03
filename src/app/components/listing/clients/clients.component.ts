import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  users: any = {};
  token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<any[]>('http://localhost:5000/clients', { headers }).subscribe(clients => {
      this.clients = clients;
      this.loadUsers();
    });
  }

  loadUsers() {
    if (!this.token) {
      console.error('Token not found!');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<any[]>('http://localhost:5000/auth/users', { headers }).subscribe(
      users => {
        this.users = users.reduce((acc, user) => {
          acc[user._id] = user.name;
          return acc;
        }, {});
      },
      error => {
        console.error('Помилка завантаження користувачів:', error);
      }
    );
  }

  getUserName(userID: string): string {
    return this.users[userID] || 'Невідомий користувач';
  }
}


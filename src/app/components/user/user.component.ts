import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UsersComponent {
  user = { name: '', practice: '', address: '', phone: '' };
  errorMessage = '';
  successMessage = '';
  users: any[] = [];

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  formatPhone() {
    let raw = this.user.phone.replace(/\D/g, '');
    if (raw.startsWith('380')) raw = raw.slice(3);
    if (raw.length > 9) raw = raw.slice(0, 9);

    let formatted = `+380 `;
    if (raw.length > 2) formatted += `(${raw.slice(0, 2)}) `;
    if (raw.length > 5) formatted += `${raw.slice(2, 5)} `;
    if (raw.length > 7) formatted += `${raw.slice(5, 7)} `;
    if (raw.length > 9) formatted += `${raw.slice(7, 9)}`;

    this.user.phone = formatted.trim();
  }

  loadUsers() {
    this.http.get<any[]>('http://localhost:5000/users').subscribe(users => {
      this.users = users;
    });
  }

  addUser() {
    this.errorMessage = '';
    this.successMessage = '';

    const exists = this.users.some(u => 
      u.name === this.user.name &&
      u.practice === this.user.practice &&
      u.address === this.user.address &&
      u.phone === this.user.phone
    );

    if (exists) {
      this.errorMessage = 'Клієнт вже присутній в базі даних';
    } else {
      this.http.post('http://localhost:5000/users', this.user).subscribe(() => {
        this.successMessage = 'Клієнта успішно додано!';
        this.user = { name: '', practice: '', address: '', phone: '' };
        this.loadUsers();
      });
    }
  }
}

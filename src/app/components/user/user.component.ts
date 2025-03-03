import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BindCompanyComponent } from "./bind-company/bind-company.component";


interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  hasCompany: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [BindCompanyComponent]
})
export class UserComponent implements OnInit {
  showBindCompany = false;
  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/user/registration']);
      return;
    }

    this.http.get<User>('http://localhost:5000/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/user/registration']);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/user/registration']);
  }
}

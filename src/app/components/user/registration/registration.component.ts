import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  imports: [ FormsModule ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  isLoginMode = true;

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '' };

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  login() {
    this.http.post<any>('http://localhost:5000/auth//login', this.loginData).subscribe(
      (response) => {
        console.log('Отриманий користувач:', response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error('Помилка входу', error);
      }
    );
  }

  register() {
    this.http.post('http://localhost:5000/auth/register', this.registerData)
      .subscribe({
        next: () => {
          this.isLoginMode = true;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Помилка реєстрації';
        }
      });
  }
}

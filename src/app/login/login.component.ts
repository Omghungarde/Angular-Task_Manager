import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginMessage: string = '';

  constructor(private router: Router) {}

  login() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.username === this.username && u.password === this.password
    );
  
    if (user) {
      this.loginMessage = 'Login successful!';
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/project']); 
    } else {
      this.loginMessage = 'Invalid username or password!';
    }
  }
  
}

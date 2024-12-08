import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = '';
  roles: string[] = [
    'Admin',
    'ProjectManager',
    'Architect',
    'Engineer',
    'Supervisor',
    'Worker',
  ];
  phoneNumber: string = '';
  IsActive: boolean = true;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (!this.username || !this.password || !this.role || !this.email) {
      alert('All fields are required!');
      return;
    }

    const user = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role,
      phoneNumber: this.phoneNumber,
      isActive: this.IsActive,
    };
    this.authService.register(user).subscribe({
      next: (response) => {
        alert('User registered successfully! You can Login to proceed');
        console.log(response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      },
      complete: () => {
        console.log('Registration request completed');
      }
    });
    
  }
}

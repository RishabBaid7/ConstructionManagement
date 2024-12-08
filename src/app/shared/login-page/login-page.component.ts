import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService // Inject ToastrService
  ) {
    // Initialize form with validation rules
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill in all fields correctly.', 'Login Failed', {
        timeOut: 3000,
        positionClass: 'toast-top-right', 
      });
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (response: any) => {
        if (response && response.token && response.role) {
          // Handle successful login with redirection based on user role
          switch (response.role) {
            case 'ProjectManager':
              this.router.navigate(['/manager-dashboard']);
              break;
            case 'Engineer':
              this.router.navigate(['/dashboard']);
              break;
            case 'Supervisor':
              this.router.navigate(['/supervisor-dashboard']);
              break;
            case 'Architect':
              this.router.navigate(['/architect-dashboard']);
              break;
            default:
              this.errorMessage = 'Unknown role. Please contact support.';
              this.toastr.error('Unknown role. Please contact support.', 'Login Failed', {
                timeOut: 3000,
                positionClass: 'toast-top-right',
              });
          }
        } else {
          this.errorMessage = 'Invalid credentials.';
          this.toastr.error('Invalid credentials. Please check your username and password.', 'Login Failed', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
          });
        }
      },
      error: (err) => {
        this.errorMessage = 'An error occurred during login. Please try again.';
        this.toastr.error('An error occurred during login. Please try again.', 'Login Failed', {
          timeOut: 3000,
          positionClass: 'toast-top-right', // Ensure it's set here as well
        });
      },
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent  implements OnInit {
  // Flags to check login status
  isLoggedIn: boolean = false;
  userName: string = '';
  isMobileMenuOpen: boolean = false;

  private authSubscription: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to login status and user role
    this.authSubscription.add(
      this.authService.isUserLoggedIn$.subscribe((status) => {
        this.isLoggedIn = status;
      })
    );

    this.authSubscription.add(
      this.authService.currentUserRole$.subscribe((role) => {
        this.userName = role !== 'Guest' ? role : ''; // Assign username based on role
      })
    );
  }


  // Method to handle logout functionality
  logout() {
    this.authService.logout(); // Update state through AuthService
    this.router.navigate(['/home']);
  }

  // Method to navigate to login page
  onLogin() {
    this.router.navigate(['/login']);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.authSubscription.unsubscribe();
  }
}

//New Code
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../core/services/auth.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.scss'],
// })
// export class NavbarComponent implements OnInit, OnDestroy {
//   isLoggedIn: boolean = false;
//   userName: string = '';
//   isMobileMenuOpen: boolean = false;

//   private authSubscription: Subscription = new Subscription();

//   constructor(private router: Router, private authService: AuthService) {}

//   ngOnInit(): void {
//     // Subscribe to login status
//     this.authSubscription.add(
//       this.authService.isUserLoggedIn$.subscribe((status) => {
//         this.isLoggedIn = status;
//       })
//     );

//     // Subscribe to user role for dynamic updates
//     this.authSubscription.add(
//       this.authService.currentUserRole$.subscribe((role) => {
//         this.userName = role !== 'Guest' ? role : ''; // Assign userName if not a Guest
//       })
//     );

//     // Check persistent state on load
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('userRole');
//     if (token && role) {
//       this.authService.updateAuthState(true, role); // Initialize persistent state
//     }
//   }

//   // Handle logout
//   logout(): void {
//     this.authService.logout(); // Update state through AuthService
//     this.router.navigate(['/home']); // Redirect to home page
//   }

//   // Navigate to login page
//   onLogin(): void {
//     this.router.navigate(['/login']);
//   }

//   // Toggle mobile menu
//   toggleMobileMenu(): void {
//     this.isMobileMenuOpen = !this.isMobileMenuOpen;
//   }

//   ngOnDestroy(): void {
//     // Unsubscribe to prevent memory leaks
//     this.authSubscription.unsubscribe();
//   }
// }


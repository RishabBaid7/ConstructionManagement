import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7050/api/User'; // Replace with your backend URL

  // BehaviorSubjects to manage state
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserRoleSubject = new BehaviorSubject<string>('Guest');

  // Observables to expose state
  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();
  currentUserRole$ = this.currentUserRoleSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Register user
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user).pipe(
      catchError((error) => {
        return of({
          success: false,
          message: error.message || 'Unknown error occurred',
        });
      }),
      map((res) => {
        console.log(res);
        return { success: true, user: res };
      })
    );
  }

  // Login user
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((res) => {
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('userid', res.userId);

        // Update the BehaviorSubjects
        this.isUserLoggedInSubject.next(true);
        this.currentUserRoleSubject.next(res.role);

        return { success: true, token: res.token, role: res.role };
      }),
      catchError((error) => {
        console.error(error);
        return of({ success: false, message: error.error || 'Login failed.' });
      })
    );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');

    // Reset BehaviorSubjects
    this.isUserLoggedInSubject.next(false);
    this.currentUserRoleSubject.next('Guest');
  }

  // Methods to expose the current state (optional, in case BehaviorSubjects aren't used directly)
  getIsUserLoggedIn(): boolean {
    return this.isUserLoggedInSubject.value;
  }

  getCurrentUserRole(): string {
    return this.currentUserRoleSubject.value;
  }
}


// New code
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'https://localhost:7050/api/User'; // Replace with your backend URL

//   // BehaviorSubjects to manage state
//   private isUserLoggedInSubject = new BehaviorSubject<boolean>(
//     !!localStorage.getItem('token') // Initialize with token presence
//   );
//   private currentUserRoleSubject = new BehaviorSubject<string>(
//     localStorage.getItem('userRole') || 'Guest' // Initialize with stored role
//   );

//   // Observables to expose state
//   isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();
//   currentUserRole$ = this.currentUserRoleSubject.asObservable();

//   constructor(private http: HttpClient) {}

//   // Register user
//   register(user: any): Observable<any> {
//     return this.http.post<any>(${this.apiUrl}/register, user).pipe(
//       catchError((error) => {
//         return of({
//           success: false,
//           message: error.message || 'Unknown error occurred',
//         });
//       }),
//       map((res) => {
//         console.log(res);
//         return { success: true, user: res };
//       })
//     );
//   }

//   // Login user
//   login(credentials: { username: string; password: string }): Observable<any> {
//     return this.http.post<any>(${this.apiUrl}/login, credentials).pipe(
//       map((res) => {
//         // Store the token and user role in localStorage
//         localStorage.setItem('token', res.token);
//         localStorage.setItem('userRole', res.role);

//         // Update the BehaviorSubjects
//         this.isUserLoggedInSubject.next(true);
//         this.currentUserRoleSubject.next(res.role);

//         return { success: true, token: res.token, role: res.role };
//       }),
//       catchError((error) => {
//         console.error(error);
//         return of({ success: false, message: error.error || 'Login failed.' });
//       })
//     );
//   }

//   // Logout user
//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userRole');

//     // Reset BehaviorSubjects
//     this.isUserLoggedInSubject.next(false);
//     this.currentUserRoleSubject.next('Guest');
//   }

//   // Update state for persistent login (optional utility method)
//   updateAuthState(isLoggedIn: boolean, role: string): void {
//     this.isUserLoggedInSubject.next(isLoggedIn);
//     this.currentUserRoleSubject.next(role);

//     // Persist state in localStorage
//     if (isLoggedIn) {
//       localStorage.setItem('token', 'persisted'); // Dummy token
//       localStorage.setItem('userRole', role);
//     } else {
//       localStorage.removeItem('token');
//       localStorage.removeItem('userRole');
//     }
//   }

//   // Expose the current login status
//   getIsUserLoggedIn(): boolean {
//     return this.isUserLoggedInSubject.value;
//   }

//   // Expose the current user role
//   getCurrentUserRole(): string {
//     return this.currentUserRoleSubject.value;
//   }
// }


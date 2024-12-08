// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../core/services/auth.service'; // Adjust the path as needed

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // Get the current user's role
//   const userRole = authService.getCurrentUserRole();

//   // Get the allowed roles for this route from the data property
//   const allowedRoles = route.data?.['roles'] as Array<string>;

//   // Allow navigation if the user's role is in the allowed roles
//   if (allowedRoles?.includes(userRole)) {
//     return true;
//   }

//   // Redirect to a default route or login if unauthorized
//   router.navigate(['/home']); // Adjust the path as needed
//   return false;
// };

//New Code
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service'; // Adjust the path as needed

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check login state and role using AuthService methods
  const isLoggedIn = authService.getIsUserLoggedIn();
  const userRole = authService.getCurrentUserRole();

  // Get allowed roles for this route
  const allowedRoles = route.data?.['roles'] as Array<string>;

  if (isLoggedIn && allowedRoles?.includes(userRole)) {
    // Allow navigation if logged in and role is authorized
    return true;
  }

  // Redirect to home page if not authorized
  router.navigate(['/home']); // Adjust as needed
  return false;
};

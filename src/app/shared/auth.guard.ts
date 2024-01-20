/**
 * Title: auth.guard.ts
 * Author: John Davidson
 * Date: 1/18/2024
 * Description: Route guard for authentication
 */

// Import modules and services.
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService); // injects the CookieService.

  // Check if the 'session_user' cookie is present.
  if (cookie.get('session_user')) {
    // If true, allow access and log a message to the console.
    console.log('You are logged in and have a valid session cookie set.')
    return true
  } else {
    // Otherwise, log a message and redirect to the sign in page.
    console.log('You must be logged in to access this page.');

    const router = inject(Router)
    router.navigate(['/security/signin'], { queryParams: { returnUrl: state.url }})
    return false;
  }
};

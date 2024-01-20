/**
 * Title: nav.component.ts
 * Author: John Davidson
 * Date: 1/18/2024
 * Description: Nav component
 */

// imports statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// Define an interface 'AppUser' representing the structure of an application user.
export interface AppUser {
  fullName: string;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  appUser: AppUser // Property to hold an instance of AppUser.
  isLoggedIn: boolean; // Property to track the user's login status.

  // Constructor function, executed when an instance of the class is created.
  constructor(private cookieService: CookieService) {
    this.appUser = {} as AppUser; // Initialize appUser as an empty object.

    // Check if a 'session_user' cookie is present to determine the user's login status.
    this.isLoggedIn = this.cookieService.get('session_user') ? true: false;

     // If the user is logged in, retrieve the 'session_name' cookie and set it as the user's full name.
    if (this.isLoggedIn) {
      this.appUser = {
        fullName: this.cookieService.get('session_name')
      }
      console.log(this.appUser.fullName)
    }
  }

  // Method for handling the signout action.
  signout() {
    console.log('Signing out...');
    this.cookieService.deleteAll(); // Delete all cookies.
    window.location.href = '/'; // Redirect to the root URL after signing out.
  }
}

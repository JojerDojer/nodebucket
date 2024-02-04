/**
 * Title: signin.component.ts
 * Author: John Davidson
 * Date: 1/18/2024
 * Description: Sign in component
 */

// Import statements
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SecurityService } from '../security.service';

// Interface representing the structure of a session user.
export interface SessionUser {
  empId: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  errorMessage: string; // Holds error message during sign-in attempts.
  sessionUser: SessionUser; // Represents the user's session information.
  isLoading: boolean = false; // Indicates whether a sign-in request is in progress.

  // Form group for the sign-in form with validation rules.
  signinForm = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  });

  // Constructor with dependency injection.
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private securityService: SecurityService,
    private fb: FormBuilder
  ) {
    this.sessionUser = {} as SessionUser; // Initialize the sessionUser object.
    this.errorMessage = ''; // Initialize the errorMessage.
  }

  // Method triggered when the sign-in button is clicked.
  signin() {
    this.isLoading = true; // set isLoading to true
    console.log("signinForm", this.signinForm.value);
    const empId = this.signinForm.controls['empId'].value; // get the empId from the signinForm

    // Validate the employee ID
    if (!empId || isNaN(parseInt(empId, 10))) {
      this.errorMessage = 'The employee ID is invalid. Please enter a number.'; // set the errorMessage
      this.isLoading = false; // set isLoading to false
      return;
    }

    // Call the security service to find employee by ID.
    this.securityService.findEmployeeById(empId).subscribe({
      next: (employee: any) => {
        console.log('employee', employee);

        this.sessionUser = employee;
        this.cookieService.set('session_user', empId, 1); // set the session_user cookie to the employee ID
        this.cookieService.set('session_name', `${employee.firstName} ${employee.lastName}`, 1); // set the session_name cookie to the employee's first and last name.

        // Get the returnUrl or use '/' if not provided, then navigate to it.
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

        this.isLoading = false;

        this.router.navigate([returnUrl]); // Navigate to the returnUrl.
      },
      error: (err) => {
        this.isLoading = false; // set isLoading to false

        // Handle error message (if available in the error response).
        if (err.error.message) {
          this.errorMessage = err.error.message;
          return;
        }

        // Fallback to the top-level error message if a structure error response is not found.
        this.errorMessage = err.message;
      }
    });
  }
}

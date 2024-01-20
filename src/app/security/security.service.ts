/**
 * Title: security.service.ts
 * Author: John Davidson
 * Date: 1/18/2024
 * Description: Security Service
 */

// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  // Method to find an employee by ID using an HTTP GET request.
  findEmployeeById(empId: number) {
    // Make an HTTP GET request to the '/api/employees/:empId' endpoint.
    return this.http.get('/api/employees/' + empId); // returns the employee object matching the empId
  }
}

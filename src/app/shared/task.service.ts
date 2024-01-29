/**
 * Title: task.service.ts
 * Author: John Davidson
 * Date: 1/24/2024
 * Description: Task service
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // get task
  getTasks(empId: number) {
    return this.http.get('/api/employees/' + empId + '/tasks'); // http://localhost:3000/api/employees/1/tasks
  }

  // create task
  addTask(empId: number, text: string) {
    return this.http.post('/api/employees/' + empId + '/tasks', { text }); // http://localhost:3000/api/employees/1/tasks
  }
}

/**
 * Title: task.service.ts
 * Author: John Davidson
 * Date: 1/24/2024
 * Description: Task service
 */

// Import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // get task
  getTasks(empId: number) {
    // HTTP GET request to fetch tasks for the given employee ID
    return this.http.get('/api/employees/' + empId + '/tasks'); // http://localhost:3000/api/employees/1/tasks
  }

  // create task
  addTask(empId: number, text: string) {
    // HTTP POST request to create a new task for the given employee ID with the provided text.
    return this.http.post('/api/employees/' + empId + '/tasks', { text }); // http://localhost:3000/api/employees/1/tasks
  }


  /**
   * @description deleteTask function removes a task for an employee by empId and taskId
   * @param empId
   * @param taskId
   * @returns status code 204 (no content)
   *
   */
  deleteTask(empId: number, taskId: string) {
    console.log('/api/employees/' + empId + '/tasks/' + taskId) // Log the taskId to the console.
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId) // make a delete request to the API
  }

  /**
   * @description updateTask function to modify a task in the todo/done array for an employee by empId.
   * @param empId
   * @param todo
   * @param done
   * @returns
   */
  updateTask(empId: number, todo: Item[], done: Item[]) {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }
}

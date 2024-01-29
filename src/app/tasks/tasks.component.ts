/**
 * Title: tasks.component.ts
 * Author: John Davidson
 * Date: 1/24/2024
 * Description: Tasks component
 */

// Import statements
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from '../shared/task.service';
import { Employee } from '../shared/employee.interface';
import { Item } from '../shared/item.interface';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

// Task class
export class TasksComponent {
  // Properties for the component.
  employee: Employee;
  empId: number;
  todo: Item[];
  done: Item[];
  errorMessage: string;
  successMessage: string;

  // Form for adding new tasks.
  newTaskForm: FormGroup = this.fb.group({
    text: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
  });

  constructor(private cookieService: CookieService, private taskService: TaskService, private fb: FormBuilder) {
    // Initialize component properties.
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];
    this.errorMessage = '';
    this.successMessage = '';

    // Get employee ID from the session cookie.
    this.empId = parseInt(this.cookieService.get('session_user'), 10);

    // Fetch tasks for the employee from the service.
    this.taskService.getTasks(this.empId).subscribe({
      next: (res: any) => {
        console.log('Employee', res);
        this.employee = res;
      },
      error: (err) => {
        console.error('error', err)
        this.errorMessage = err.message;
        this.hideAlert(); // hide alert
      },
      complete: () => {
        // Populate todo and done lists based on the employee's tasks.
        this.employee.todo ? this.done = this.employee.todo : this.todo = [];
        this.employee.done ? this.done = this.employee.done : this.done = [];
      }
    })
  }

  // Method to add a new task.
  addTask() {
    const text = this.newTaskForm.controls['text'].value;

    // Call the service to add a task.
    this.taskService.addTask(this.empId, text).subscribe({
      next: (task: any) => {
        console.log('Task added with id', task.id);
        const newTask = {
          _id: task.id,
          text: text
        }

        // Add the new task to the todo list.
        this.todo.push(newTask);
        this.newTaskForm.reset(); // Reset form

        // Display success message.
        this.successMessage = 'Task added successfully';

        this.hideAlert(); // hide alert after 5 seconds
      },
      error: (err) => {
        console.log('error', err);
        this.errorMessage = err.message;
        this.hideAlert(); // hide alert after 5 seconds
      }
    });
  }

  // Method to hide error and success messages after 5 seconds.
  hideAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 5000)
  }
}

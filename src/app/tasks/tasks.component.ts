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
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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
    // Retrieve the task text from the add form.
    const text = this.newTaskForm.controls['text'].value;

    // Call the service to add a task and subscribe to the observable.
    this.taskService.addTask(this.empId, text).subscribe({
      // Logic for handling the successful addition of a task.
      next: (task: any) => {
        console.log('Task added with id', task.id);

        // Create a new task object with ID and text.
        const newTask = {
          _id: task.id,
          text: text
        }

        this.todo.push(newTask); // Add the new task to the todo list.
        this.newTaskForm.reset(); // Reset form.

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

  // Method to delete a task.
  deleteTask(taskId: string) {
    console.log(`Task item: ${taskId}`)

    // Display a confirmation dialog
    if (!confirm('Are you sure you want to delete this task?')) {
      return
    }

    // Call the deleteTask() function on the taskService and subscribe to the observable and pass in the empId and taskId
    this.taskService.deleteTask(this.empId, taskId).subscribe({
      // Logic for handling the successful deletion of a task.
      next: (res: any) => {
        console.log('Task deleted with id', taskId)

        // Ensure todo and done arrays are initialized.
        if (!this.todo) this.todo = [];
        if (!this.done) this.done = [];

        // Filter and remove the deleted task from he todo and done arrays.
        this.todo = this.todo.filter(t => t._id.toString() !== taskId)
        this.done = this.done.filter(t => t._id.toString() !== taskId)

        this.successMessage = 'Task deleted successfully!' // Set the success message

        this.hideAlert() // Call the hideAlert function
      },
      // If there is an error, log it to the console and set the error message.
      error: (err) => {
        console.log('error', err)
        this.errorMessage = err.message

        this.hideAlert() // Call the hideAlert function
      }
    })
  }

  // Method to handle drag-and-drop events.
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // If the item is dropped in the same container, move it to the new index
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)

      console.log('Moved item in array', event.container.data) // Log the new array to the console.

      // Call the updateTaskList() function and pass in the empId, todo and done arrays
      this.updateTaskList(this.empId, this.todo, this.done)
    } else {
      // If the item is dropped in a different container, move it to the new container
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )

      console.log('Moved item in array', event.container.data) // Log the new array to the console.

      // Call the updateTaskList() function and pass in the empId, todo and done arrays
      this.updateTaskList(this.empId, this.todo, this.done)
    }
  }


  // Method to hide error and success messages after 5 seconds.
  hideAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 5000)
  }

  // Method to update task lists on the server
  updateTaskList(empId: number, todo: Item[], done: Item[]) {
    // Call the updateTask service method and subscribe to the observable.
    this.taskService.updateTask(empId, todo, done).subscribe({
      // Logic for handling the successful update of task lists.
      next: (res: any) => {
        console.log('Task updated successfully')
      },
      error: (err) => {
        console.log('error', err) // Log the error to the console.
        this.errorMessage = err.message // Set the error message
        this.hideAlert() // Call the hideAlert function
      }
    })
  }
}

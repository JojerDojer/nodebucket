/**
 * Title: employee.interface.ts
 * Author: John Davidson
 * Date: 1/24/2024
 * Description: Employee interface
 */

import { Item } from './item.interface';

// Interface representing an employee in the application.
export interface Employee {
  empId: number;
  todo: Item[];
  done: Item[];
}
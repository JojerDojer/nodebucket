/**
 * Title: app.component.ts
 * Author: John Davidson
 * Date: 1/18/2024
 * Description: app component
 */

// imports statements
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This router-outlet displays the content of the BaseLayout or AuthLayout components -->
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
}

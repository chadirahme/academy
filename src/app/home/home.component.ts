// import { Component, OnInit } from '@angular/core';
// import {AuthGuard} from "../core/auth.guard";
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
//   providers: [AuthGuard]
// })
// export class HomeComponent implements OnInit {
//
//   //https://stackblitz.com/edit/angular-material2-grid-example?embed=1&file=app/app.component.html&hideNavigation=1
//
//   constructor() { }
//
//   ngOnInit() {
//   }
//
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // template: `
  //   <p>Yay! You are logged in!</p>
  // `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}

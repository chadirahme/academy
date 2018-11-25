// import {Component, OnInit, Input} from '@angular/core';
// import {Title} from "@angular/platform-browser";
// import {Observable} from "rxjs";
// import {AuthService} from "./core/auth.service";
// import {AuthGuard} from "./core/auth.guard";
//
// @Component({
//   selector: 'app-root',
//   template: '<router-outlet></router-outlet>', //'./app.component.html',
//   styleUrls: ['./app.component.css'],
//   providers: [AuthService,AuthGuard]
// })
// export class AppComponent implements OnInit{
//   title = 'American Academy School';
//   isLoggedIn$: Observable<boolean>;
//   @Input() public isUserLoggedIn: boolean;
//
//   ngOnInit() {
//     this.authService.getEmitter().subscribe((customObject) => {
//       console.log("Component is notified of successfull login!");
//     });
//     this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
//   }
//
//   public constructor(private titleService: Title,private authService: AuthService ) { }
//
//   public setTitle( newTitle: string) {
//     this.titleService.setTitle( newTitle );
//   }
//
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {}

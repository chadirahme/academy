import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-teacherheader',
  templateUrl: './teacherheader.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `
  ]
})
export class TeacherheaderComponent implements OnInit{

  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService,private titleService: Title) {
    this.isLoggedIn$ = authService.isLoggedIn2();
    console.log("at constructor header>> "+ this.isLoggedIn$);

  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn2();
    console.log("at ngOnInit header>> "+ this.isLoggedIn$);
    // this.authService.getEmitter().subscribe((customObject) => {
    //   console.log("Component is notified of successfull login!");
    // });

    //this.isLoggedIn$ = this.authService.getIsLoggedIn; // {2}
    //this.authService.IsLoggedIn.subscribe(value => console.log("at header>> "+ value));
  }

  onLogout() {
    this.authService.logout();
  }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}

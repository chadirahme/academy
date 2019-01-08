import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Title} from "@angular/platform-browser";
import {Observable} from "rxjs";

@Component({
  selector: 'app-teacherheader',
  templateUrl: './teacherheader.component.html',
  styleUrls: ['./teacherheader.component.css'],
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

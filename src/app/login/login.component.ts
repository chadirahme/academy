// import { Component, OnInit } from '@angular/core';
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//
//   constructor(private router: Router) { }
//
//   username: string;
//   password: string;
//
//   ngOnInit() {
//   }
//   login() : void {
//     if(this.username == 'admin' && this.password == 'admin'){
//       this.router.navigate(["user"]);
//     }else {
//       alert("Invalid credentials");
//     }
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {CarService} from "../shared/car.service";
import {AuthService} from "../core/auth.service";
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  cars: Array < any >;
  username: string;
  password: string;



  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {

    // this.loginForm = new FormGroup({
    //   username: new FormControl(),
    //   password: new FormControl()
    // });

    // this.authService.attemptAuth(this.username, this.password).subscribe(
    //   data => {
    //     this.token.saveToken(data.token);
    //     this.router.navigate(['user']);
    //   }
    // );

  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      //alert('Invliad');
      return;
    }
    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

    console.log(loginPayload);
    this.authService.attemptAuth(loginPayload.username,loginPayload.password).subscribe(data => {
      //alert(data);
      if(data) {

        //window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['teacher']);
      }else {
        this.invalidLogin = true;
        alert('Invalid Username or Password !!');
      }
    });

  }

  ngOnInit() {
    try {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.required]
      });

      console.log('ssss');

      // this.authService.getAll().subscribe(data => {
      //   this.cars = data;
      //   for (const car of this.cars) {
      //     console.log(car.userName);
      //   }
      // });


      //this.authService.getAll();
    }

    catch (e) {
      console.log(e);
    }
  }


}

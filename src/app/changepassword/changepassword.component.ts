import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  providers: [AuthService]
})
export class ChangepasswordComponent implements OnInit {

  loginForm: FormGroup;

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

  ngOnInit() {
    try {
      this.loginForm = this.formBuilder.group({
        username: new FormControl({value: localStorage.getItem('userName'), disabled: true}, Validators.required),
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required],
      });
    }

    catch (e) {
      console.log(e);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let pass = this.loginForm.controls.password.value;
      let confirmPass = this.loginForm.controls.confirmpassword.value;

      if(pass === confirmPass) {
        this.authService.changePassword(this.loginForm.value);
        //alert('done');
      }else{
        alert('Passwords not matched !!')
      }
    }
  }

}

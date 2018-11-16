import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {RegisterComponent} from "./register/register.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {MatFormFieldModule} from "@angular/material";


const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'teacher', component: TeacherComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

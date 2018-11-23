import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {UserComponent} from "./user/user.component";
import {RegisterComponent} from "./register/register.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {MatFormFieldModule} from "@angular/material";
import {StudentComponent} from "./student/student.component";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home/home.component";
import {OurschoolComponent} from "./ourschool/ourschool.component";


const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'student', component: StudentComponent },
  {path: 'ourschool' , component: OurschoolComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

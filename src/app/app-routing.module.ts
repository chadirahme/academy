// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import {LoginComponent} from "./login/login.component";
// import {UserComponent} from "./user/user.component";
// import {RegisterComponent} from "./register/register.component";
// import {TeacherComponent} from "./teacher/teacher.component";
// import {MatFormFieldModule} from "@angular/material";
// import {StudentComponent} from "./student/student.component";
// import {AppComponent} from "./app.component";
// import {HomeComponent} from "./home/home.component";
// import {OurschoolComponent} from "./ourschool/ourschool.component";
// import {AuthGuard} from "./core/auth.guard";
//
//
// const routes: Routes = [
//   { path: 'user', component: UserComponent },
//   { path: 'login', component: LoginComponent },
//   {path : '', component : HomeComponent,canActivate: [AuthGuard]},
//   { path: 'register', component: RegisterComponent },
//   { path: 'teacher', component: TeacherComponent },
//   { path: 'student', component: StudentComponent },
//   {path: 'ourschool' , component: OurschoolComponent}
// ];
//
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes,{ useHash: true })],
//   exports: [RouterModule],
//   providers: [
//     AuthGuard
//   ]
// })
// export class AppRoutingModule { }

//https://onehungrymind.com/named-router-outlets-in-angular-2/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./core/auth.guard";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {HomeLayoutComponent} from "./layouts/home-layout.component";
import {LoginLayoutComponent} from "./layouts/login-layout.component";
import {TeacherComponent} from "./teacher/teacher.component";
import {StudentComponent} from "./student/student.component";
import {OurschoolComponent} from "./ourschool/ourschool.component";
import {MarksComponent} from "./marks/marks.component";
import {TeacherdashboardComponent} from "./teacherdashboard/teacherdashboard.component";
import {TeacherLayoutComponent} from "./layouts/teacher-layout.component";
import {ChangepasswordComponent} from "./changepassword/changepassword.component";
import {StudentlistComponent} from "./admin/studentlist/studentlist.component";
const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: TeacherLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'teacher',
        component: TeacherdashboardComponent
      }
    ]
  },
  {
    path: '',
    component: TeacherLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'teacherassignment',
        component: TeacherComponent
      }
    ]
  },
  {
    path: '',
    component: TeacherLayoutComponent,
    //canActivate: [AuthGuard], changepassword
    children: [
      {
        path: 'changepassword',
        component: ChangepasswordComponent
      }
    ]
  },

  {
    path: '',
    component: HomeLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'student',
        component: StudentComponent
      }
    ]
  },

  {
    path: '',
    component: TeacherLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'marks',
        component: MarksComponent
      }
    ]
  },

  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: 'ourschool',
        component: OurschoolComponent
      }
    ]
  },
  {
    path: '',
    component: TeacherLayoutComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'studentlist',
        component: StudentlistComponent
      }
    ]
  },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {}

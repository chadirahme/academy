import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {CustomMaterialModule} from "./material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./core/auth.service";
import {CarService} from "./shared/car.service";
import {HttpClientModule} from "@angular/common/http";
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { OurschoolComponent } from './ourschool/ourschool.component';
import {HomeLayoutComponent} from "./layouts/home-layout.component";
import {LoginLayoutComponent} from "./layouts/login-layout.component";
import {HeaderComponent} from "./header/header.component";
import {AuthGuard} from "./core/auth.guard";
import { MarksComponent } from './marks/marks.component';
import { TeacherdashboardComponent } from './teacherdashboard/teacherdashboard.component';
import {TeacherLayoutComponent} from "./layouts/teacher-layout.component";
import {TeacherheaderComponent} from "./header/teacherheader.component";
import {MarksPipe} from "./common/marks.pipe";
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { StudentlistComponent } from './admin/studentlist/studentlist.component';
import {Ng2SmartTableModule} from "ng2-smart-table";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    TeacherComponent,
    StudentComponent,
    HomeComponent,
    OurschoolComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent,
    TeacherheaderComponent,
    MarksComponent,
    TeacherdashboardComponent,
    TeacherLayoutComponent,
    MarksPipe,
    ChangepasswordComponent,
    StudentlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ],
  providers: [CarService,FormBuilder,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

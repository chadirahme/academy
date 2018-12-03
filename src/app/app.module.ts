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
    MarksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CarService,FormBuilder,AuthGuard,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

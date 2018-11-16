import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  loginForm: FormGroup;
  username: string;
  password: string;
  public years: any[];
  public grades: any[];
  public classes: any[];
  public subjects: any[];
  public types: any[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.years =["2017-2018","2016-2017","2015-2016","2014-2015"];
    this.grades =["KG1","KG2","Grade1","Grade2","Grade3","Grade4","Grade5","Grade6","Grade7",
    "Grade8","Grade9","Grade10","Grade11","Grade12"];
    this.classes=["A","B","C","D","E","F"];
    this.subjects=["English","Maths","Science","Social","IT","Regular Arabic","Religion Islamic",
    "Qatar History" , "Art","Physics","Biology","Chemistry","Other"];

    this.types=["Work sheet","Projects","Academic Overview","Text Book","Memo","Home Work Sheet",
    "Study Guide","Time Table"];


    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

}

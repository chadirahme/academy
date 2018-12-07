import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css'],
  providers: [AuthService]
})
export class TeacherdashboardComponent implements OnInit {

  userId: any;
  usertype: any;
  semesterid: number;
  public years: any[];
  public grades: any[];
  public classes: any[];
  public subjects: any[];
  public types: any[];
  public selectedYear: any;
  public selectedGrade: any;
  public selectedClass: any;
  public selectedSubject: any;
  public selectedType: any;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) {
    this.userId = localStorage.getItem('userId');
    this.usertype = localStorage.getItem('usertype');
    if(this.usertype!="1")
    {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    this.years = ["2018-2019", "2017-2018", "2016-2017", "2015-2016", "2014-2015"];
    if (this.userId == 3) {
      this.grades = ["Grade8", "Grade9", "Grade10"];
      this.classes=["A","B","C"];
      this.subjects=["IT"];

    }
    else if (this.userId == 25) {
      this.grades = ["Grade8", "Grade9", "Grade10"];
      this.classes=["A","B","C"];
      this.subjects=["Maths"];
    }

    else {
    this.grades = ["KG1", "KG2", "Grade1", "Grade2", "Grade3", "Grade4", "Grade5", "Grade6", "Grade7",
      "Grade8", "Grade9", "Grade10", "Grade11", "Grade12"];
      this.classes=["A","B","C","D","E","F"];
      this.subjects=["English","Maths","Science","Social","IT","Regular Arabic","Religion Islamic",
        "Qatar History" , "Art","Physics","Biology","Chemistry","Other"];
    }


    this.types=["Semester 1" , "Semester 2"];

  }

  onSubmit(): void {

    let newItem = {
      academicyear: this.selectedYear,
      semester: this.semesterid,
      grade: this.selectedGrade,
      section: this.selectedClass,
      teacherid: this.userId,
      subject: this.selectedSubject
    };

    if(newItem.academicyear==null){
      alert('Please select a year !!');
      return;
    }
    if(newItem.semester==null){
      alert('Please select semester !!');
      return;
    }

    if(newItem.grade==null){
      alert('Please select a grade !!');
      return;
    }
    if(newItem.section==null){
      alert('Please select a class !!');
      return;
    }
    if(newItem.subject==null){
      alert('Please select a subject !!');
      return;
    }
    if(newItem.teacherid==null){
      alert('Please Login again !!');
      return;
    }


    // var testObject ={academicyear:"test", time:"Date 2017-02-03T08:38:04.449Z"};
    localStorage.setItem('newItem', JSON.stringify(newItem));
    this.router.navigate(['marks']);
  }

  changeYear(val){
    this.selectedYear=val;
    console.log(this.selectedYear);
  }
  changeGrade(val){
    this.selectedGrade=val;
    console.log(this.selectedGrade);
  }
  changeClass(val){
    this.selectedClass=val;
    console.log(this.selectedClass);
  }
  changeSubject(val){
    this.selectedSubject=val;
    console.log(this.selectedSubject);
  }
  changeType(val){
    console.log(val);
    if(val=='Semester 1')
      this.semesterid=1;
    else
      this.semesterid=2;

    this.selectedType=val;
    console.log(this.semesterid);
  }

}

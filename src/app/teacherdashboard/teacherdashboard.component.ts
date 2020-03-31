import { Component, OnInit } from '@angular/core';
import {AuthService} from "../core/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SetupData} from "../common/setupdata";

@Component({
  selector: 'app-teacherdashboard',
  templateUrl: './teacherdashboard.component.html',
  styleUrls: ['./teacherdashboard.component.css'],
  providers: [AuthService]
})
export class TeacherdashboardComponent implements OnInit {

  mainForm: FormGroup;
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
    this.years = SetupData.academicyears;
    if (this.userId == 300) {
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
      this.grades = SetupData.grades;
      this.classes=SetupData.classes;
      this.subjects=SetupData.subjects;
    }


    this.types=SetupData.semesters;
    //set defualt value for dropdown
    this.mainForm = this.formBuilder.group({
      ddlYear: [this.years[0]],
      ddlSemester: [this.types[0]],
      ddlGrade: [this.grades[0]],
      ddlClass: [this.classes[0]],
      ddlSubject: [this.subjects[0]],
    });

    this.selectedYear=this.years[0];
    this.changeType(this.types[0]);
    this.selectedGrade=this.grades[0];
    this.selectedClass=this.classes[0];
    this.selectedSubject=this.subjects[0];

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

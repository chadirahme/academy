import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../core/auth.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  providers: [AuthService]
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

  public selectedYear: any;
  public selectedGrade: any;
  public selectedClass: any;
  public selectedSubject: any;
  public selectedType: any;
  private file: FileUploadModel;

  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private formBuilder: FormBuilder,private authService: AuthService) {
    this.file=new FileUploadModel();
  }

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

  onSubmit(): void {
    this.file.year=this.selectedYear;
    this.file.grade=this.selectedGrade;
    this.file.fileclass=this.selectedClass;
    this.file.subject=this.selectedSubject;
    this.file.filetype=this.selectedType;
    console.log(this.file);

    this.currentFileUpload = this.selectedFiles.item(0);
    //this.file.file= this.currentFileUpload;
    this.authService.pushFileToStorage(this.currentFileUpload,this.file).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });
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
    this.selectedType=val;
    console.log(this.selectedType);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);
  }

}

export class FileUploadModel {
  year ?: string;
  grade: string;
  fileclass: string;
  subject: string;
  filetype: string;
}

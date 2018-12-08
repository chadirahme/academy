import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material";
import {AuthService} from "../core/auth.service";
import {Student} from "../core/student";
import {FileUploadModel} from "../teacher/teacher.component";

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css'],
  providers: [AuthService]
})
export class MarksComponent implements OnInit {

  pageFilter: any;
  pageHeader: any;
  newItem: any;
  student: Student[];
  item: Student;
  data : Student[];
  index: number;
  private userId: string;
  private userName: string;
  avaregQuiz: number;
  columns = [
   // {columnDef: 'sid', header: 'sid', cell: (element: Marks) => `${element.sid}`},
    {columnDef: 'sno', header: 'No.', cell: (element: Marks) => `${element.sno}`},
    {columnDef: 'studentname', header: 'Name', cell: (element: Marks) => `${element.studentname}`},
    {columnDef: 'cw', header: 'CW.', cell: (element: Marks) => `${element.cw}`},
    {columnDef: 'hw', header: 'HW', cell: (element: Marks) => `${element.hw}`},
    {columnDef: 'project', header: 'project', cell: (element: Marks) => `${element.project}`},
    {columnDef: 'quiz1', header: 'quiz1', cell: (element: Marks) => `${element.quiz1}`},
    {columnDef: 'quiz2', header: 'quiz2', cell: (element: Marks) => `${element.quiz2}`},
    {columnDef: 'quiz3', header: 'quiz3', cell: (element: Marks) => `${element.quiz3}`},
    {columnDef: 'avgquiz', header: 'avgquiz', cell: (element: Marks) => `${element.avgquiz}`},
    {columnDef: 'test1', header: 'test1', cell: (element: Marks) => `${element.test1}`},
    {columnDef: 'finalexam', header: 'finalexam', cell: (element: Marks) => `${element.finalexam}`},
    {columnDef: 'finalmark', header: 'finalmark', cell: (element: Marks) => `${element.finalmark}`},
    {columnDef: 'marksLetter', header: 'marksLetter', cell: (element: Marks) => `${element.marksLetter}`},
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private authService: AuthService) {

    this.userId=localStorage.getItem('userId');
    this.userName=localStorage.getItem('userName');
    this.avaregQuiz=10;

    this.newItem = JSON.parse(localStorage.getItem('newItem'));
    //Semester:1  Algebra 1  Grade:8A Teacher: Nizar Ali
    this.pageFilter="Semester:" + this.newItem.semester + " Subject: " +this.newItem.subject + " " + this.newItem.grade + " " + this.newItem.section
                    + " Teacher: " + this.userName;

    if(this.newItem.semester==1)
    this.pageHeader="FIRST TERM MARKS - Academic Year " + this.newItem.academicyear;
    else
      this.pageHeader="SECOND TERM MARKS - Academic Year " + this.newItem.academicyear;
    //console.log(this.newItem.academicyear);
  }

  ngOnInit() {

    this.data=[];
    this.loadData();

    // for (let i = 1; i < 10; i++) {
    //   let newName = {
    //     sno:i.toString(),
    //     name:"Abdallah Mansour Mahmoud Alrahamneh " + i,
    //     cw: 0,
    //     hw:10,
    //     project:0,
    //     quiz1:0,
    //     quiz2:0,
    //     quiz3:0,
    //     avgquiz:0,
    //     test1:0,
    //     finalexam:0,
    //     finalgrade:0
    //
    //   };
    //   this.data.push(newName);
    // }

    //this.dataSource = new MatTableDataSource(this.data);
  }
  onSubmit(): void {
    console.log("submit");
    //console.log(this.data);
    this.authService.saveMarks(this.data).subscribe(data => {
      if (data) {
        alert('saved..');
      }
    });
  }

  loadData(): void {
    try
    {
      console.log("loadData>> "+ this.newItem);
      this.authService.getStudentMarks(this.newItem).subscribe(data => {
        //this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        this.student=data;
        this.loadStudentData();
        // for (const car of this.student) {
        //   console.log(car.studentname);
        // }
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  loadData1(): void {
    try
    {
      console.log("grade>> "+ this.newItem.grade);
      this.authService.getStudentGradeAndSection(this.newItem.grade , this.newItem.section).subscribe(data => {
        //this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        this.student=data;
        this.loadStudentData();
         // for (const car of this.student) {
         //   console.log(car.studentname);
         // }
      });

    }
    catch (e) {
      console.log(e);
    }
  }

  loadStudentData(): void {
    this.data=[];
    this.index=0;
    for (const item of this.student) {
      this.index++;
      let newName = {
        sno:this.index.toString(),
        studentid:item.studentid,
        studentname:item.studentname.toUpperCase(),
        cw: item.cw,
        hw:item.hw,
        project:item.project,
        quiz1:item.quiz1,
        quiz2:item.quiz2,
        quiz3:item.quiz3,
        avgquiz:item.avgquiz,
        test1:item.test1,
        finalexam:item.finalexam,
        finalmark:item.finalmark,

        //use this to get lstMarks.get(0) when saving
        academicyear: this.newItem.academicyear,
        semester: this.newItem.semester,
        grade: this.newItem.grade,
        section: this.newItem.section,
        teacherid: this.userId,
        teachername:this.userName,
        subject: this.newItem.subject,
        marksLetter : this.getGradeLetter(item.finalmark)

      };
      this.data.push(newName);
    }

    this.dataSource = new MatTableDataSource(this.data);
  }

  checkCW1(row,type)
  {
    // let value = parseInt(val);
    // value=value*1;
    // if(value<0 || value >10)
    // alert('worong');
    //this.avaregQuiz=4;
    this.item=row; //this.data[index];
    if(type=='cw') {
      let value = Number(this.item.cw);
      if(value==0)
        value=-1;
      if (value < 0 || value > 10) {
        alert('Please enter a mark between 0 and 10 !! ');
        this.item.cw = 0;
      }
    }
    else if(type=='hw') {
      let value = Number(this.item.hw);
      if(value==0)
        value=-1;
      if (value < 0 || value > 10) {
        alert('Please enter a mark between 0 and 10 !! ');
        this.item.hw = 0;
      }
    }

    this.calFinalGrade(index);
  }

  checkCW(index,type)
  {
    // let value = parseInt(val);
    // value=value*1;
    // if(value<0 || value >10)
    // alert('worong');
    //this.avaregQuiz=4;
    console.log(index);
    this.item=this.data[index];
    if(type=='cw') {
      let value = Number(this.item.cw);
      if(value==0)
        value=-1;
      if (value < 0 || value > 10) {
        alert('Please enter a mark between 0 and 10 !! ');
        this.item.cw = 0;
      }
    }
    else if(type=='hw') {
      let value = Number(this.item.hw);
      if(value==0)
        value=-1;
      if (value < 0 || value > 10) {
        alert('Please enter a mark between 0 and 10 !! ');
        this.item.hw = 0;
      }
    }

    this.calFinalGrade(index);
  }
  checkHW(index)
  {
    this.item=this.data[index];
    let value = Number(this.item.hw);
    if(value==0)
      value=-1;

    //value=value*1;
    if(value<0 || value >10) {
      alert('Please enter a mark between 0 and 10 !! ');
      this.item.hw = 0;
    }
    this.calFinalGrade(index);
    //this.avaregQuiz=4;
  }
  checkProject(index)
  {
    this.item=this.data[index];
    let value = Number(this.item.project);
    if(value==0)
      value=-1;
    //value=value*1;
    if(value<0 || value >5) {
      alert('Please enter a mark between 0 and 5 !! ');
      this.item.project = 0;
    }
    this.calFinalGrade(index);
  }

  checkQuiz1(index)
  {
    this.item=this.data[index];
    let value = Number(this.item.quiz1);
    if(value==0)
      value=-1;
    if(value<0 || value >10) {
      alert('Please enter a mark between 0 and 10 !! ');
      this.item.quiz1 = 0;
      this.calAvgQuiz(index);
    }
  }
  checkQuiz2(index)
  {
    this.item=this.data[index];
    let value = Number(this.item.quiz2);
    if(value==0)
      value=-1;
    if(value<0 || value >10) {
      alert('Please enter a mark between 0 and 10 !! ');
      this.item.quiz2 = 0;
      this.calAvgQuiz(index );
    }
  }
  checkQuiz3(index)
  {
    this.item=this.data[index];
    let value = Number(this.item.quiz3);
    if(value==0)
      value=-1;
    if(value<0 || value >10) {
      alert('Please enter a mark between 0 and 10 !! ');
      this.item.quiz3 = 0;
      this.calAvgQuiz(index );
    }
  }

  calAvgQuiz(index ) {

    this.item=this.data[index];
    //this.avaregQuiz= searchValue;
    //console.log(this.item.quiz3 + this.item.quiz1);
    this.item.avgquiz=Math.round( ( this.item.quiz1 + this.item.quiz2 + this.item.quiz3)/3);
    this.calFinalGrade(index);
  }

  checkTest1(index)
  {
    this.item=this.data[index];
    let value = Number(this.item.test1);
    if(value==0)
      value=-1;
    if(value<0 || value >100) {
      alert('Please enter a mark between 0 and 100 !! ');
      this.item.test1 = 0;
    }
    this.calFinalGrade(index);
  }
  checkFinalExam(index){
    this.item=this.data[index];
    let value = Number(this.item.finalexam);
    if(value==0)
      value=-1;
    if(value<0 || value >100) {
      alert('Please enter a mark between 0 and 100 !! ');
      this.item.finalexam = 0;
    }
    this.calFinalGrade(index);
  }
  //FinalGrade=( CW + HW + Project ) + ( (Quiz1+Quiz2+Quiz3)/3 )*1.5 + ( (Test1+Test2)/2 ) * 0.2 + (FinalExam*0.4)
  calFinalGrade(index ) {

    this.item=this.data[index];
    //this.avaregQuiz= searchValue;
    //console.log(this.item.quiz3 + this.item.quiz1);
    this.item.finalmark=Math.round( (this.item.hw + this.item.cw + this.item.project)  + (this.item.avgquiz *1.5)
      + (this.item.test1*0.2)  + (this.item.finalexam *0.4) ) ;
    this.item.marksLetter = this.getGradeLetter(this.item.finalmark);
  }

  getGradeLetter(x)
  {
    //const x = this.item.finalmark;
    switch (true) {
      case (x>= 97):
        return "A+";
        break;
      case (x < 97 && x >=93):
        return "A";
        break;
      case (x < 93 && x >=90):
        return "A-";
        break;
      case (x < 90 && x >=87):
        return "B+";
        break;
      case (x < 87 && x >=83):
        return "B";
        break;
      case (x < 83 && x >=80):
        return "B-";
        break;
      case (x < 80 && x >=77):
        return "C+";
        break;
      case (x < 77 && x >=73):
        return "C";
        break;
      case (x < 73 && x >=70):
        return "C-";
        break;
      case (x < 70 && x >=67):
        return "D+";
        break;
      case (x < 67 && x >=65):
        return "D";
        break;
      case (x < 65):
        return "F";
        break;
      default:
        return "F";
        break;
    }
  }

}

export class Marks {
  studentid: number;
  studentname: string;
  sno: number;
  cw: number;
  hw: number;
  project: number;
  quiz1: number;
  quiz2: number;
  quiz3: number;
  avgquiz: number;
  test1: number;
  test2: number;
  finalexam: number;
  finalmark: number;
//String academicyear,int semester,String grade,String section,int teacherid,String subject
  academicyear: string;
  semester: number;
  grade: string;
  section: string;
  teacherid: number;
  subject: string;
  marksLetter: string;

  get Studentname(){
    return this.studentname.toUpperCase();
  }
}


  export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  //cw: number;
  //hw: number;

}

const data1: Element[] = [
  {position: 1, name: 'Abdallah Mansour Mahmoud Alrahamneh', weight: 1.0079, symbol: 'H' },
  {position: 2, name: 'Abdalrhman Taha Mohamed Mohamed Taha Hussein', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Abdelrahman Mohd Abdelrahman Eleish', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Ayan Ahmad', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Buchra Naser Jamal Eddin', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Ehsan Ayman Rabata', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Elijah Zane Lira', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Emad Ismail Mohamed Ismail Eid', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Essa Mohammad Hamdan', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Fatima Abdulaziz Mulla Zainal Al-Mulla', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Ibrahim Riad Mostafa Mohamed Maree', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Jad Ishaq Yousef Abu Alia', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Judie Amr Abdelsattar Fadl', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Karim Moh\'d Kamal Ghanaim', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Mazin Ahmed El-Kishif Mohamed', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Milad Mohammad Shahaby', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Misha Samantha Panganiban Paco', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Mostafa Husam Al-Haj Kadour', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Muhammed Zidan', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Najemeddin Yahya Al-Kurdi', weight: 40.078, symbol: 'Ca'},
];

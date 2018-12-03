import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {DataSource} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material";
import {AuthService} from "../core/auth.service";
import {Student} from "../core/student";

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.css'],
  providers: [AuthService]
})
export class MarksComponent implements OnInit {

  student: Student[];
  data : any[];
  index: number;
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
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new MatTableDataSource();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  constructor(private authService: AuthService) {
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
      console.log("grade>> "+ localStorage.getItem('grade'));
      this.authService.getStudentGradeAndSection("Grade8" , "A").subscribe(data => {
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
        studentname:item.studentname,
        cw: 0,
        hw:10,
        project:0,
        quiz1:0,
        quiz2:0,
        quiz3:0,
        avgquiz:0,
        test1:0,
        finalexam:0,
        finalmark:0,

        academicyear: '2018-2019',
        semester: 1,
        grade: 'Grade10',
        section: 'A',
        teacherid: 3,
        teachername:'Chadi',
        subject: 'IT'

      };
      this.data.push(newName);
    }

    this.dataSource = new MatTableDataSource(this.data);
  }
}

export interface Marks {
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
  finalexam: number;
  finalmark: number;
//String academicyear,int semester,String grade,String section,int teacherid,String subject
  academicyear: string;
  semester: number;
  grade: string;
  section: string;
  teacherid: number;
  subject: string;

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

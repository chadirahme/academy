import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder} from "@angular/forms";
import {AuthService} from "../core/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {MatTableDataSource, MatPaginator} from "@angular/material";
import {Router} from "@angular/router";
// import {DataSource} from '@angular/cdk/collections';

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
  invalidLogin: boolean = false;
  result: any;
  fileUploads: Observable<string[]>;

  selectedFiles: FileList;
  currentFileUpload: File;
   displayedColumns: string[] = ['academicyear','grade', 'section', 'subject','filetype','filename' ,'filepath','id'];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //dataSource: MatTableDataSource<Assignment>;
  //dataSource = new MatTableDataSource();

  //displayedColumns = ['position'];
  dataSource = new MatTableDataSource();
  private userId: string;
  private usertype: string;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) {
    this.file=new FileUploadModel();
    this.userId = localStorage.getItem('userId');
    this.usertype = localStorage.getItem('usertype');
    if(this.usertype!="1")
    {
      this.router.navigate(['login']);
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.years =["2018-2019","2017-2018","2016-2017","2015-2016","2014-2015"];
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


    this.loadData();

  }


  loadData(): void {
    try
    {
      this.authService.getTeacherAssignment(this.userId).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        //this.dataSource.paginator = this.paginator;
        // this.fileUploads =data;
        // for (const car of data) {
        //   console.log(car);
        // }
      });

    }
    catch (e) {
      console.log(e);
    }
  }
  onSubmit(): void {
    this.file.year=this.selectedYear;
    this.file.grade=this.selectedGrade;
    this.file.section=this.selectedClass;
    this.file.subject=this.selectedSubject;
    this.file.filetype=this.selectedType;
    this.file.description="desc";
    this.file.teacherid=this.userId;
    console.log(this.file);

    //this.selectedFiles = undefined;

    if(this.file.year==null){
      alert('Please select a year !!');
      return;
    }
    if(this.file.grade==null){
      alert('Please select a grade !!');
      return;
    }
    if(this.file.section==null){
      alert('Please select a class !!');
      return;
    }
    if(this.file.subject==null){
      alert('Please select a subject !!');
      return;
    }
    if(this.file.filetype==null){
      alert('Please select a type !!');
      return;
    }

    if(this.selectedFiles==null){
      alert('Please select a file !!');
      return;
    }


    this.currentFileUpload = this.selectedFiles.item(0);
    //this.file.file= this.currentFileUpload;
    this.authService.pushFileToStorage(this.currentFileUpload,this.file).subscribe(data => {
      if(data){ //instanceof HttpResponse) {
        console.log(data["message"]);
        this.result=data["message"];
        this.invalidLogin=true;
        this.selectedFiles=null;
        this.loadData();
      }
    });

  }
  onDelete(id: string) {
    console.log(id);
    this.authService.deleteAssignment(id).subscribe(data => {
      if (data) {
        this.loadData();
      }
    });
  }

  onExport(filename: string) {
    try {
      console.log(filename);
      //return ;
      this.authService.getFiles(filename).subscribe(data => {
        console.log('done');
        let blob = new Blob([data], {type: "application/octet-stream"});
        let fileName: string = filename; //"myfile.png" //+ this.request.output;
        let dataType = data.type;
        console.log(dataType);

        let binaryData = [];
        binaryData.push(data);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (fileName)
          downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();


        // window.navigator.msSaveBlob(blob, fileName);


        //const blob1 = new Blob([data], { type: 'text/csv' });
        //const url= window.URL.createObjectURL(blob1);
        //window.open(url);
        //FileSaver.saveAs(blob1, 'data.csv');
      });
    }
    catch (e) {
      console.log(e);
    }
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
// export class UserDataSource extends DataSource<any> {
//   constructor(private  authService: AuthService) {
//     super();
//   }
//   connect(): Observable<Assignment[]> {
//     return this.authService.getTeacherAssignment();
//   }
//   disconnect() {}
// }

export class FileUploadModel {
  year ?: string=";"
  grade: string ="";
  section: string="";
  subject: string="";
  filetype: string="";
  description: string="";
  teacherid : any=0;
}

export interface Assignment {
  id: number;
  teacherid: number;
  academicyear: string;
  grade: string;
  section: string;
  subject: string;
  filetype: string;
  filepath: string;
  filename: string;
  description: string;
}

export interface Element {
  position: number;
  firstName: string;
  lastName: string;
  email: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com'},
  {position: 1, firstName: 'Mike', lastName: 'Hussey', email: 'mike@gmail.com'},
  {position: 1, firstName: 'Ricky', lastName: 'Hans', email: 'ricky@gmail.com'},
  {position: 1, firstName: 'Martin', lastName: 'Kos', email: 'martin@gmail.com'},
  {position: 1, firstName: 'Tom', lastName: 'Paisa', email: 'tom@gmail.com'}
];

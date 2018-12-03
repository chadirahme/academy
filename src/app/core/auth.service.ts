import {Injectable, EventEmitter, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpRequest} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {FileUploadModel, Assignment} from "../teacher/teacher.component";
import {HttpParams} from "@angular/common/http";
import {Headers} from "@angular/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {User} from "./user";
import {Student} from "./student";

@Injectable()
export class AuthService {

  public API = 'http://localhost:8090/';
  public API1 = 'http://139.162.169.243/';
  private loggedIn: BehaviorSubject<boolean>;
 // private loggedIn = new BehaviorSubject<boolean>(false);

  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn(): Observable<boolean> {
    console.log('isLoggedIn ::' + this.loggedIn.getValue());
    //return this.loggedIn.asObservable();
    return this.isLoginSubject.asObservable();
  }

    isLoggedIn2(): Observable<boolean> {
    //return this.loggedIn.asObservable();//this.loggedIn.asObservable();
      return this.isLoginSubject.asObservable();
  }

  public setTheBoolean(newValue: boolean): void {
    this.loggedIn.next(newValue);
  }


  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();


  constructor(private http: HttpClient, private router: Router) {
    console.log(this.API);
    this.loggedIn = new BehaviorSubject<boolean>(false);
  }

  getAll(): Observable<any> {
    //this.http.get('http://localhost:3000/');
    return this.http.get(this.API + 'employee');
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {userName: username, password: password};
    console.log('attempAuth ::');
    return this.http.post<any>(this.API + 'login/employee', credentials)
  }

  login(user: User){
    console.log("user is >> " + user.username, user.password);

    if (user.username !== '' && user.password !== '' ) { // {3}
      this.http.post<any>(this.API + 'login/user', user)
      .subscribe(data => {
        if(data) {
          localStorage.setItem('token', 'JWT');
          this.isLoginSubject.next(true);
          this.loggedIn.next(true);
          localStorage.setItem('grade', data["grade"]);
          localStorage.setItem('userId', data["userid"]);
          localStorage.setItem('usertype', data["usertype"]);
          //this.setTheBoolean(true);
          console.log('at login isLoggedIn ::' + this.loggedIn.getValue());
          if(data["usertype"]=="1")
            this.router.navigate(['teacher']);
          else
            this.router.navigate(['student']);


          // console.log('attempAuth ::');
          // this.router.navigate(['/']);
          // console.log('attempAuth ::');
        }
        else {
          alert('Invalid Username or Password !!');
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token');// {4}
    localStorage.removeItem('userid');
    localStorage.removeItem('grade');
    localStorage.removeItem('usertype');
    //this.loggedIn.next(false);
    this.isLoginSubject.next(false);
    this.router.navigate(['/']);
  }

  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }


  loginUser(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    this.loggedIn.next(true);
    this.fireIsLoggedIn.emit('dd');
    return this.http.post<any>(this.API + 'login/user', credentials)
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  pushFileToStorage(file: File, data: FileUploadModel): Observable<HttpEvent<{}>> {
    let headers = new HttpHeaders();
//this is the important step. You need to set content type as null
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    // for (let i = 0; i < this.filesList.length; i++) {
    //   formData.append('fileArray', this.filesList[i], this.filesList[i].name);
    // }
    //const credentials = {year: data.year, grade: data.grade};

    formData.append('year', data.year);
    formData.append('grade', data.grade);
    formData.append('section', data.section);
    formData.append('subject', data.subject);
    formData.append('filetype', data.filetype);
    formData.append('teacherid', data.teacherid);
    formData.append('description', data.description);


    //formData.append('param2', this.param2);
    return this.http.post<any>(this.API + 'profile/uploadpicture', formData, { params, headers });//.subscribe((res) => {
     // console.log(res);
      //return res;
    //});


    //const formdata: FormData = new FormData();
    //formdata.append('file', file);
    // console.log(file.name);
    // var formdata = new FormData(file);
    // formdata.append('year','ggggg');
    //
    // const dataObj = {
    //   year : data.year,
    //   grade : data.grade,
    //   fileclass : data.fileclass,
    //   file: file
    // };
    // return this.http.post<any>(this.API + 'profile/uploadpicture', formdata);

   // formdata.append('data', dataObj);
   //  const req = new HttpRequest('POST', this.API+'profile/uploadpicture',formdata,
   //    // {
   //    //   params: {
   //    //     year: data.year,
   //    //     file: file
   //    //   }
   //    // },
   //     {
   //      reportProgress: true,
   //      responseType: 'text'
   //    }
   //  );
   //  return this.http.request(req);
  }

  //http://localhost:8090/getTeacherAssignment?teacherid=1
  getTeacherAssignment(teacherid : string): Observable<Assignment[]> {
    console.log("getTeacherAssignment");
   // return this.http.get<any>(this.API + 'employee');
    return this.http.get<Assignment[]>(this.API + 'getTeacherAssignment?teacherid='+teacherid);
  }

  getGradeAssignment(grade : string): Observable<Assignment[]> {
    console.log("getGradeAssignment");
    // return this.http.get<any>(this.API + 'employee');
    return this.http.get<Assignment[]>(this.API + 'getGradeAssignment?grade='+grade);
  }

  getFiles(filename: string): Observable<any> {
    return this.http.get(this.API+ 'files/'+filename ,{responseType: 'blob' as 'json'});
  }

  deleteAssignment(id : string) : Observable<any>{
    return this.http.delete<any>(this.API + 'deleteAssignment/id/'+id);
    //.subscribe(data => {
    //   console.log(data);
    //   if(data){
    //     return 1;
    //     }
    //     else{
    //     return 0;
    //   }
    // });
    // return 1;

  }

  saveMarks(data : any[]): Observable<any> {
    //const credentials = {username: username, password: password};
    console.log('attempAuth ::');
    //this.loggedIn.next(true);
    //this.fireIsLoggedIn.emit('dd');
    return this.http.post<any>(this.API + 'marks/save', data)
  }

  ///marks/getStudentGradeAndSection
  getStudentGradeAndSection(grade : string , section: string): Observable<Student[]> {
    console.log("getStudentGradeAndSection");
    // return this.http.get<any>(this.API + 'employee');
    return this.http.get<Student[]>(this.API + 'marks/getStudentGradeAndSection?grade='+grade+'&section='+section);
  }
}

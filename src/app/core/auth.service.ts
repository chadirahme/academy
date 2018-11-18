import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpRequest} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {FileUploadModel} from "../teacher/teacher.component";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class AuthService {

  public API = 'http://localhost:8090/';
  public API1 = 'http://139.162.169.243/';

  public CAR_API = this.API + '/doctors';
 // baseUrl: 'http://localhost:8080/email2sms/';

  constructor(private http: HttpClient) {
    console.log(this.CAR_API);
  }

  getAll(): Observable<any> {
    //this.http.get('http://localhost:3000/');
    return this.http.get(this.API + 'employee');
  }


  getAll1(): Observable<any> {
    //this.http.get('http://localhost:3000/');
    return this.http.get<any>(this.CAR_API);
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {userName: username, password: password};
    console.log('attempAuth ::');
    return this.http.post<any>(this.API + 'login/employee', credentials)

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

}

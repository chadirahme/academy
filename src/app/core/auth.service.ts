import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  public API = 'http://localhost:8090/';
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
    return this.http.post<any>('http://localhost:8090/login/employee', credentials);
  }

}

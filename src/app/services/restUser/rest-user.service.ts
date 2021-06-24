import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global'; 
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {
  public uri:string;
  public user:any;
  public token:any;
  public role:any;
  public username:any;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public httpOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  };

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  getToken(){
    let token = localStorage.getItem('token')!;
    this.token = token;
    
    return token;
  }

  register(user:User){
    let params = JSON.stringify(user);

    return this.http.post<any>(`${this.uri}user/create`, params, this.httpOptions).pipe(map(this.extractData))
  }

  login(user: User){
    let params = JSON.stringify(user);
    return this.http.post<any>(`${this.uri}user/login`, params, this.httpOptions).pipe(map(this.extractData))
  }

  getUsers(){
    return this.http.get<any>(`${this.uri}user/getUsers`, this.httpOptions).pipe(map(this.extractData))
  }

  updateUser(user: User, userId: string){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });
    let params = JSON.stringify(user);
    return this.http.put<any>(`${this.uri}user/updateUser/${userId}`, params,{headers: headers} ).pipe(map(this.extractData))
  }

}

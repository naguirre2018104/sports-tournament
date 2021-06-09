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

  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }

  constructor(private http:HttpClient) {
    this.uri = CONNECTION.URI;
  }

  register(user:User){
    let params = JSON.stringify(user);

    return this.http.post<any>(`${this.uri}user/create`, params, this.httpOptions).pipe(map(this.extractData))
  }

  login(user: User){
    let params = JSON.stringify(user);
    return this.http.post<any>(`${this.uri}user/login`, params, this.httpOptions).pipe(map(this.extractData))
  }

}

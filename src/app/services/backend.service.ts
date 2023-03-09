import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public http: HttpClient) { }
  public baseUrl = environment.baseUrl

  register(value:any){
    return this.http.post(`${this.baseUrl}account/register`, value)
  }

  login(value:any){
    return this.http.post(`${this.baseUrl}account/login`, value)
  }
}

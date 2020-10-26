import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";


interface UserInfo {
  idccms: number;
  nombre: string;
  refreshToken: string;
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) {
  }
  /*
  loginService(network_user:string, password:string){
    let credentials = {
      network_user: network_user,
      password: password
    }
    const headers = { 'content-type': 'application/json'}
    return this.http.post<any>(`${this.url}/login`, credentials, {'headers': headers})
      .pipe(
        map((resp: any) => {
          return resp
        })
      )
  }
  */

  login(user) {
    const path =  environment.apiUrl + '/api/ccmslogin';
    const info = btoa(JSON.stringify(user));
    console.log(user)
    return this.http.post<any>(path, { body: 's' + info })
      .pipe(
        map((resp: any) => {
          return resp
        })
      )
  }

  getDataUser(data){
    const path = environment.apiUrl + '/api/sqlgetCampaign';
    return this.http.post(path, { data })
  }

  getToolsPerCampaign(data){
    const path = environment.apiUrl + '/api/sqlgetTools';
    return this.http.post(path, { data })
  }
  getURLsPerTool(){
    
  }

  refreshSession(refreshToken) {
    const path = environment.apiUrl + '/api/refreshToken';
    return this.http.post(path, { refreshToken });
  }

  setUser(info) {
    localStorage.setItem('info', JSON.stringify(info));
  }

  getUser(): UserInfo {
    return JSON.parse(localStorage.getItem('info'));
  }
  relogin(user) {
    localStorage.removeItem('info');
    localStorage.setItem('info', JSON.stringify(user));
    return true;
  }
  logout() {
    localStorage.clear();
  }

  /*
  save_email_service(email:string, document:string, network_user: string){
    let credentials = {
      email: email,
      document: document,
      network_user: network_user
    }
    const headers = { 'content-type': 'application/json'}
    return this.http.put<any>(`${this.url}/completar_registro`, credentials, {'headers': headers})
      .pipe(
        map( (resp:any) => {
          return resp
        })
      )
  }
  */

}

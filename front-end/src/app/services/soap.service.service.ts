import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {map, catchError, tap} from "rxjs/operators";
import * as $ from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class soapService {


  constructor(private http:HttpClient) {
  }


  soap_auth (userName: string, password: string): Observable<string>{

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'text/xml',
      }),
      params: {
        'userName': userName,
        'password': password
      },
      responseType: 'text'
    }
    // @ts-ignore
    return this.http.get<any>('/LAPWebService/user.asmx/AuthenticateUser', httpOptions)
      .pipe(
        map((resp: any) => {
          return resp
        })
      )
  }

}

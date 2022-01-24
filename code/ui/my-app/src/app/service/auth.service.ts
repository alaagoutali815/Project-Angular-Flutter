
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Router } from "@angular/router";

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LocalStorageService } from "src/app/service/local-storage.service";

import { User } from 'src/app/models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = 'http://localhost:49146/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public isLoggedIn:boolean = false;


  constructor(
    private httpClient: HttpClient,
    public router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.isLoggedIn = this.getAccessToken() ? true : false;

   }

  signup(user: User): Observable<any> {

    return this.httpClient.post(`${this.API_URL}/auth/signup`, user).pipe(
        catchError(this.handleError)
    )
  }
  login(user: User) {
    return this.httpClient.post<any>(`${this.API_URL}/auth/login`, user)
      .subscribe((res: any) => {
        this.isLoggedIn = true;
        this.localStorageService.set('access_token', res.token);
        this.router.navigate(['projet/']);
        // this.getUserProfile(res.userId).subscribe((res) => {
        //   this.localStorageService.set('user', {email: res.email, id: res._id, name: res.name});
        // })
      })
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  getAccessToken() {
    return this.localStorageService.get('access_token');
  }

  getUserId() {
    return this.localStorageService.get('user').id;
  }
  logout() {
    this.localStorageService.set('access_token', null);
    this.localStorageService.set('user', null);
    this.isLoggedIn = false;
    this.router.navigate(['auth/login']);
  }
}
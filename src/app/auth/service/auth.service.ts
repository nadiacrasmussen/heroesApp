import { User } from './../user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of, map, catchError } from 'rxjs';

import { environments } from '../../../environments/environments';


@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ):Observable<User> {
    // http.post('login',{ email, password });
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'aASDgjhasda.asdasd.aadsf123k' )),
      );
  }
checkAuthentication():Observable<boolean> {
  if(!localStorage.getItem('TOKEN')) return of(false);

  const token = localStorage.getItem('TOKEN');

return this.http.get<User>(`${this.baseUrl}/user/1`)
.pipe(
  tap(user => this.user = user),
  map(user => !!user ),
  catchError (err=> of(false))
)
}


  logout(){
    this.user =undefined;
    localStorage.clear();
  }
}

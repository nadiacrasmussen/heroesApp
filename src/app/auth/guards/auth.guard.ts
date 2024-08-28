import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router} from '@angular/router';
import { Observable, tap } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  private checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if ( !isAuthenticated ){
          this.router.navigate(['./auth/login'])
        }
      })
    )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    return this.checkAuthStatus();
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

    return this.checkAuthStatus();
  }

}

import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router){

  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authSvc.userData.pipe(
      map( user => {
        if(!user){
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    )
  } 
}
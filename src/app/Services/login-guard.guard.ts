import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public router: Router) { }
  canActivate(): boolean {
    if (localStorage.getItem('login') == "success") {
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    } 
  }
  
}

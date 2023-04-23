import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const user = this.authSvc.user.getValue();
    if (!user?.status) {
      this.router.navigate(['/']);
      return false;
    }
    return true; 
  }

}

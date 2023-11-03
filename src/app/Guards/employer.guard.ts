import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Shared/Auth/auth.service';
import { EmployeerService } from '../Shared/employeer.service';

@Injectable({
  providedIn: 'root',
})
export class EmployerGuard implements CanActivate {
  constructor(
    private readonly auth: AuthService,
    private readonly employerService: EmployeerService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['auth']);
      return this.auth.isLoggedIn;
    }
    if (this.auth.isNormalUser) {
      this.router.navigate(['/']);
      return false
    }
    if (this.auth.isBusinessAdmin) {
      if (this.employerService.employeers$.value.length == 0) {
        this.router.navigate(['employeer_registration']);
      }
    }
    return true;
  }
}

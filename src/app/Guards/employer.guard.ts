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

@Injectable({
  providedIn: 'root',
})
export class EmployerGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
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
    if (!this.auth.isAdmin) {
      this.router.navigate(['employeer_registration']);
    }
    return this.auth.isAdmin;
  }
}

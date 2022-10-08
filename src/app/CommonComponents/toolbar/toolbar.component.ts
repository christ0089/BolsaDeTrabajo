import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, map, Observable, tap } from 'rxjs';
import { IUserData } from 'src/app/Models/user';
import { AuthService } from 'src/app/Shared/Auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  user$: Observable<IUserData | null> = EMPTY;

  isMobileObs: Observable<boolean> = EMPTY;

  constructor(
    private readonly authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    private readonly router: Router
  ) {
    this.user$ = this.authService.userDataObs$.pipe(tap());
    this.isMobileObs = this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(
        map((res) => {
          return res.matches;
        })
      );
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}

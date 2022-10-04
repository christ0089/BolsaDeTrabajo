import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, tap } from 'rxjs';
import { IUserData } from 'src/app/Models/user';
import { AuthService } from 'src/app/Shared/Auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  user$: Observable<IUserData | null> = EMPTY;

  

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.user$ = this.authService.userDataObs$.pipe(tap());

    
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(["/"])
    });
  }


}

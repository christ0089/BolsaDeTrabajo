import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { IUserData } from 'src/app/Models/user';
import { AuthService } from 'src/app/Shared/Auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  user$: Observable<IUserData | null> = EMPTY;

  constructor(private readonly authService: AuthService) {
    this.user$ = this.authService.userDataObs$;
  }
}

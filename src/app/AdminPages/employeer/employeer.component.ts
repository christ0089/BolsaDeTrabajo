import { Component, OnInit } from '@angular/core';
import { map } from 'd3-array';
import { EMPTY, Observable, tap } from 'rxjs';
import { IEmployer } from 'src/app/Models/employer';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { EmployeerService } from 'src/app/Shared/employeer.service';

@Component({
  selector: 'app-employeer',
  templateUrl: './employeer.component.html',
  styleUrls: ['./employeer.component.sass'],
})
export class EmployeerComponent implements OnInit {
  employeer$: Observable<IEmployer | null> = EMPTY;
  availableRoutes: any[] = [];

  constructor(
    private employeerService: EmployeerService,
    private auth: AuthService
  ) {
    this.employeer$ = this.employeerService.selectedEmployeer$.asObservable();

    this.auth.auth$
      .pipe(
        tap((user) => {
          this.availableRoutes = [
            {
              name: 'Mi Empresa',
              path: 'company',
            },
            {
              name: 'Mis Oferta de Trabajo',
              path: 'applicants',
            },
            {
              name: 'Mis Solicitantes',
              path: 'job_applications',
            },
          ];

          if (user.user_role === 'admin') {
            this.availableRoutes = this.availableRoutes.concat([
              {
                path: 'reported_applications',
                name: 'Aplicanciones Reportadas',
              },
              {
                path: 'user_roles',
                name: 'Roles de Usuarios',
              },
            ]);
          }
        })
      )
      .subscribe();
  }
  ngOnInit(): void {}
}

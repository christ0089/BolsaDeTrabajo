import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'd3-array';
import { EMPTY, Observable, Subject, takeUntil, tap } from 'rxjs';
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
  destroy$: Subject<boolean> = new Subject<boolean>();
  isMobile = false;

  constructor(
    private employeerService: EmployeerService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private auth: AuthService
  ) {
    breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

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
                name: 'Reportes',
              },
              {
                path: 'user_roles',
                name: 'Adminstrar Usuarios',
              },
            ]);
          }
        })
      )
      .subscribe();
  }
  ngOnInit(): void {}

  ngOnDetroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  navigateRoute(index: any) {
    console.log(this.availableRoutes[index].path);

    this.router.navigate([`/admin/${this.availableRoutes[index].path}`]);
  }

}

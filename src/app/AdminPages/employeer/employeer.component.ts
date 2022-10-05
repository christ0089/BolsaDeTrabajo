import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
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
  availableRoutes = [
    {
      name: 'Mi Empresa',
      path: 'company',
    },
    {
      name: "Mis Oferta de Trabajo",
      path: 'applicants'
    }, {
      name: "Mis Solicitantes",
      path: "job_applications"
    }
  ];

  constructor(private employeerService: EmployeerService) {
    this.employeer$ = this.employeerService.selectedEmployeer$.asObservable()
  }
  ngOnInit(): void {}
}

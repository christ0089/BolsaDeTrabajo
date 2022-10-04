import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.sass'],
})
export class OperationsComponent implements OnInit {
  availableRoutes = [
    {
      name: 'Empresas',
      path: 'company',
    },
    {
      name: 'Ofertas Reportadas',
      path: 'reported_applications',
    },
    {
      name: 'Adminstracion de Roles',
      path: 'job_applications',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}

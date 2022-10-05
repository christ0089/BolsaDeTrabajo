import { Component, OnInit } from '@angular/core';
import { EMPTY, map, Observable } from 'rxjs';
import { IEmployer } from 'src/app/Models/employer';
import { EmployeerService } from 'src/app/Shared/employeer.service';

@Component({
  selector: 'app-employeer-select',
  templateUrl: './employeer.component.html',
  styleUrls: ['.//employeer.component.sass']
})
export class EmployeerComponent implements OnInit {
  employeers$: Observable<IEmployer[]> = EMPTY;
  selectedEmployeers$: Observable<IEmployer | null> = EMPTY;

  constructor(private readonly employeerService: EmployeerService) { 
    this.employeers$ = this.employeerService.employeers$;
    this.selectedEmployeers$ = this.employeerService.selectedEmployeer$
  }

  ngOnInit(): void {
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }

  selectEmployeer(employeer: IEmployer) {
    this.employeerService.selectedEmployeer$.next(employeer);
  }

}

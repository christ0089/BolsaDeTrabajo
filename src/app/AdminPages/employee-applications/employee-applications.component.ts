import { Component, OnInit, ViewChild } from '@angular/core';
import { collectionData, Firestore, orderBy } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection, query, where } from '@firebase/firestore';
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from 'rxjs';
import { ApplicationInfoComponent } from 'src/app/EmployeerComponents/application-info/application-info.component';
import { IJobApplication } from 'src/app/Models/job_application';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-employee-applications',
  templateUrl: './employee-applications.component.html',
  styleUrls: ['./employee-applications.component.sass'],
})
export class EmployeeApplicationsComponent implements OnInit {
  jobApplications$: BehaviorSubject<IJobApplication[]> = new BehaviorSubject<
    IJobApplication[]
  >([]);
  list$: BehaviorSubject<string> = new BehaviorSubject<string>("contracted");


  selectedJob$: BehaviorSubject<IJobApplication | null> =
    new BehaviorSubject<IJobApplication | null>(null);

  constructor(
    private readonly matDialog: MatDialog,
    private readonly afs: Firestore,
    private readonly employeerService: EmployeerService,
    private readonly activatedRoute: ActivatedRoute,
  ) {

    combineLatest([
      this.employeerService.selectedEmployeer$,
      this.activatedRoute.paramMap,
      this.list$
    ])
      .pipe(
        switchMap(([e, params, list]) => {
          if (!e) {
            return of(null);
          }

          // Create a Date object for the current date
          const currentDate = new Date();

          // Get the year and month of the current date
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth();

          // Calculate the start of the month
          const startOfMonth = new Date(year, month, 1);

          // Calculate the end of the month
          const endOfMonth = new Date(year, month + 1, 0);
  

          const collectionRef = collection(
            this.afs,
            `employeers/${e.id}/job_applications`
          ).withConverter<IJobApplication>(genericConverter<IJobApplication>());

          let queries = [where('active', '==', true)]

          if (params.has('id')) {
            const id = params.get('id');
            queries.push(where('job_position.id', '==', id));
          }

          // if (list == true) {
          //   queries.push(where('updated', '>=', startOfMonth));
          //   queries.push(where('updated', '<=', endOfMonth));
          // }

          if (list == "expired") {
            queries.push(where('updated', '<=', startOfMonth));
          } 
          if (list == "open") {
            queries.push(orderBy('createdAt', "desc"));
          }

          if (list == "completed") {
            queries.push(where('status', "==", "contracted"));
          }

          if (list == "dismissed") {
            queries.push(where('status', "==", "dismissed"));
          }


          const q = query(collectionRef,...queries );
          return collectionData(q, { idField: 'id' });
        })
      )
      .subscribe((j) => {
        console.log(j)
        if (!j) {
          return;
        }

        if (this.list$.value == "expired" || this.list$.value == "open") {
          j = j.filter(j => (j.status != "contracted" && j.status != "dismissed"))
        }
        this.jobApplications$.next(j);
      });
  }

  ngOnInit(): void {}

  selectJob(job_application: IJobApplication) {
    this.selectedJob$.next(job_application);
    this.openDialog(job_application);
  }

  openDialog(job_application: IJobApplication | null, i = 0): void {
    const dialogRef = this.matDialog.open(ApplicationInfoComponent, {
      width: '800px',
      maxWidth: '1200px',
      height: '80%',
      data: { job: job_application },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  changeList(idx: number) {
    const state = ["completed","dismissed", "open", "expired"];
    this.list$.next(state[idx]);
  }
}

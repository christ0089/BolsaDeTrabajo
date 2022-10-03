import { Component, OnInit, ViewChild } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { collection, query, where } from '@firebase/firestore';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { ApplicationInfoComponent } from 'src/app/EmployeerComponents/application-info/application-info.component';
import { IJobApplication } from 'src/app/Models/job_application';
import { JobApplicationComponent } from 'src/app/Pages/job-application/job-application.component';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
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

  selectedJob$: BehaviorSubject<IJobApplication | null> =
    new BehaviorSubject<IJobApplication | null>(null);

  constructor(
    private readonly matDialog: MatDialog,
    private readonly afs: Firestore,
    private readonly auth: AuthService,
    private readonly employeerService: EmployeerService
  ) {
    this.employeerService.employeers$
      .pipe(
        switchMap((e) => {
          const collectionRef = collection(
            this.afs,
            `employeers/${e[0].id}/job_applications`
          ).withConverter<IJobApplication>(genericConverter<IJobApplication>());

          const q = query(collectionRef, where('employer.id', '==', e[0].id));

          return collectionData(q, { idField: 'id' });
        })
      )
      .subscribe((j) => {
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
      // if (!data.complimentData) {
      //   this.removeCompliment(i);
      // } else {
      //   const compliment = data.complimenData;
      //   if (this.currProd.complimentData) {
      //     this.currProd.complimentData.push(compliment);
      //   } else {
      //     this.currProd.complimentData = [compliment];
      //   }
      // }
      console.log('The dialog was closed');
    });
  }
}

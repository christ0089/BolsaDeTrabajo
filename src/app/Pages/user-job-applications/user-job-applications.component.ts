import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { httpsCallable } from '@firebase/functions';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApplicationInfoComponent } from 'src/app/EmployeerComponents/application-info/application-info.component';
import { IJobApplication } from 'src/app/Models/job_application';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-user-job-applications',
  templateUrl: './user-job-applications.component.html',
  styleUrls: ['./user-job-applications.component.sass'],
})
export class UserJobApplicationsComponent implements OnInit {
  jobApplications$: BehaviorSubject<IJobApplication[]> = new BehaviorSubject<
    IJobApplication[]
  >([]);

  selectedJob$: BehaviorSubject<IJobApplication | null> =
    new BehaviorSubject<IJobApplication | null>(null);

  constructor(
    private readonly matDialog: MatDialog,
    private readonly afs: Firestore,
    private readonly auth: AuthService,
    private readonly functions: Functions
  ) {
    this.auth.userDataObs$
      .pipe(
        switchMap((e) => {
          const collectionRef = collection(
            this.afs,
            `users/${e?.uid}/job_applications`
          ).withConverter<IJobApplication>(genericConverter<IJobApplication>());
          return collectionData(collectionRef, { idField: 'id' });
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

  async removeJobApplication(job_application: IJobApplication) {
    const jobApplicationFunctions$ = await  httpsCallable(this.functions, "applicationUserDelete")

    jobApplicationFunctions$({
      jobApplicationId: job_application.id,
      employeerId: job_application.employeer_data.id
    })
    
  }
}

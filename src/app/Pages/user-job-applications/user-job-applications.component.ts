import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { httpsCallable } from '@firebase/functions';
import { BehaviorSubject } from 'rxjs';
import { ApplicationInfoComponent } from 'src/app/EmployeerComponents/application-info/application-info.component';
import { IJobApplication } from 'src/app/Models/job_application';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { ListPostionService } from 'src/app/Shared/list-postion.service';

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
  loading = false;

  constructor(
    private readonly matDialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly afs: Firestore,
    private readonly auth: AuthService,
    private readonly jobListing: ListPostionService,
    private readonly functions: Functions
  ) {
    this.jobListing.jobApplications$.subscribe((j) => {
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

  async removeJobApplication(job_application: IJobApplication) {
    this.loading = true;
    const jobApplicationFunctions$ = await httpsCallable<any,any>(
      this.functions,
      'applicationUserUpdate'
    );

    jobApplicationFunctions$({
      jobApplicationId: job_application.id,
      employeerId: job_application.employer.id,
    })
      .then((result) => {
        this.loading = false;
        if (result.data.status == 200) {
          return this.snackBar.open(
            'Se ha actualizado correctamene la aplicación',
            '',
            {
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['green-snackbar'],
              duration: 2000,
            }
          );
        } else {
          throw new Error('No se actualizo con exito');
        }
      })
      .catch((e) => {
        this.loading = false;
        return this.snackBar.open(
          'No se ha actualizado correctamene la aplicación',
          '',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackbar'],
            duration: 2000,
          }
        );
      });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  query,
} from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Timestamp, where } from '@firebase/firestore';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { IJobApplication } from 'src/app/Models/job_application';
import { IJobPosition } from 'src/app/Models/job_postition';
import { IUserData } from 'src/app/Models/user';
import { UserJobApplicationsComponent } from 'src/app/Pages/user-job-applications/user-job-applications.component';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-user-applications',
  templateUrl: './user-applications.component.html',
  styleUrls: ['./user-applications.component.sass'],
})
export class UserApplicationsComponent implements OnInit {
  jobListing$ = new BehaviorSubject<IJobPosition[]>([]);
  user!: IUserData;
  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private employeerService: EmployeerService,
    private afs: Firestore,
    private functions: Functions,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserJobApplicationsComponent>
  ) {
    console.log(data.user);
    this.user = data.user;

    combineLatest([this.employeerService.selectedEmployeer$])
      .pipe(
        switchMap(([e]) => {
          if (!e) {
            return [];
          }
          const collectionRef = collection(
            this.afs,
            `job_listing`
          ).withConverter<IJobPosition>(genericConverter<IJobPosition>());

          let queries = [
            where('employer.id', '==', e.id),
            where('active', '==', true),
          ];

          const q = query(collectionRef, ...queries);

          return collectionData(q, { idField: 'id' });
        })
      )
      .subscribe((j) => {
        this.jobListing$.next(j);
      });
  }

  ngOnInit(): void {}

  upload(job: IJobPosition) {
    const jobApplicationFuntion = httpsCallable<any, any>(
      this.functions,
      'applicatonEmployeerCreate'
    );

    const user = this.user;

    const employee = this.employeerService.selectedEmployeer$.value;

    jobApplicationFuntion({
      jobApplication: {
        active: true,
        formData: [
          {
            resume_url: '',
          },
          {
            prev_employer: '',
            prev_position: '',
          },
        ],
        personal_data: user,
        createdAt: Timestamp.now(),
        job_position: {
          id: job.id,
          name: job.name,
          employeer: {
            id: employee?.id,
            company_name: employee?.company_name,
          },
        },
        employer: {
          id: employee?.id,
          company_name: employee?.company_name,
        },
        status: 'applied',
      },
      employer: {
        id: employee?.id,
        company_name: employee?.company_name,
      },
    })
      .then((result) => {
        this.loading = false;

        if (result.data.status == 200) {
          this.snackBar.open('Se ha subido con exito tu aplicación', '', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['green-snackbar'],
            duration: 2000,
          });
          this.close();
        } else {
          throw new Error('No se actualizo con exito');
        }
      })
      .catch((e) => {
        this.loading = false;
        return this.snackBar.open('No ha subido con exito tu aplicación', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
          duration: 2000,
        });
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}

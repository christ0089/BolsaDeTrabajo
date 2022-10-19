import { Component, Inject, OnInit } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, takeUntil, tap } from 'rxjs';
import { IJobApplication, JobStatus } from 'src/app/Models/job_application';
import { AuthService } from 'src/app/Shared/Auth/auth.service';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.sass'],
})
export class ApplicationInfoComponent implements OnInit {
  job!: IJobApplication;
  loading = false;
  isAdmin$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new BehaviorSubject<boolean>(false);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly functions: Functions,
    private readonly auth: AuthService,
    private readonly snackBar: MatSnackBar
  ) {
    this.job = data.job;

    console.log(this.job);

    this.auth.auth$
      .pipe(
        tap((user) => {
          console.log(user);
          if (user) {
            this.isAdmin$.next(true);
          }
        })
      )
      .subscribe();
  }

  onDestroy() {
    this.destroy$.next(true);
    this.destroy$.subscribe();
  }

  ngOnInit(): void {}

  download(url: string) {
    window.open(url);
  }

  updateStatus(status: JobStatus) {
    this.loading = true;
    const updateStatus$ = httpsCallable(
      this.functions,
      'jobApplicationEmployeerUpdate'
    );

    updateStatus$({
      status,
      jobApplication: this.job,
      employeerId: this.job.employer.id,
    })
      .then((result:any) => {
        this.loading = false;
        if (result.data.status == 200) {
          return this.snackBar.open(
            'Se ha actualizado correctamente la applicacion',
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
          'No se ha actualizado correctamente la applicacion',
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

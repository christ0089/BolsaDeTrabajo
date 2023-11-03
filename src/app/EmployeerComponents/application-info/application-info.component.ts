import { Component, Inject, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
  protected todaysDate = new Date(Date.now())

  registrationForm: FormGroup = this.formBuilder.group({
    contractDate: ['', Validators.required],
    status: ['', Validators.required]
  });

  get f() {
    return this.registrationForm.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly functions: Functions,
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar
  ) {

    this.job = data.job;
    this.authService.auth$
      .pipe(
        tap((user) => {
          if (user) {
            this.isAdmin$.next(this.authService.isAdmin);
          }
        })
      )
      .subscribe();

    let jsDate = ""
    if (this.job.contractDate) {
      console.log(this.job.contractDate)
      const milliseconds = this.job.contractDate.seconds * 1000 + this.job.contractDate.nanoseconds / 100000;
      console.log(milliseconds)
      jsDate = new Date(+milliseconds).toDateString()


      this.registrationForm.controls['contractDate'].setValue(jsDate);
    }

   
  }


  onDestroy() {
    this.destroy$.next(true);
    this.destroy$.subscribe();
  }

  ngOnInit(): void { }

  download(url: string) {
    window.open(url);
  }



  save() {
    if (this.authService.isOperator) {
      this.snackBar.open('No tienes permisos de editar', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
        duration: 2000,
      });
      return
    }

    this.loading = true;
    const updateStatus$ = httpsCallable(
      this.functions,
      'jobApplicationEmployeerUpdate'
    );

    const { status, contractDate } = this.registrationForm.value;
    const contractTimestamp = Timestamp.fromDate(contractDate);


    updateStatus$({
      status,
      contractDate: contractTimestamp,
      jobApplication: this.job,
      employeerId: this.job.employer.id,
    })
      .then((result: any) => {
        this.loading = false;
        if (result.data.status == 200) {
          return this.snackBar.open(
            'Se ha actualizado correctamente la aplicación',
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
          'No se ha actualizado correctamente la aplicación',
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

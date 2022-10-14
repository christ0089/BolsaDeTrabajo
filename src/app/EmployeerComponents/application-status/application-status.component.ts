import { Component, Inject, OnInit } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IJobPosition } from 'src/app/Models/job_postition';

@Component({
  selector: 'app-application-status',
  templateUrl: './application-status.component.html',
  styleUrls: ['./application-status.component.sass'],
})
export class ApplicationStatusComponent implements OnInit {
  job!: IJobPosition;

  closure_reasons = [
    {
      key: 'employee_found',
      value: 'Se encontro a un candidato',
    },
    {
      key: 'employee_not_found',
      value: 'No se encontro a un candidato',
    },
    {
      key: 'closing',
      value: 'Cerrar convocatoria',
    },
  ];

  selectedClosingReason!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private functions: Functions,
    private snackBar: MatSnackBar
  ) {
    console.log(data)
    this.job = data.job_position;
  }

  compareObjects(o1: any, o2: any): boolean {
    return o1.key === o2.key;
  }

  ngOnInit(): void {}

  selectClosingReason(reason: string) {
    this.selectedClosingReason = reason;
  }

  async save() {
    const applicationUpdate$ = httpsCallable(
      this.functions,
      'jobListingEmployeerUpdate'
    );
    applicationUpdate$({
      jobApplicationId: this.job.id,
      employeerId: this.job.employer.id,
      closureReason: this.selectedClosingReason,
    })
      .then((result) => {
        if (result.data == 200) {
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
        return this.snackBar.open('No se ha actualizado correctamente la applicacion', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
          duration: 2000,
        });
      });
  }
}
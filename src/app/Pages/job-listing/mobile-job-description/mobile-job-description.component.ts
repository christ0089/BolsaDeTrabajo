import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJobPosition } from 'src/app/Models/job_postition';

@Component({
  selector: 'app-mobile-job-description',
  templateUrl: './mobile-job-description.component.html',
  styleUrls: ['./mobile-job-description.component.sass'],
})
export class MobileJobDescriptionComponent implements OnInit {
  selectedJob!: IJobPosition;
  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    public dialogRef: MatDialogRef<MobileJobDescriptionComponent>
  ) {
    if (data.job) {
      this.selectedJob = data.job;
    }
  }

  ngOnInit(): void {}

  close(): void {
    console.log("close")
    this.dialogRef.close();
  }
}

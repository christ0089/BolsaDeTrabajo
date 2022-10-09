import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IJobApplication } from 'src/app/Models/job_application';

@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.sass'],
})
export class ApplicationInfoComponent implements OnInit {
  job!: IJobApplication;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.job = data.job;
  }

  ngOnInit(): void {}


  download(url: string) {
    window.open(url);
  }


}

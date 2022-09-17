import { Component, Input, OnInit } from '@angular/core';
import { IJobPosition } from 'src/app/Models/job_postition';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.sass'],
})
export class JobItemComponent implements OnInit {
  @Input('job') job: IJobPosition | null = null;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.job) {
      
    }
  }
}

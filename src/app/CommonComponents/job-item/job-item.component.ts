import { CurrencyPipe, formatCurrency } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJobPosition } from 'src/app/Models/job_postition';
import { IElement } from '../chips/chips.component';

import { WorkHoursPipe } from 'src/app/Pipes/work-hours.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.sass'],
})
export class JobItemComponent implements OnInit {
  @Input('job') job: IJobPosition | null = null;
  @Input('edit') editJob: boolean = false;

  @Output('edit_job') editJobEvent: EventEmitter<IJobPosition> =
    new EventEmitter<IJobPosition>();
  @Output('close_job') closeJobEvent: EventEmitter<IJobPosition> =
    new EventEmitter<IJobPosition>();
  @Output('delete_job') deleteJobEvent: EventEmitter<IJobPosition> =
    new EventEmitter<IJobPosition>();

  elements: IElement[] = [
    {
      icon: 'payments',
      elements: [],
    },
    {
      icon: 'timer',
      elements: [],
    },
    {
      icon: 'work',
      elements: [],
    },
  ];
  constructor(private readonly cp: CurrencyPipe, private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.job) {
      this.elements[0].elements = [
        `${this.cp.transform(
          this.job.payment_expectation[0],
          'USD',
          'symbol',
          '1.2-2'
        )} a ${this.cp.transform(
          this.job.payment_expectation[0],
          'USD',
          'symbol',
          '1.2-2'
        )}`,
      ];

      if (this.job.workhours_type) {
        this.elements[1].elements = [...this.job.workhours_type] || [];
      }
      if (this.job.benefits) {
        this.elements[2].elements = [...this.job.benefits] || [];
      }
    }
  }

  editJobForm() {
    if (this.job) {
      this.editJobEvent.emit(this.job);
    }
  }

  removeJob() {
    if (this.job) {
      this.deleteJobEvent.emit(this.job);
    }
  }

  viewApplicants(job_id: string = "") {
   this.router.navigate([`/admin/job_applications/${job_id}`]) 
  }
}

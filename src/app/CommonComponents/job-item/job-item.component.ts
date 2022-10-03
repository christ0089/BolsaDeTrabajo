import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJobPosition } from 'src/app/Models/job_postition';
import { IElement } from '../chips/chips.component';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.sass'],
})
export class JobItemComponent implements OnInit {
  @Input('job') job: IJobPosition | null = null;
  @Input('edit') editJob: boolean = false;

  @Output('edit_job') editJobEvent: EventEmitter<IJobPosition> = new EventEmitter<IJobPosition>();
  @Output('delete_job') deleteJobEvent: EventEmitter<IJobPosition> = new EventEmitter<IJobPosition>();

  elements: IElement[] = [
    {
      icon: 'money',
      elements: [],
    },
    {
      icon: 'time',
      elements: [],
    },
    {
      icon: 'work',
      elements: [],
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.job) {
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
}

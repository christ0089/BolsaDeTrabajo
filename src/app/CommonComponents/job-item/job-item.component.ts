import { Component, Input, OnInit } from '@angular/core';
import { IJobPosition } from 'src/app/Models/job_postition';
import { IElement } from '../chips/chips.component';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.sass'],
})
export class JobItemComponent implements OnInit {
  @Input('job') job: IJobPosition | null = null;

  elements: IElement[] = [
    {
      icon: 'money',
      elements: [],
    }, {
      icon: 'time',
      elements: []
    }, {
      icon: 'work',
      elements: []
    }
  ];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.job) {
    }
  }
}

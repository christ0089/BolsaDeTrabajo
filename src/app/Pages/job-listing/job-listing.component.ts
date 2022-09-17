import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { IJobPosition } from 'src/app/Models/job_postition';
import { JobPostionService } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.sass'],
})
export class JobListingComponent implements OnInit {
  jobListing$: Observable<IJobPosition[]> = EMPTY;
  constructor(private readonly jobService: JobPostionService) {
    this.jobListing$ = this.jobService.jobListing$;
  }

  ngOnInit(): void {}
}

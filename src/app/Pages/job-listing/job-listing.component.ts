import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { IJobPosition } from 'src/app/Models/job_postition';
import { JobPostionService } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.sass'],
})
export class JobListingComponent implements OnInit {
  jobListing$: Observable<IJobPosition[]> = EMPTY;
  selectedJob$: BehaviorSubject<IJobPosition | null> =
    new BehaviorSubject<IJobPosition | null>(null);
  constructor(
    private readonly jobService: JobPostionService,
    private readonly router: Router
  ) {
    this.jobListing$ = this.jobService.jobListing$;
  }

  ngOnInit(): void {}

  selectJob(job: IJobPosition) {
    this.selectedJob$.next(job);
  }

  openApplication(job: IJobPosition) {
    this.router.navigate([`/job_application/${job.id}`], {
      state: {
        job
      },
    });
  }
}

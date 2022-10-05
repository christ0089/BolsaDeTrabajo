import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { html } from 'd3-fetch';
import { BehaviorSubject, combineLatest, EMPTY, Observable, tap } from 'rxjs';
import { IJobPosition } from 'src/app/Models/job_postition';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { JobPostionService } from 'src/app/Shared/job-postion.service';
import { ListPostionService } from 'src/app/Shared/list-postion.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.sass'],
})
export class JobListingComponent implements OnInit {
  jobListing$: BehaviorSubject<IJobPosition[]> = new BehaviorSubject<
    IJobPosition[]
  >([]);
  selectedJob$: BehaviorSubject<IJobPosition | null> =
    new BehaviorSubject<IJobPosition | null>(null);

  searchForm = new FormControl();

  constructor(
    private readonly jobService: JobPostionService,
    private readonly jobApplied: ListPostionService,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    combineLatest([
      this.jobService.jobListing$,
      this.jobApplied.jobApplications$,
      this.jobService.favoriteJobListing$
    ])
      .pipe(
        tap(([jobListing, appliedJob, favoriteJob]) => {
          console.log(jobListing)
          console.log(appliedJob)
          console.log(favoriteJob)

          jobListing.forEach((j) => {
            j.applied = false;
            appliedJob.forEach((b) => {
              if (b.id == j.id) {
                j.applied = true;
              }
            });
          });

          jobListing.forEach((j) => {
            j.applied = false;
            favoriteJob.forEach((b) => {
              if (b.id == j.id) {
                j.favorite = b.active;
              }
            });
          });
          this.jobListing$.next(jobListing);
        })
      )
      .subscribe(console.log);

    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchJob(userInput);
    });
  }

  async searchJob(search: string) {
    const searchTerm: string = search.toLowerCase();
    if (searchTerm == '' || this.jobListing$.value === []) {
      this.jobListing$.next(this.jobService.jobListing$.value);
    } else {
      let jobs = this.jobListing$.value;
      Object.keys(jobs).forEach((key) => {
        jobs = jobs.filter((v) => {
          const hasPosition = v.name.toLowerCase().includes(searchTerm);

          //const hasEmployer = v.employer.name.toLowerCase().includes(searchTerm);
          return hasPosition;
        });
      });
      this.jobListing$.next(jobs);
    }
  }

  ngOnInit(): void {}

  selectJob(job: IJobPosition) {
    this.selectedJob$.next(job);
  }

  openApplication(job: IJobPosition): void {
    this.router.navigate([`/job_application/${job.id}`], {
      state: {
        job,
      },
    });
  }

  saveToFavorite(job: IJobPosition): void {
    if (this.auth.isLoggedIn) {
      this.router.navigate(['/auth']);
      return;
    }
    const job_id = job.id || '';
    const favorite = job.favorite == true ? false : true;
    this.jobService.favoriteJobPosition(job_id, favorite);
  }
}

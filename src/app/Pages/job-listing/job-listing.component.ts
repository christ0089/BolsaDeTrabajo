import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, tap } from 'rxjs';
import { IJobPosition } from 'src/app/Models/job_postition';
import { JobPostionService } from 'src/app/Shared/job-postion.service';

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
    private readonly router: Router
  ) {
    this.jobService.jobListing$
      .pipe(
        tap((j) => {
          this.jobListing$.next(j);
        })
      )
      .subscribe();

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

  openApplication(job: IJobPosition) {
    this.router.navigate([`/job_application/${job.id}`], {
      state: {
        job,
      },
    });
  }

  saveToFavorite(job: IJobPosition) {}
}

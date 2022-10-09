import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { html } from 'd3-fetch';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { JobDescriptionComponent } from 'src/app/CommonComponents/job-description/job-description.component';
import { IJobPosition } from 'src/app/Models/job_postition';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { JobPostionService } from 'src/app/Shared/job-postion.service';
import { ListPostionService } from 'src/app/Shared/list-postion.service';
import { MobileJobDescriptionComponent } from './mobile-job-description/mobile-job-description.component';

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
  destroy$: Subject<boolean> = new Subject<boolean>();
  isMobile = false;

  constructor(
    private readonly jobService: JobPostionService,
    private readonly jobApplied: ListPostionService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly matDialog: MatDialog,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

    combineLatest([
      this.jobService.jobListing$,
      this.jobApplied.jobApplications$,
      this.jobService.favoriteJobListing$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([jobListing, appliedJob, favoriteJob]) => {
          jobListing.forEach((j) => {
            j.applied = false;
            appliedJob.forEach((b) => {
              if (b.job_position.id == j.id) {
                j.applied = true;
              }
            });
          });

          jobListing.forEach((j) => {
            j.favorite = false;
            favoriteJob.forEach((b) => {
              if (b.id == j.id) {
                j.favorite = b.active;
              }
            });
          });
          this.jobListing$.next(jobListing);
        })
      )
      .subscribe();

    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchJob(userInput);
    });
  }

  ngOnDetroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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

    if (this.isMobile == true) {
      const dialogRef = this.matDialog.open(MobileJobDescriptionComponent, {
        width: '800px',
        maxWidth: '1200px',
        height: '100%',
        data: { job: job },
      });

      dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    }
  }
}

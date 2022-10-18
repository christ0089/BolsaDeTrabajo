import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,

  Subject,
  takeUntil,
  tap,
} from 'rxjs';
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
  
  list$: BehaviorSubject<string> =
    new BehaviorSubject<string>("general");

  searchForm = new FormControl();
  destroy$: Subject<boolean> = new Subject<boolean>();
  isMobile = false;

  constructor(
    private readonly jobService: JobPostionService,
    private readonly jobApplied: ListPostionService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly auth: AuthService,
    private readonly matDialog: MatDialog,
    private readonly snackBar: MatSnackBar
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
      this.list$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([jobListing, appliedJob, favoriteJob, state]) => {
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

          if (state === "favorites") {
            jobListing = jobListing.filter(v => v.favorite === true)
          }
          this.jobListing$.next(jobListing);
        })
      )
      .subscribe(console.log);

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
          const hasEmployer = v.employer.company_name.toLowerCase().includes(searchTerm);
          return hasPosition || hasEmployer;
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

  changeList(idx: number) {
    const state = ["general", "favorites"]

    if (this.auth.isLoggedIn == false) {
      this.snackBar.open(
        'Inicia sesion, para poder guardar a favoritos' ,
        '',
        {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
          duration: 2000,
        }
      );
    } else {
      this.list$.next(state[idx]);
    }
  }
}

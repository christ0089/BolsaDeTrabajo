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

  filters$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  searchForm = new FormControl();
  destroy$: Subject<boolean> = new Subject<boolean>();
  isMobile = false;

  companiesSet = new Set<string>();
  
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
      this.filters$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([jobListing, appliedJob, favoriteJob, state, filters]) => {
          jobListing.forEach((j) => {
            j.applied = false;
            appliedJob.forEach((b) => {
              if (b.job_position.id == j.id) {
                j.applied = true;
              }
            });
            this.companiesSet.add(j.employer.company_name)
          });

          jobListing.forEach((j) => {
            j.favorite = false;
            favoriteJob.forEach((b) => {
              if (b.id == j.id) {
                j.favorite = b.active;
              }
            });
          })

          if (filters) {
            if (filters['school_level'] != '') {
             jobListing = jobListing.filter(j => j.school_level === filters['school_level'])
            }

            if (filters['company'] != '') {
              jobListing = jobListing.filter(j => j.employer.company_name === filters['company'])
            }

            if (filters['salaries'] > 0 ) {
              jobListing = jobListing.filter(j => j.payment_expectation[0] >= filters['salaries'])
            }
          }
          

          if (state === "favorites") {
            jobListing = jobListing.filter(v => v.favorite === true)
          }
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

  get companiesList(): string[] {
    return [...this.companiesSet]
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

  filterChanges(filters: any[]) {
    this.filters$.next(filters)
  }

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

    if (this.auth.isLoggedIn == false && idx == 1) {
      this.snackBar.open(
        'Inicia sesión, para poder guardar a favoritos' ,
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

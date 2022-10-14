import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IJobPosition } from 'src/app/Models/job_postition';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { JobPostionService } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.sass']
})
export class JobDescriptionComponent implements OnInit {

  @Input()selectedJob!: IJobPosition;
  constructor(
    private router: Router,
    private auth: AuthService,
    private jobService: JobPostionService
  ){
  }

  ngOnInit(): void {

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
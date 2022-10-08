import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJobPosition } from 'src/app/Models/job_postition';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { JobPostionService } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.sass']
})
export class FavoriteComponent implements OnInit {

  @Input()selectedJob!: IJobPosition
  constructor(
    private router: Router,
    private jobService: JobPostionService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  saveToFavorite(job: IJobPosition): void {
    if (this.auth.isLoggedIn == false) {
      this.router.navigate(['/auth']);
      return;
    }
    const job_id = job.id || '';
    const favorite = job.favorite == true ? false : true;
    this.jobService.favoriteJobPosition(job_id, favorite);
  }
}

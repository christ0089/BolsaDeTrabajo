import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { BehaviorSubject, switchMap } from 'rxjs';
import { IJobPosition } from 'src/app/Models/job_postition';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-employee-listing',
  templateUrl: './employee-listing.component.html',
  styleUrls: ['./employee-listing.component.sass'],
})
export class EmployeeListingComponent implements OnInit {
  jobListing$: BehaviorSubject<IJobPosition[]> = new BehaviorSubject<
    IJobPosition[]
  >([]);
  constructor(
    private readonly afs: Firestore,
    private readonly auth: AuthService,
    private readonly employeerService: EmployeerService
  ) {
    this.employeerService.employeers$
      .pipe(
        switchMap((e) => {
          const collectionRef = collection(
            this.afs,
            `job_listing`
          ).withConverter<IJobPosition>(genericConverter<IJobPosition>());

          const q = query(collectionRef, where('employer.id', '==', e[0].id));

          return collectionData(q, { idField: 'id' });
        })
      )
      .subscribe((j) => {
        this.jobListing$.next(j);
      });
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, query, where } from '@firebase/firestore';
import { BehaviorSubject, switchMap } from 'rxjs';
import { IJobApplication } from 'src/app/Models/job_application';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-employee-applications',
  templateUrl: './employee-applications.component.html',
  styleUrls: ['./employee-applications.component.sass'],
})
export class EmployeeApplicationsComponent implements OnInit {
  jobApplications$: BehaviorSubject<IJobApplication[]> = new BehaviorSubject<
    IJobApplication[]
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
            `employeers/${e[0].id}/job_applications`
          ).withConverter<IJobApplication>(genericConverter<IJobApplication>());

          const q = query(collectionRef, where('employer.id', '==', e[0].id));

          return collectionData(q, { idField: 'id' });
        })
      )
      .subscribe((j) => {
        this.jobApplications$.next(j);
      });
  }

  ngOnInit(): void {}
}

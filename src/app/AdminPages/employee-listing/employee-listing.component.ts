import { Component, OnInit } from '@angular/core';
import {
  collectionData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection, deleteDoc, doc } from '@firebase/firestore';
import { filter } from 'd3';
import { BehaviorSubject, switchMap } from 'rxjs';
import { JobPositionFormComponent } from 'src/app/EmployeerComponents/job-position-form/job-position-form.component';
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
    private readonly matDialog: MatDialog,
    private readonly employeerService: EmployeerService
  ) {
    this.employeerService.selectedEmployeer$
      .pipe(
        switchMap((e) => {
          if (!e) {
            return [];
          }
          const collectionRef = collection(
            this.afs,
            `job_listing`
          ).withConverter<IJobPosition>(genericConverter<IJobPosition>());

          const q = query(collectionRef, where('employer.id', '==', e.id));

          return collectionData(q, { idField: 'id' });
        })
      )
      .subscribe((j) => {
        console.log(j);
        this.jobListing$.next(j);
      });
  }

  ngOnInit(): void {}

  jobApplication(job_postition: IJobPosition | null = null) {
    const dialogRef = this.matDialog.open(JobPositionFormComponent, {
      width: '800px',
      maxWidth: '1200px',
      height: '80%',
      data: { ...job_postition },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  deleteJobApplication(job_postition: IJobPosition) {
    const docRef = doc(this.afs, `job_listing/${job_postition.id}`);
    deleteDoc(docRef);
  }
}

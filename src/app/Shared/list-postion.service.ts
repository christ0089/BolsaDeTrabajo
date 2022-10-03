import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { BehaviorSubject, switchMap } from 'rxjs';
import { IJobApplication } from '../Models/job_application';
import { AuthService } from './Auth/auth.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Injectable({
  providedIn: 'root',
})
export class ListPostionService {
  jobApplications$ = new BehaviorSubject<IJobApplication[]>([]);
  constructor(private afs: Firestore, private auth: AuthService) {
    this.auth.userDataObs$
      .pipe(
        switchMap((e) => {
          const collectionRef = collection(
            this.afs,
            `users/${e?.uid}/job_applications`
          ).withConverter<IJobApplication>(genericConverter<IJobApplication>());
          return collectionData(collectionRef, { idField: 'id' });
        })
      )
      .subscribe((j) => {
        this.jobApplications$.next(j);
      });
  }

  get jobObserver$() {
    return this.jobApplications$.asObservable();
  }
}

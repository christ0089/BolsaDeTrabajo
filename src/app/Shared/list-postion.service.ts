import { Injectable } from '@angular/core';
import { collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { BehaviorSubject, of, Subject, switchMap, takeUntil } from 'rxjs';
import { IJobApplication } from '../Models/job_application';
import { AuthService } from './Auth/auth.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Injectable({
  providedIn: 'root',
})
export class ListPostionService {
  jobApplications$ = new BehaviorSubject<IJobApplication[]>([]);


  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private afs: Firestore, private auth: AuthService) {
    this.auth.userDataObs$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((e) => {
          if (!e) { return of([])}
          const collectionRef = collection(
            this.afs,
            `users/${e?.uid}/job_applications`
          ).withConverter<IJobApplication>(genericConverter<IJobApplication>());

          const q = query(collectionRef, where("active","==", true ))
          return collectionData(q, { idField: 'id' });
        })
      )
      .subscribe((j) => {
        this.jobApplications$.next(j);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  get jobObserver$() {
    return this.jobApplications$.asObservable();
  }
}

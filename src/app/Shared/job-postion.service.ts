import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore } from '@angular/fire/firestore';
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
} from '@firebase/firestore';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { IJobPosition } from '../Models/job_postition';
import { AuthService } from './Auth/auth.service';

export const genericConverter = <T>() => ({
  toFirestore<T>(obj: T): DocumentData {
    return obj;
  },
  fromFirestore<T>(snapshot: QueryDocumentSnapshot<DocumentData>): T {
    const data = snapshot.data()!;
    return data as T;
  },
});

@Injectable({
  providedIn: 'root',
})
export class JobPostionService {
  jobListing$: BehaviorSubject<IJobPosition[]> = new BehaviorSubject<
    IJobPosition[]
  >([]);

  filterKeys$ = new BehaviorSubject<any>(null);
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly afs: Firestore,
    private readonly authService: AuthService
  ) {
    const collectionRef = collection(
      this.afs,
      'job_listing'
    ).withConverter<IJobPosition>(genericConverter<IJobPosition>());

    collectionData(collectionRef, { idField: 'id' })
      .pipe(takeUntil(this.destroy$))
      .subscribe((job) => {
        this.jobListing$.next(job);
      });
  }

  get jobList(): Observable<IJobPosition[]> {
    return this.jobListing$.asObservable();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  favoriteJobPosition(job_id: string, favorite: boolean) {
    const doc_ref = doc(
      this.afs,
      `users/${this.authService.userData$.value?.uid}/job_applications/${job_id}`
    );
    return setDoc(
      doc_ref,
      {
        addedOn: Timestamp.now(),
        active: favorite
      },
      {
        merge: true,
      }
    );
  }

}

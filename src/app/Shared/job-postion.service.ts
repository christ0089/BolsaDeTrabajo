import { Injectable } from '@angular/core';
import { collectionData, doc, Firestore, query, where } from '@angular/fire/firestore';
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
} from '@firebase/firestore';
import { map } from 'd3-array';
import {
  BehaviorSubject,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { IFavorite, IJobPosition } from '../Models/job_postition';
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
  favoriteJobListing$: BehaviorSubject<IFavorite[]> = new BehaviorSubject<
    IFavorite[]
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
    
    const q = query(collectionRef, where("active","==", true ))

    collectionData(q, { idField: 'id' })
      .subscribe((job) => {
        this.jobListing$.next(job);
      });

    this.authService.userData$.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const collectionRef = collection(
          this.afs,
          `users/${user.uid}/saved_job_appplications`
        ).withConverter<IFavorite>(genericConverter<IFavorite>());

        return collectionData(collectionRef, { idField: 'id' }).pipe(
          takeUntil(this.destroy$)
        );
      })
    ).subscribe((j) => {
      this.favoriteJobListing$.next(j);
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
      `users/${this.authService.userData$.value?.uid}/saved_job_appplications/${job_id}`
    );
    return setDoc(
      doc_ref,
      {
        addedOn: Timestamp.now(),
        active: favorite,
      },
      {
        merge: true,
      }
    );
  }
}

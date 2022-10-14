import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, query, where } from '@firebase/firestore';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { IEmployer } from '../Models/employer';
import { AuthService } from './Auth/auth.service';
import { genericConverter } from './job-postion.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeerService {
  employeers$: BehaviorSubject<IEmployer[]> = new BehaviorSubject<IEmployer[]>(
    []
  );

  selectedEmployeer$: BehaviorSubject<IEmployer | null> =
    new BehaviorSubject<IEmployer | null>(null);

  constructor(
    private readonly afs: Firestore,
    private readonly authService: AuthService
  ) {
    const collectionRef = collection(
      this.afs,
      `employeers`
    ).withConverter<IEmployer>(genericConverter<IEmployer>());

    const employeersObs = this.authService.userData$.pipe(
      switchMap((user) => {
        if (!user) {
          return [];
        }

        if (!user.user_role) {
          return [];
        }

        let q = query(collectionRef);
        if (user.user_role == 'employeer') {
          q = query(collectionRef, where('owner', 'array-contains', user.uid));
        }

        return collectionData(q, { idField: 'id' });
      })
    );

    employeersObs.subscribe((_employeers) => {
      console.log(_employeers);
      if (_employeers.length > 0) {
        this.selectedEmployeer$.next(_employeers[0]);
      }
      this.employeers$.next(_employeers);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { collectionData, doc, Firestore } from '@angular/fire/firestore';
import { collection, orderBy, query, Timestamp, updateDoc, where } from '@firebase/firestore';

import { BehaviorSubject, of, switchMap, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

export interface INotification {
  components: string[];
  createdAt: Timestamp;
  status: "notified" | "contracted";
  viewed: boolean;
  id: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass'],
})
export class NotificationsComponent implements OnInit {
  notification$: BehaviorSubject<INotification[]> = new BehaviorSubject<
    INotification[]
  >([]);
  destroy$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  view = false;
  constructor(
    private readonly afs: Firestore,
    private readonly auth: AuthService
  ) {
    this.auth.userDataObs$.pipe(
      // takeUntil(this.destroy$),
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const collectionRef = collection(this.afs, `users/${user.uid}/inbox`).withConverter<INotification>(genericConverter<INotification>());
        const q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('viewed', '==', false)
        );
        return collectionData(q, {idField: "id"});
      })
    ).subscribe(n => {
      console.log(n);
      this.notification$.next(n)
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }

  viewList() {
    this.view = !this.view
  }

  onOpen() {
    const promises = this.notification$.value.map((notification) => {
      if (!this.auth.user.value) return null;
      const docRef = doc(this.afs,`users/${this.auth.user.value.uid}/inbox/${notification.id}` )

      return updateDoc(docRef, {
        viewed : true
      })
    }).filter(v => v == null)

    Promise.all(promises)
  }
}

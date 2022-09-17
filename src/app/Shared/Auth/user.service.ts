import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { IUserData } from 'src/app/Models/user';
import { genericConverter } from '../job-postion.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  loadUserData(uid: string) {
    const docRef = doc(this.firestore, `users/${uid}`).withConverter<IUserData>(
      genericConverter<IUserData>()
    );
    return docData(docRef, { idField: 'id' });
  }

  createUser(data: any, uid: string) {
    //  const prodFunction = httpsCallable(this.functions, 'createUserFunc');
  }
}

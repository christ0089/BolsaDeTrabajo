import { Injectable, Optional } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import {
  ApplicationVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signOut,
  updateCurrentUser,
  User,
  UserCredential,
} from '@firebase/auth';
import { collection, setDoc } from '@firebase/firestore';
import { authState } from 'rxfire/auth';
import {
  BehaviorSubject,
  EMPTY,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { IUserData } from 'src/app/Models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public readonly userData$: BehaviorSubject<IUserData | null> =
    new BehaviorSubject<IUserData | null>(null);
  public readonly auth$: Observable<any> = EMPTY;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly auth: Auth,
    private readonly userService: UserService,
    private readonly afs: Firestore
  ) {
    this.auth$ = authState(this.auth).pipe(
      takeUntil(this.destroy$),
      switchMap((user) => {
        if (user) {
          this.user.next(user);
          return this.userService.loadUserData(user.uid).pipe(
            map((_userData: any) => {
              if (_userData == null) {
                return null;
              }
              return {
                uid: user.uid,
                ..._userData,
              };
            })
          );
        } else {
          return EMPTY;
        }
      })
    );
    this.auth$.subscribe((user) => {
      this.userData$.next(user);
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get isLoggedIn() {
    if (this.user.value == null) {
      return false;
    } else {
      return true;
    }
  }

  get isBusinessAdmin() {
    const user = this.userData$.value;
    if (user === null) {
      return false;
    }
    if (user.user_role === 'employeer') {
      return true;
    } else {
      return false;
    }
  }

  get isAdmin() {
    const user = this.userData$.value;
    if (user === null) {
      return false;
    }
    if (this.isSuperAdmin || this.isBusinessAdmin) {
      return true;
    } else {
      return false;
    }
  }

  get isSuperAdmin() {
    const user = this.userData$.value;
    if (user === null) {
      return false;
    }
    if (user.user_role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  get userDataObs$(): Observable<IUserData | null> {
    return this.userData$.asObservable();
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.userData$.next(null);
    });
  }

  async registerUser(user_registration: any, user_data: any) {
    return createUserWithEmailAndPassword(
      this.auth,
      user_registration.email,
      user_registration.password
    ).then((user) => {
      const docRef = doc(this.afs, `users/${user.user.uid}`);
      return setDoc(
        docRef,
        {
          ...user_data,
          email: user_registration.email,
          user_role: "-"
        },
        {
          merge: true,
        }
      );
    });
  }

  phoneAuth(phone: string, captcha: ApplicationVerifier) {
    return signInWithPhoneNumber(this.auth, phone, captcha);
  }

  emailAuth(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }


  passResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  setUserData() {
    //  (this.user.value as User) = { displayName: data.name + data.lname1 };
    return updateCurrentUser(this.auth, this.user.value);
  }
}

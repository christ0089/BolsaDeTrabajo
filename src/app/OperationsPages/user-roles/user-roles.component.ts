import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { IUserData, Role } from 'src/app/Models/user';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.sass'],
})
export class UserRolesComponent implements OnInit {
  users$: BehaviorSubject<IUserData[]> = new BehaviorSubject<IUserData[]>([]);
  filters = [];

  searchForm = new FormControl();

  constructor(
    private readonly afs: Firestore,
    private readonly functions: Functions,
    private readonly snackBar: MatSnackBar,
    private readonly employeerService: EmployeerService
  ) {
    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchUser(userInput);
    });
  }

  ngOnInit(): void {
    const userRef = collection(this.afs, 'users').withConverter<IUserData>(
      genericConverter<IUserData>()
    );

    collectionData(userRef, {
      idField: 'uid',
    }).subscribe((users) => {
      this.users$.next(users);
    });
  }

  searchUser(search: string) {
    const searchTerm: string = search.toLowerCase();
  }

  async changeRole(user_uid: string, role: Role) {
    const userRoleFunc$ = httpsCallable(this.functions, 'userPromotion');

    await userRoleFunc$({
      role,
      user_uid,
    })
      .then(() => {
        return this.snackBar.open('Se ha actualizado correctamene el rol', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['green-snackbar'],
          duration: 2000,
        });
      })
      .catch((e) => {
        return this.snackBar.open('No se ha actualizado correctamene el rol', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
          duration: 2000,
        });
      });
  }

  async deactivateAccount(user_uid: string) {
    const userRoleFunc$ = httpsCallable(this.functions, 'deactivateAccount');

    await userRoleFunc$({
      user_uid,
    })
      .then(() => {
        return this.snackBar.open('Se ha actualizado correctamente la cuenta', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['green-snackbar'],
          duration: 2000,
        });
      })
      .catch((e) => {
        return this.snackBar.open('No se ha descativado la cuenta', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
          duration: 2000,
        });
      });
  }
}

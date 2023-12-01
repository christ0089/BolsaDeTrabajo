import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { UserRolesViewComponent } from 'src/app/EmployeerComponents/user-roles-view/user-roles.component';
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
  unfiltered_users$: BehaviorSubject<IUserData[]> = new BehaviorSubject<IUserData[]>([]);
  filters = [];

  searchForm = new FormControl();

  constructor(
    private readonly afs: Firestore,
    private readonly matDialog: MatDialog,
  ) {
    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchUser(userInput);
    });
  }

  ngOnInit(): void {
    const userCol = collection(this.afs, 'users').withConverter<IUserData>(
      genericConverter<IUserData>()
    );
    const q = query(
      userCol,
      orderBy('createdAt', 'desc'),
    );

    collectionData(q, {
      idField: 'uid',
    }).subscribe((users) => {
      this.unfiltered_users$.next(users);
      this.users$.next(users);
    });
  }

  searchUser(search: string) {
    const searchTerm: string = search.toLowerCase();
    if (searchTerm == '' || this.users$.value.length == 0) {
      this.users$.next(this.unfiltered_users$.value);
    } else {
      let jobs = this.unfiltered_users$.value;
      Object.keys(jobs).forEach((key) => {
        jobs = jobs.filter((v) => {
          const hasFName = v.fname.toLowerCase().includes(searchTerm);
          const hasLName = v.lname.toLowerCase().includes(searchTerm);
          const hasEmail = v.email.toLowerCase().includes(searchTerm);
          return hasFName || hasEmail || hasLName;
        });
      });
      this.users$.next(jobs);
    }
  }

  async changeRole(user: IUserData) {
    const dialogRef = this.matDialog.open(UserRolesViewComponent, {
      width: '800px',
      maxWidth: '1200px',
      height: '80%',
      data: { user: user },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


}

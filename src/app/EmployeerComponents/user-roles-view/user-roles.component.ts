import { Component, Inject, OnInit } from '@angular/core';
import { Functions } from '@angular/fire/functions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { httpsCallable } from '@firebase/functions';
import { IUserData, Role } from 'src/app/Models/user';
import { AuthService } from 'src/app/Shared/Auth/auth.service';

@Component({
  selector: 'app-user-roles-view',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.sass'],
})
export class UserRolesViewComponent implements OnInit {
  user!: IUserData;
  role!: Role;

  userRoles: Role[] = ['employeer', 'operator', 'admin'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly snackBar: MatSnackBar,
    private readonly functions: Functions
  ) {
    if (data) {
      this.user = data.user;
    }
  }

  ngOnInit(): void {}

  selectRole(_role: Role) {
    this.role = _role;
  }

  async changeRole() {
    const userRoleFunc$ = httpsCallable<any,number>(this.functions, 'userPromotion');

    await userRoleFunc$({
      role: this.role,
      userUid: this.user.uid,
    })
      .then((result) => {
        if (result.data == 200) {
          return this.snackBar.open('Se ha actualizado correctamene el rol', '', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['green-snackbar'],
            duration: 2000,
          });
        } else {
          throw new Error("No se actualizo con exito");
        }
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
}

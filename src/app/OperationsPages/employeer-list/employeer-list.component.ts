import { Component, OnInit } from '@angular/core';
import {
  Firestore,
  collectionData,
  doc,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection, updateDoc } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { IEmployer } from 'src/app/Models/employer';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

export type EmployeerStatus = 'approved' | 'pending' | 'disabled';

@Component({
  selector: 'app-employeer-list',
  templateUrl: './employeer-list.component.html',
  styleUrls: ['./employeer-list.component.sass'],
})
export class EmployeerListComponent implements OnInit {
  employeerApproved$: BehaviorSubject<IEmployer[]> = new BehaviorSubject<IEmployer[]>([]);
  employeerPending$: BehaviorSubject<IEmployer[]> = new BehaviorSubject<IEmployer[]>([]);
  employeerUnfilteredApproved$: BehaviorSubject<IEmployer[]> = new BehaviorSubject<IEmployer[]>([]);
  employeerUnfilteredPending$: BehaviorSubject<IEmployer[]> = new BehaviorSubject<IEmployer[]>([]);
  searchForm = new FormControl();


  constructor(
    private readonly afs: Firestore,
    private readonly authService: AuthService,
    private snackBar: MatSnackBar) {
    const collectionRef = collection(
      this.afs,
      'employeers'
    ).withConverter<IEmployer>(genericConverter<IEmployer>());
    const q_1 = query(collectionRef, where('status', '==', 'approved'), orderBy("createdAt", "desc"));
    const q_2 = query(collectionRef, where('status', '==', 'pending'), orderBy("createdAt", "desc"));
    collectionData(q_1, { idField: 'id' }).subscribe((jobs => {
      this.employeerApproved$.next(jobs)
      this.employeerUnfilteredApproved$.next(jobs)
    }))
    collectionData(q_2, { idField: 'id' }).subscribe((jobs => {
      this.employeerPending$.next(jobs)
      this.employeerUnfilteredPending$.next(jobs)
    }))

    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchUser(userInput);
    });
  }

  ngOnInit(): void { }

  searchUser(search: string = "") {
    const searchTerm: string = search.toLowerCase();
    if (searchTerm == '' || this.employeerApproved$.value.length == 0) {
      this.employeerApproved$.next(this.employeerUnfilteredApproved$.value);
      this.employeerPending$.next(this.employeerUnfilteredApproved$.value);
    } else {
      let jobsApproved = this.employeerUnfilteredApproved$.value;
      let jobsPending = this.employeerPending$.value;
      Object.keys(jobsApproved).forEach((key) => {
        jobsApproved = jobsApproved.filter((v) => {
          const hasName = v.company_name.toLowerCase().includes(searchTerm);
          const hasIndustry = (v.industry || "").toLowerCase().includes(searchTerm);
          return hasName || hasIndustry
        });
      });
      Object.keys(jobsPending).forEach((key) => {
        jobsPending = jobsPending.filter((v) => {
          const hasName = v.company_name.toLowerCase().includes(searchTerm);
          const hasIndustry =  (v.industry || "").toLowerCase().includes(searchTerm);
          return hasName || hasIndustry
        });
      });
      this.employeerPending$.next(jobsPending);
      this.employeerApproved$.next(jobsApproved);
    }
  }

  deactivate(id: string, active: boolean) {
    if (this.authService.isOperator) {
      this.snackBar.open('No tienes permisos de editar', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
        duration: 2000,
      });
      return
    }

    const docRef = doc(this.afs, `employeers/${id}`);

    updateDoc(docRef, {
      active: !active,
    }).then(() => {
      this.snackBar.open('Se ha activado correctamente la empresa', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['green-snackbar'],
        duration: 2000,
      });
    }).catch(e => {
      console.log(e)
      this.snackBar.open('No se ha desactivado correctamente la empresa', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
        duration: 2000,
      });
    });
  }

  approveEmployeer(id: string) {
    const docRef = doc(this.afs, `employeers/${id}`);
    if (this.authService.isOperator) {
      this.snackBar.open('No tienes permisos de editar', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
        duration: 2000,
      });
      return
    }

    updateDoc(docRef, {
      status: 'approved',
    }).then(() => {
      this.snackBar.open('Se ha aprovado correctamente la empresa', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['green-snackbar'],
        duration: 2000,
      });
    }).catch(e => {
      this.snackBar.open('No se ha aprovado correctamente la empresa', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
        duration: 2000,
      });
      console.error(e);
    });
  }
}

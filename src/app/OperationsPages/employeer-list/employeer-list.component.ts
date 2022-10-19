import { Component, OnInit } from '@angular/core';
import {
  collectionData,
  doc,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection, updateDoc } from '@firebase/firestore';
import { active } from 'd3-transition';
import { BehaviorSubject, EMPTY, map, Observable, switchMap } from 'rxjs';
import { IEmployer } from 'src/app/Models/employer';
import { genericConverter } from 'src/app/Shared/job-postion.service';

export type EmployeerStatus = 'approved' | 'pending' | 'disabled';

@Component({
  selector: 'app-employeer-list',
  templateUrl: './employeer-list.component.html',
  styleUrls: ['./employeer-list.component.sass'],
})
export class EmployeerListComponent implements OnInit {
  employeerApproved$: Observable<IEmployer[]> = EMPTY;

  employeerPending$: Observable<IEmployer[]> = EMPTY;

  constructor(private afs: Firestore, private snackBar: MatSnackBar) {
    const collectionRef = collection(
      this.afs,
      'employeers'
    ).withConverter<IEmployer>(genericConverter<IEmployer>());
    const q_1 = query(collectionRef, where('status', '==', 'approved'));
    const q_2 = query(collectionRef, where('status', '==', 'pending'));
    this.employeerApproved$ = collectionData(q_1, { idField: 'id' });

    this.employeerPending$ = collectionData(q_2, { idField: 'id' });
  }

  ngOnInit(): void {}

  deactivate(id: string, active: boolean) {
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

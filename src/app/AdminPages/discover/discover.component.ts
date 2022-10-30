import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { collection, query, where } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from 'src/app/Models/user';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.sass'],
})
export class DiscoverComponent implements OnInit {
  searchForm = new FormControl('');
  breakpoint = 3;
  users$ = new BehaviorSubject<IUserData[]>([])

  schoolLevelForm = new FormControl(''); 
  workHousrsForm = new FormControl(''); 


  constructor(
    private readonly afs: Firestore,
  ) {
    const colRef = collection(this.afs, "users").withConverter<IUserData>(genericConverter<IUserData>());


    const q = query(colRef, where("user_role", "==", "-"))
    collectionData(q).subscribe((v) => {
      this.users$.next(v);
    })
  }

  ngOnInit(): void {}

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  viewUser() {

  }
}

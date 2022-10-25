import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { collection } from '@firebase/firestore';
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
  user$ = new BehaviorSubject<IUserData[]>([])

  schoolLevelForm = new FormControl(''); 
  workHousrsForm = new FormControl(''); 


  constructor(
    private readonly afs: Firestore,
  ) {
    const colRef = collection(this.afs, "users").withConverter(genericConverter<IUserData>());


  }

  ngOnInit(): void {}

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  viewUser() {

  }
}

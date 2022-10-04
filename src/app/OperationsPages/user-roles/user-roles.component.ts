import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from 'src/app/Models/user';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.sass'],
})
export class UserRolesComponent implements OnInit {

  users$: BehaviorSubject<IUserData[]> = new BehaviorSubject<IUserData[]>([]); 
  filters = [];

  searchForm = new FormControl();


  constructor(private readonly afs: Firestore) {

    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchUser(userInput);
    });
  }

  ngOnInit(): void {
    
  }

  searchUser(search: string) {
    const searchTerm: string = search.toLowerCase();

  }

  changeRole(user: IUserData) {

  }

  deactivateAccount(user: IUserData) {
    
  }
  

  

  
}

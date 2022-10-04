import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeer-registration',
  templateUrl: './employeer-registration.component.html',
  styleUrls: ['./employeer-registration.component.sass']
})
export class EmployeerRegistrationComponent implements OnInit {

  constructor(
    private readonly router: Router,
    // private readonly toastController: MatToas
  ) { }

  ngOnInit(): void {
  }

  save() {
    this
  }

}

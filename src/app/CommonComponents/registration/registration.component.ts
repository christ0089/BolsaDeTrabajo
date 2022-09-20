import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = this.formBuilder.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    country_code: ['', Validators.required],
    phone: ['', Validators.required],
  });
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  get f() {
    return this.registrationForm.controls;
  }

  register() {

  }
}

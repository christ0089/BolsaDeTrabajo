import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Auth/auth.service';

import CountryJson from './Country.json';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
})
export class RegistrationComponent implements OnInit {
  countryJson = CountryJson.sort((a, b) => a.name.localeCompare(b.name));
  registrationForm: FormGroup = this.formBuilder.group({
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    country_code: ['+52', Validators.required],
    phone: ['', Validators.required],
  });
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  get f() {
    return this.registrationForm.controls;
  }

  register() {
    const { email, password, ...userData } = this.registrationForm.value;
    console.log(userData);

    this.authService
      .registerUser({ email, password }, userData)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((e) => {});
  }
}

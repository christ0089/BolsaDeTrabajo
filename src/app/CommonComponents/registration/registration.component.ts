import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, map, Observable, startWith } from 'rxjs';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import CountryJson from './Country.json';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { skills } from '../skills';

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
  skillsCtrl = new FormControl('');
  nationality = new FormControl('');
  schoolLevel = new FormControl('');
  loading = false;
  submitted = false;
  page = 0;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  filteredSkills: Observable<string[]> = EMPTY;
  skills: string[] = [];

  allSkills: string[] = skills;

  @ViewChild('skillsInput') skillsInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) =>
        skill ? this._filter(skill) : this.allSkills.slice()
      )
    );
  }

  ngOnInit(): void {}

  get f() {
    return this.registrationForm.controls;
  }

  register() {
    const { email, password, ...userData } = this.registrationForm.value;
    userData.nationality = this.nationality.value;
    userData.skills = this.skills;
    userData.school_level = this.schoolLevel.value;

    this.authService
      .registerUser({ email, password }, userData)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((e) => {});
  }

  next() {
    if (this.page < 4) {
      this.page += 1;
    }
  }

  return() {
    if (this.page <= 0) {
      this.router.navigate(["auth"])
    } else {
      this.page -= 1;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (this.skills.indexOf(value) > -1) {
      return;
    }
    // Add our skill
    if (this.skills.indexOf(value) > -1) {
      this.skills.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillsCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue
    if (this.skills.indexOf(value) > -1) {
      return;
    }

    if (this.skills.length >= 5) {
      this.skills.pop()
    }

    this.skills.push(value);
    this.skillsInput.nativeElement.value = '';
    this.skillsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter((skill) =>
      skill.toLowerCase().includes(filterValue)
    );
  }
}

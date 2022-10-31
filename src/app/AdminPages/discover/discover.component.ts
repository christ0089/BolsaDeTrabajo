import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection, query, Timestamp, where } from '@firebase/firestore';
import { httpsCallable } from '@firebase/functions';
import { BehaviorSubject, combineLatest, tap } from 'rxjs';
import { skills } from 'src/app/CommonComponents/skills';
import { IUserData } from 'src/app/Models/user';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { genericConverter } from 'src/app/Shared/job-postion.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.sass'],
})
export class DiscoverComponent implements OnInit {
  searchForm = new FormControl();
  breakpoint = 3;
  users$ = new BehaviorSubject<IUserData[]>([]);
  filtered_users$ = new BehaviorSubject<IUserData[]>([]);
  loading = false;

  filters: any[] = [
    {
      name: 'Educación',
      filter: 'school_level',
      selected: false,
      values: [
        'Todos',
        'Secundaria',
        'Preparatoria',
        'Licienciatura',
        'Maestría',
      ],
      keys: ['', 'middleschool', 'highschool', 'university', 'masters'],
    },
    {
      name: 'Habilidades',
      filter: 'skills',
      values: skills.concat('Todos'),
      keys: skills.concat(''),
    },
  ];

  filterForm: FormGroup = this.formBuilder.group({
    school_level: [''],
    skills: [''],
  });

  filteredChips$ = new BehaviorSubject<any>(null);

  constructor(
    private readonly afs: Firestore,
    private readonly auth: AuthService,
    private readonly functions: Functions,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly employeerService: EmployeerService
  ) {
    const colRef = collection(this.afs, 'users').withConverter<IUserData>(
      genericConverter<IUserData>()
    );
    const q = query(colRef, where('user_role', '==', '-'));

    combineLatest([collectionData(q), this.filteredChips$])
      .pipe(
        tap(([v, chips]) => {
          let users = v;
          if (chips) {
            if (chips['school_level'] != '') {
              users = users.filter(
                (j) => j.school_level === chips['school_level']
              );
            }

            if (chips['skills'] != '') {
              users = users.filter((j) => {
                if (j.skills) {
                  return j.skills?.indexOf(chips['skills']) > -1;
                }
                return false;
              });
            }
          }
          this.users$.next(v);
          this.filtered_users$.next(users);
        })
      )
      .subscribe();

    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchJob(userInput);
    });
  }

  ngOnInit(): void {
    console.log(this.filters);
  }

  filterChanges(filter: any) {
    this.filteredChips$.next(filter);
  }

  async searchJob(search: string) {
    const searchTerm: string = search.toLowerCase();
    if (searchTerm == '' || this.users$.value === []) {
      this.filtered_users$.next(this.users$.value);
    } else {
      let jobs = this.users$.value;
      Object.keys(jobs).forEach((key) => {
        jobs = jobs.filter((v) => {
          const hasFName = v.fname.toLowerCase().includes(searchTerm);
          const hasLName = v.lname.toLowerCase().includes(searchTerm);
          const hasEmail = v.email.toLowerCase().includes(searchTerm);
          return hasFName || hasLName || hasEmail;
        });
      });
      this.filtered_users$.next(jobs);
    }
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  viewUser() {}

  upload(user: IUserData) {
    this.loading = true;

    const jobApplicationFuntion = httpsCallable<any, any>(
      this.functions,
      'applicatonEmployeerCreate'
    );

    const employee = this.employeerService.selectedEmployeer$.value;

    jobApplicationFuntion({
      jobApplication: {
        active: true,
        formData: [
          {
            resume_url: '',
          },
          {
            prev_employer: '',
            prev_position: '',
          },
        ],
        personal_data: user,
        createdAt: Timestamp.now(),
        job_position: {
          id: 'general',
          name: 'Candidatos General',
          employeer: {
            id: employee?.id,
            company_name: employee?.company_name,
          },
        },
        employer: {
          id: employee?.id,
          company_name: employee?.company_name,
        },
        status: 'applied',
      },
      employer: {
        id: employee?.id,
        company_name: employee?.company_name,
      },
    })
      .then((result) => {
        this.loading = false;
        if (result.data.status == 200) {
          this.snackBar.open('Se ha subido con exito tu aplicación', '', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['green-snackbar'],
            duration: 2000,
          });
        } else {
          throw new Error('No se actualizo con exito');
        }
      })
      .catch((e) => {
        this.loading = false;
        return this.snackBar.open('No ha subido con exito tu aplicación', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: ['red-snackbar'],
          duration: 2000,
        });
      });
  }
}

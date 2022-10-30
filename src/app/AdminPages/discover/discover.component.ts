import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Functions } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { collection, query, Timestamp, where } from '@firebase/firestore';
import { httpsCallable } from '@firebase/functions';
import { BehaviorSubject } from 'rxjs';
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
  users$ = new BehaviorSubject<IUserData[]>([])
  filtered_users$ = new BehaviorSubject<IUserData[]>([])
  loading = false;


  constructor(
    private readonly afs: Firestore,
    private readonly auth: AuthService,
    private readonly functions: Functions,
    private readonly snackBar: MatSnackBar,
    private readonly employeerService: EmployeerService,

  ) {
    const colRef = collection(this.afs, "users").withConverter<IUserData>(genericConverter<IUserData>());


    const q = query(colRef, where("user_role", "==", "-"))
    collectionData(q).subscribe((v) => {
      this.users$.next(v);
      this.filtered_users$.next(v);
    })

    this.searchForm.valueChanges.subscribe((userInput) => {
      this.searchJob(userInput);
    });
  }

  ngOnInit(): void {}

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
          return hasFName || hasLName || hasEmail ;
        });
      });
      this.filtered_users$.next(jobs);
    }
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 400 ? 1 : 3;
  }

  viewUser() {

  }


  upload(user: IUserData) {
    this.loading = true;

    const jobApplicationFuntion = httpsCallable<any,any>(
      this.functions,
      'applicationUserCreate'
    );

    const employee = this.employeerService.selectedEmployeer$.value

    jobApplicationFuntion({
      jobApplication: {
        active: true,
        formData: [
          {
            resume_url: ""
          }, {
            prev_employer: "",
            prev_position:""
          }
        ],
        personal_data: user,
        createdAt: Timestamp.now(),
        job_position: {
          id: "general",
          name: "Candidatos General",
          employeer: {
            id: employee?.id,
            company_name : employee?.company_name
          },
        },
        employer: {
          id: employee?.id,
          company_name : employee?.company_name
        },
        status: "applied"
      },
      employer: {
        id: employee?.id,
        company_name : employee?.company_name
      },
    })
      .then((result) => {
        this.loading = false;
        if (result.data.status == 200) {
          this.snackBar.open(
            'Se ha subido con exito tu aplicación',
            '',
            {
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['green-snackbar'],
              duration: 2000,
            }
          );
        } else {
          throw new Error('No se actualizo con exito');
        }
      })
      .catch((e) => {
        this.loading = false;
        return this.snackBar.open(
          'No ha subido con exito tu aplicación',
          '',
          {
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['red-snackbar'],
            duration: 2000,
          }
        );
      });
  }
}


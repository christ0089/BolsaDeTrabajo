import { Component, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { addDoc, doc, getDoc, setDoc, Timestamp } from '@firebase/firestore';
import { firstValueFrom } from 'rxjs';
import { QuestionBase } from 'src/app/Models/Forms/question-base';
import { IJobPosition } from 'src/app/Models/job_postition';
import { IQuestion } from 'src/app/Models/question';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';
import { StorageService } from 'src/app/Shared/Storage/storage.service';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.sass'],
})
export class JobApplicationComponent implements OnInit {
  questions!: IQuestion[];
  forms!: FormGroup[];
  job!: IJobPosition;
  idx: number = 0;
  loading = false;

  constructor(
    private afs: Firestore,
    private functions: Functions,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private qcs: QuestionControlService,
    private storageService: StorageService
  ) {
    firstValueFrom(this.activeRoute.paramMap)
      .then((params) => {
        const job_id = params.get('id') as string;

        return this.loadJob(job_id);
      })
      .then((j) => {
        this.job = j;
      });
  }

  ngOnInit(): void {
    this.questions = this.qcs.employeeApplicationQuestionair();
    this.forms = [];
    this.questions.forEach((q) => {
      const questions = this.qcs.toFormGroup(q.questions);
      this.forms.push(questions);
    });
  }

  loadJob(id: string) {
    const docRef = doc(this.afs, `job_listing/${id}`);
    return getDoc(docRef).then((doc) => {
      const docData = doc.data() as IJobPosition;
      return {
        ...docData,
        id,
      };
    });
  }

  async setFormPdf(event: any) {
    try {
      const downloadUrl = await this.storageService.postBlob(
        event.file as File,
        `user_applications/${this.auth.userData$.value?.uid}/`,
        `${this.job.id}_${event.question_key}`
      );

      this.forms[this.idx].get(event.question_key)?.setValue(downloadUrl);
      this.questions[this.idx].questions[
        event.question_index
      ].options[0].value = true; // Sets uploaded state to true;
    } catch (e: any) {}
  }

  upload() {
    this.loading = true;
    const { ...questions } = this.forms.flatMap((m) => {
      return m.value;
    });

    const jobApplicationFuntion = httpsCallable(
      this.functions,
      'applicationUserCreate'
    );

    jobApplicationFuntion({
      jobApplication: {
        active: true,
        formData: questions,
        personal_data: this.auth.userData$.value,
        createdAt: Timestamp.now(),
        jop_position: {
          id: this.job.id,
          name: this.job.name,
          employeer: this.job.employer,
        },
        employer: this.job.employer,
      },
      employer: this.job.employer,
    })
      .then((result) => {
        this.loading = false;
        if (result.data == 200) {
          return this.snackBar.open(
            'Se ha actualizado correctamene el rol',
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
          'No se ha actualizado correctamene el rol',
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

import { Component, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
  constructor(
    private qcs: QuestionControlService,
    private afs: Firestore,
    private activeRoute: ActivatedRoute,
    private auth: AuthService,
    private storageService: StorageService
  ) {
    firstValueFrom(this.activeRoute.paramMap).then((params) => {
      const job_id = params.get('id') as string;

      return this.loadJob(job_id);
    }).then((j) => {
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
    const { ...questions } = this.forms.flatMap((m) => {
      return m.value;
    });

    const collectionRef = collection(
      this.afs,
      // `users/${this.auth.userData$.value?.uid || "any" }/user_applications/${this.job_id}`
      `employeers/5thk7FT7wGMOEPNTQyLy/job_applications`
    );

    addDoc(
      collectionRef,
      {
        formData : questions,
        personal_data: this.auth.userData$.value,
        createdAt: Timestamp.now(),
        employer: this.job.employer
      }
    ).then(() => {
      //TODO: Application Complete Page;
    });
  }
}

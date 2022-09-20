import { Component, OnInit } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { QuestionBase } from 'src/app/Models/Forms/question-base';
import { IQuestion } from 'src/app/Models/question';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.sass'],
})
export class JobApplicationComponent implements OnInit {
  questions!: IQuestion[];
  forms!: FormGroup[];

  job_id!: string;
  idx: number = 0;
  constructor(
    private qcs: QuestionControlService,
    private firestore: Firestore,
    private activeRoute: ActivatedRoute
  ) {
    firstValueFrom(this.activeRoute.paramMap).then((params) => {
      this.job_id = params.get("id") as string;
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

  setFormPdf() {}

  upload() {
    const { cv_url } = this.forms[0].value;
    const { prev_employer, prev_position } = this.forms[1].value;

    const collectionRef = collection(
      this.firestore,
      `employeer/${this.job_id}`
    );
  }
}

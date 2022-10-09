import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { collection, doc, setDoc, Timestamp } from '@firebase/firestore';
import { merge } from 'd3-array';
import { IEmployer } from 'src/app/Models/employer';
import {
  BonusTypes,
  IAddress,
  IJobPosition,
  JobPosition,
  IRequirements,
  PositionType,
  WorkHoursTypes,
} from 'src/app/Models/job_postition';
import { IQuestion } from 'src/app/Models/question';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';



@Component({
  selector: 'app-job-position-form',
  templateUrl: './job-position-form.component.html',
  styleUrls: ['./job-position-form.component.sass'],
})
export class JobPositionFormComponent implements OnInit {
  questions!: IQuestion[];
  forms!: FormGroup[];
  constructor(
    private qcs: QuestionControlService,
    private employeerService: EmployeerService,
    private afs: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.forms = [];
    this.questions = [];
    this.questions = this.qcs.employerNewJobPosition();

    this.questions.forEach((q) => {
      this.forms.push(this.qcs.toFormGroup(q.questions));
    });

    if (this.data) {
      const jobPosition = new JobPosition(
        this.data.name,
        this.data.description,
        this.data.payment_expectation,
        this.data.employer,
        this.data.address,
        this.data.position_type,
        this.data.workhours_type || [],
        this.data.bonus_type || [],
        this.data.benefits || []
      );

      jobPosition.id = this.data.id;
      jobPosition.expiration_date = this.data.expiration_date;
      const jobDataForm = jobPosition.positionInfo;

      console.log(jobDataForm);

      this.questions.forEach((q, i) => {
        const questions = this.qcs.mapToQuestion(q.questions, jobDataForm[i]);
        this.forms[i] = this.qcs.toFormGroup(questions);
      });
    }
  }

  async save() {
    const { name, description, expiration_date } = this.forms[0].value;
    const payment_expectation = [
      this.forms[0].get('payment_expectation_min')?.value,
      this.forms[0].get('payment_expectation_max')?.value,
    ];

    const { position_type } = this.forms[1].value;

    let workhours_type = this.forms[2].value;
    workhours_type = Object.keys(workhours_type).filter(
      (k) => workhours_type[k]
    );

    let bonus_type = this.forms[3].value;
    bonus_type = Object.keys(bonus_type).filter((k) => bonus_type[k]);

    const employeer = this.employeerService.employeers$.value[0];

    const docRef = doc(this.afs, `job_listing/${this.data.id}`);
    
    await setDoc(docRef, {
      name,
      description,
      payment_expectation,
      employeer,
      position_type,
      expiration_date: Timestamp.fromDate(expiration_date),
      workhours_type,
      bonus_type,
    } , {
      merge: true,
    });
  }

  get isValid() {
    let isvalid = true;
    this.forms.forEach((f) => {
      if (f.valid == false) {
        isvalid = false;
      }
    });
    return isvalid;
  }
}

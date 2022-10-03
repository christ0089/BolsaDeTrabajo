import { Component, Inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from '@firebase/firestore';
import { IEmployer } from 'src/app/Models/employer';
import {
  BonusTypes,
  IAddress,
  IJobPosition,
  IRequirements,
  PositionType,
  WorkHoursTypes,
} from 'src/app/Models/job_postition';
import { IQuestion } from 'src/app/Models/question';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';

class JobPosition implements IJobPosition {
  id!: string;
  applied: boolean = false;
  remote!: boolean;
  name: string;
  employer: IEmployer;
  description: string;
  requirements: IRequirements[];
  createdAt: Timestamp;
  address: IAddress;
  payment_expectation: number[];
  position_type: PositionType;
  workhours_type: WorkHoursTypes[];
  bonus_type?: BonusTypes[];
  benefits: string[];
  compensations: string[];
  tags: string[];

  constructor(
    name: string,
    description: string,
    payment_expectation: number[],
    employer: IEmployer,
    address: IAddress,
    position_type: PositionType,
    workhours_type: WorkHoursTypes[] = [],
    bonus_type: BonusTypes[] = [],
    benefits: string[] = [],
    createdAt: Timestamp = Timestamp.now(),
    tags: string[] = [],
    compensations: string[] = [],
    requirements: IRequirements[] = []
  ) {
    this.name = name;
    this.employer = employer;
    this.description = description;
    this.requirements = requirements;
    this.createdAt = createdAt;
    this.address = address;
    this.description = description;
    this.bonus_type = bonus_type;
    this.payment_expectation = payment_expectation;
    this.tags = tags;
    this.benefits = benefits;
    this.compensations = compensations;
    this.workhours_type = workhours_type;
    this.position_type = position_type;
  }

  get positionInfo() {
    const work_hours_type = this.workhours_type
    .map((w) => {
      return { [w]: true };
    })
    const benefits = {
      ...this.benefits.map((w) => {
        return { [w]: true };
      }),
    }
    return [
      {
        name: this.name,
        description: this.description,
        payment_expectation_min: this.payment_expectation[0],
        payment_expectation_max: this.payment_expectation[1],
      },
      {
        position_type: this.position_type,
      },
      ...work_hours_type,
      ...benefits
    ];
  }
}

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
        this.data.workhours_type,
        this.data.bonus_type,
        this.data.benefits
      );

      jobPosition.id = this.data.id;
      const jobDataForm = jobPosition.positionInfo;

      console.log(jobDataForm);

      this.questions.forEach((q, i) => {
        const questions = this.qcs.mapToQuestion(q.questions, jobDataForm[i]);
        this.forms[i] = this.qcs.toFormGroup(questions);
      });
    }
  }

  save() {
    console.log(this.forms.map((f) => f.value));

    const { name, description } = this.forms[0].value;
    const payment_expectation = [
      this.forms[0].get('payment_expectation_min')?.value,
      this.forms[0].get('payment_expectation_max')?.value,
    ];

    const { position_type } = this.forms[1].value;

    let workhours_type = this.forms[2].value;
    workhours_type = Object.keys(workhours_type).filter(
      (k) => workhours_type[k]
    );

    let benefits = this.forms[3].value;
    benefits = Object.keys(benefits).filter((k) => benefits[k]);

    const employeer = this.employeerService.employeers$.value[0];

    const address = employeer.address;

    const jobPosition = new JobPosition(
      name,
      description,
      payment_expectation,
      employeer,
      address,
      position_type,
      workhours_type,
      [],
      benefits
    );
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

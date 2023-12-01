import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from 'src/app/Models/Forms/question-base';
import { Observable, BehaviorSubject } from 'rxjs';
import { employer_location, employer_questionaires, job_application,  } from './employeer_questionaires';
import { employee_questionaires, user_info_questionaire } from './employee_questionaire';
import { Role } from 'src/app/Models/user';
import { Timestamp } from '@firebase/firestore';

@Injectable()
export class QuestionControlService {
  formData = new BehaviorSubject<any>({});

  constructor() {}

  currentPath = '';

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};

    for (let question of questions) {
      if (question.type == 'calendar') {
        let _question = (group[question.key] = question.required
          ? new FormControl(
              question.value ||  new Date(Date.now()),
              [Validators.required].concat(...question.validators)
            )
          : new FormControl({
              value: question.value || new Date(Date.now()),
              disabled: question.disabled,
            }));
        console.log(_question);
        break;
      }

      group[question.key] = question.required
        ? new FormControl(
            question.value || '',
            [Validators.required].concat(...question.validators)
          )
        : new FormControl({
            value: question.value || '',
            disabled: question.disabled,
          });
    }
    return new FormGroup(group);
  }

  toEditFormGroup(questions: QuestionBase<any>[], data: any) {
    let group: any = {};

    questions.forEach((question) => {
      if (question.type == 'calendar') {
        group[question.key] = (group[question.key] = question.required
          ? new FormControl(
                (question.value as Timestamp).toDate() || new Date(),
              [Validators.required].concat(...question.validators)
            )
          : new FormControl({
              value: (question.value as Timestamp).toDate() || new Date(),
              disabled: question.disabled,
            }));
      } else {
        group[question.key] = question.required
          ? new FormControl(
              data[question.key] || '',
              [Validators.required].concat(question.validators)
            )
          : new FormControl(
              { value: data[question.key], disabled: question.disabled } || ''
            );
      }
    });

    return new FormGroup(group);
  }

  mapToQuestion(
    questions: QuestionBase<string | number | boolean | Date | Timestamp>[],
    data: any
  ) {
    questions.forEach((question) => {
      question.value = data[question.key]; 
      
      if (question.value instanceof Timestamp) {
        question.value =  (question.value as Timestamp).toDate() 
      }
      question.options = data['options'] || question.options;
    });
    return questions;
  }

  changeState(state: boolean, questions = [], title = '', options = null) {
    this.formData.next({
      state: state,
      questions: questions,
      title: title,
      options: options,
    });
  }

  getState(): Observable<any> {
    return this.formData.asObservable();
  }

  employerInfoQuestionaire(role: Role) {
    return employer_questionaires(role);
  }

  employerNewJobPosition() {
    return job_application();
  }

  employeeUserInfo() {
    return user_info_questionaire();
  }
 
  employeeApplicationQuestionair() {
    return employee_questionaires();
  }
}

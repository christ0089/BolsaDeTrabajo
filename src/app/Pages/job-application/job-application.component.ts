import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  idx: number = 0;
  constructor(private qcs: QuestionControlService) {

    
  }

  ngOnInit(): void {
   this.questions = this.qcs.employeeApplicationQuestionair();
   this.forms = [];
   this.questions.forEach(q => {
     const questions = this.qcs.toFormGroup(q.questions);
     this.forms.push(questions);
   })
  }
}

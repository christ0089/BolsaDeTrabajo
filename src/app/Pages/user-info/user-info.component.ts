import { Component, OnInit } from '@angular/core';
import { Firestore, Timestamp } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { doc, setDoc } from '@firebase/firestore';
import { IQuestion } from 'src/app/Models/question';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.sass'],
})
export class UserInfoComponent implements OnInit {
  forms!: FormGroup[];
  questions!: IQuestion[];
  constructor(
    private qcs: QuestionControlService,
    private auth: AuthService,
    private afs: Firestore
  ) {}
  ngOnInit() {
    this.questions = [this.qcs.employeeUserInfo()];

    this.forms = [];
    this.questions.forEach((q) => {
      const question = this.qcs.toFormGroup(q.questions);
      this.forms.push(question);
    });

    if (this.auth.userData$.value) {
      const e = this.auth.userData$.value

      this.questions = [this.qcs.employeeUserInfo()];
      this.forms = [];
      
      this.questions.forEach((q, i) => {
        const questions = this.qcs.mapToQuestion(q.questions, e);
        this.forms[i] = this.qcs.toFormGroup(questions);
      });
    }
  }

  async save() {
    const formData = this.forms.flatMap((f) => f.value);
    const user = Object.assign({}, ...formData);

    const docRef = doc(this.afs, `users/${this.auth.userData$.value?.uid}`);

    await setDoc(
      docRef,
      {
        ...user,
      },
      {
        merge: true,
      }
    );
    return;
  }
}

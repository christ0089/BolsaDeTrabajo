import { Component, Input, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addDoc, collection, doc, GeoPoint, setDoc } from '@firebase/firestore';
import { Geohash } from 'geofire-common';
import { tap } from 'rxjs';
import { IEmployer } from 'src/app/Models/employer';
import { IQuestion } from 'src/app/Models/question';
import { AuthService } from 'src/app/Shared/Auth/auth.service';
import { EmployeerService } from 'src/app/Shared/employeer.service';
import { QuestionControlService } from 'src/app/Shared/QuestionsService/question-control-service';

export interface AddressComponents {
  long_name: string;
  short_name: string;
  geo_code?: GeoPoint;
  geo_hash?: Geohash;
  types: string;
}

export interface IAddress {
  street: string;
  coords?: GeoPoint | null;
  hash_coords?: string | null;
  state: string;
  colonia: string;
  zip: string;
}

@Component({
  selector: 'app-employer-info-form',
  templateUrl: './employer-info-form.component.html',
  styleUrls: ['./employer-info-form.component.sass'],
})
export class EmployerInfoFormComponent implements OnInit {
  forms!: FormGroup[];
  questions!: IQuestion[];
  address: IAddress = {
    street: '',
    colonia: '',
    state: '',
    zip: '',
    coords: null,
  };

  @Input() edit = false;
  @Input() newBusiness = false;

  e!: IEmployer;

  constructor(
    private afs: Firestore,
    private readonly qcs: QuestionControlService,
    private readonly employeerService: EmployeerService,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const role = this.authService.userData$.value?.user_role || 'operator';
    this.questions = this.qcs.employerInfoQuestionaire(role);
    this.forms = [];
    this.questions.forEach((q) => {
      const questions = this.qcs.toFormGroup(q.questions);
      this.forms.push(questions);
    });

    this.employeerService.selectedEmployeer$
      .pipe(
        tap((e) => {
          console.log(e);
          if (!e) {
            return;
          }

          if (e && this.newBusiness === false) {
            this.edit = true;
            const e = this.employeerService.selectedEmployeer$
              .value as IEmployer;
            this.e = e;
            this.questions = this.qcs.employerInfoQuestionaire(role);
            this.forms = [];
            this.questions.forEach((q, i) => {
              const questions = this.qcs.mapToQuestion(q.questions, e);
              this.forms[i] = this.qcs.toFormGroup(questions);
            });
          }
        })
      )
      .subscribe();
  }

  locationSelected(address: AddressComponents[]) {
    address.forEach((element) => {
      if (element.types.indexOf('route') > -1) {
        this.address.street = element.long_name;
      }
      if (element.types.indexOf('sublocality') > -1) {
        this.address.colonia = element.long_name;
      }
      if (element.types.indexOf('administrative_area_level_1') > -1) {
        this.address.state = element.long_name;
      }
      if (element.types.indexOf('postal_code') > -1) {
        this.address.zip = element.long_name;
        this.forms[2].patchValue({ zip: element.long_name });
      }
    });
  }

  async save() {
    const docBeforeRef = collection(this.afs, `employeers`);

    const formData = this.forms.flatMap((f) => f.value);
    const employeer = Object.assign({}, ...formData);

    const uid = this.authService.userData$.value?.uid;
    employeer.owner = [uid];

    try {
      if (this.edit == true && this.e) {
        const docRef = doc(this.afs, `employeers/${this.e.id}`);

        await setDoc(
          docRef,
          {
            ...employeer,
          },
          {
            merge: true,
          }
        );
        return;
      }

      await addDoc(docBeforeRef, {
        ...employeer,
        status: 'pending',
        active: false,
      });
    } catch (e: any) {
      this.snackBar.open('No se ha creado correctamente la empresa', '', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['red-snackbar'],
        duration: 2000,
      });
    }
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

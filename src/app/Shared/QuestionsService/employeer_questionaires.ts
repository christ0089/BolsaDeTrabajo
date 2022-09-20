
import { Validators } from '@angular/forms';
import { GeolocationQuestion } from 'src/app/Models/Forms/geolocation';
import { TextboxQuestion } from 'src/app/Models/Forms/textbox';
import { UploadFileQuestion } from 'src/app/Models/Forms/upload_file';
import { IQuestion } from 'src/app/Models/question';

export const employeer_registration = (): IQuestion => {
  return {
    title: 'Registro Empresa',
    subtitle: null,
    key: null,
    questions: [
      new UploadFileQuestion({
        key: 'img',
        label: 'Imagen',
        value: '',
        disabled: false,
        order: 0,
        options: [{ key: 'uploaded', value: false }],
        required: true,
        verfication: false,
      }),

    ],
  };
};


export const employer_location = (): IQuestion => {
  return {
    title: "",
    subtitle: null,
    questions: [
      new GeolocationQuestion({
        key: "street",
        label: "Calle",
        value: "",
        required: true,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: "house_ext",
        label: "No. Ext",
        value: "",
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(1)],
      }),
      new TextboxQuestion({
        key: "house_int",
        label: "No Int (Opctional)",
        value: "",
        required: false,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(1)],
      }),
      new TextboxQuestion({
        key: "zip",
        label: "Codigo Postal",
        value: "",
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(5), Validators.maxLength(5)],
      }),
    ],
  }
};


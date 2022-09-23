import { Validators } from '@angular/forms';
import { GeolocationQuestion } from 'src/app/Models/Forms/geolocation';
import { TextboxQuestion } from 'src/app/Models/Forms/textbox';
import { UploadFileQuestion } from 'src/app/Models/Forms/upload_file';
import { IQuestion } from 'src/app/Models/question';

export const employeer_img = (): IQuestion => {
  return {
    title: 'Imagen de la  Empresa',
    subtitle: null,
    key: null,
    questions: [
      new UploadFileQuestion({
        key: 'company_img',
        label: 'Imagen',
        value: '',
        disabled: false,
        order: 0,
        options: [
          { key: 'uploaded', value: false },
          { key: 'file_type', value: 'img' },
          { key: 'file_name', value: '' },
        ],
        required: true,
        verfication: false,
      }),
    ],
  };
};

export const employer_info = (): IQuestion => {
  return {
    title: 'Informacion de la  Empresa',
    subtitle: null,
    key: null,
    questions: [
      new TextboxQuestion({
        key: 'company_name',
        label: 'Nombrede la Empresa',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(1)],
      }),
      new TextboxQuestion({
        key: 'contact_phone',
        label: 'Telefono',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(1)],
      }),
      new TextboxQuestion({
        key: 'contact_email',
        label: 'Correo Electronico',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(1)],
      }),
    ],
  };
};

export const employer_location = (): IQuestion => {
  return {
    title: 'Ubicacion de la Empresa',
    subtitle: null,
    questions: [
      new GeolocationQuestion({
        key: 'street',
        label: 'Calle',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: 'house_ext',
        label: 'No. Ext',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(1)],
      }),
      new TextboxQuestion({
        key: 'house_int',
        label: 'No Int (Opctional)',
        value: '',
        required: false,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(1)],
      }),
      new TextboxQuestion({
        key: 'zip',
        label: 'Codigo Postal',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.minLength(5), Validators.maxLength(5)],
      }),
    ],
  };
};

export const employer_questionaires = (): IQuestion[] => {
  const questions = [employeer_img(), employer_info(), employer_location()];
  return questions;
};

import { Validators } from '@angular/forms';
import { CheckboxQuestion } from 'src/app/Models/Forms/checkbox';
import { GeolocationQuestion } from 'src/app/Models/Forms/geolocation';
import { RadioQuestion } from 'src/app/Models/Forms/radio';
import { TextArea } from 'src/app/Models/Forms/textarea';
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

export const job_application_general_info_questionaire = () => {
  return {
    title: 'Informacion de la posicion',
    subtitle: null,
    questions: [
      new TextboxQuestion({
        key: 'name',
        label: 'Nombre de la posicion',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.maxLength(40)],
      }),
      new TextboxQuestion({
        key: 'description',
        label: 'Descripcion',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.maxLength(5000)],
      }),
      new TextboxQuestion({
        key: 'payment_expectation_min',
        label: 'Pago Minimo',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: 'payment_expectation_max',
        label: 'Pago Maximo',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.maxLength(40)],
      }),
      new RadioQuestion({
        key: 'payment_expectation_max',
        label: 'Pago Maximo',
        value: '',
        required: true,
        order: 0,
        options: [],
        verfication: false,
        validators: [Validators.maxLength(40)],
      }),
    ],
  };
};

export const position_type = () => {
  return {
    title: 'Tipo de Posicion',
    subtitle: null,
    questions: [
      new RadioQuestion({
        key: 'position_type',
        label: '',
        value: '',
        required: true,
        order: 0,
        options: [
          {
            key: 'Medio Tiempo',
            value: 'half_time',
          },
          {
            key: 'Tiempo Completo',
            value: 'full_time',
          },
          {
            key: 'Pasantia',
            value: 'internship',
          },
          {
            key: 'Temporal',
            value: 'tempory',
          },
          {
            key: 'Practicas',
            value: 'apprenticeship',
          },
        ],
        verfication: false
      }),
    ],
  };
};

export const work_hours_type = () => {
  return {
    title: 'Jornadas de Trabajo',
    subtitle: null,
    questions: [
      new CheckboxQuestion({
        key: '8_hours',
        label: '8 horas',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: '10_hours',
        label: '10 horas',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: '12_hours',
        label: '12 horas',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'morning_shift',
        label: 'Tempo Diurno',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'morning_shift',
        label: 'Tiempo Nocturno',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'includes_holidays',
        label: 'Incluye Festivos',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'includes_weekends',
        label: 'Incluye Fin de Semana',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'flexible',
        label: 'Horario Flexible',
        value: '',
        required: false,
        order: 0,
      }),
    ],
  };
};

export const bonus_type = () => {
  return {
    title: 'Tipo de Bonos',
    subtitle: null,
    questions: [
      new CheckboxQuestion({
        key: 'productivity_bonus',
        label: 'Bono de Productividad',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'punctuality_bonus',
        label: 'Bono de Puntualidad',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'monthly_bonus',
        label: 'Bono Mensual',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'yearly_bonus',
        label: 'Bono Anual',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'quarter_bonus',
        label: 'Bono Bimestral',
        value: '',
        required: false,
        order: 0,
      }),
    ],
  };
};

export const benefits = () => {
  return {
    title: 'Tipo de Beneficios',
    subtitle: null,
    questions: [
      new CheckboxQuestion({
        key: 'health_insurance',
        label: 'Seguro Medico',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'dental_insurance',
        label: 'Seguro Dental',
        value: '',
        required: false,
        order: 0,
      }),
      new CheckboxQuestion({
        key: 'vales_despensas',
        label: 'Vales de Despensas',
        value: '',
        required: false,
        order: 0,
      }),
    ],
  };
}

export const job_application = (): IQuestion[] => {
  const questions = [
    job_application_general_info_questionaire(),
    position_type(),
    work_hours_type(),
    bonus_type()
  ];
  return questions;
};

export const employer_questionaires = (): IQuestion[] => {
  const questions = [employeer_img(), employer_info(), employer_location()];
  return questions;
};
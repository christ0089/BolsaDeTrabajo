import { TextboxQuestion } from 'src/app/Models/Forms/textbox';
import { UploadFileQuestion } from 'src/app/Models/Forms/upload_file';
import { IQuestion } from 'src/app/Models/question';

export const user_info_questionaire = () => {
  return {
    title: 'Tu Información',
    subtitle: '',
    questions: [
      new TextboxQuestion({
        key: 'fname',
        label: 'Nombre',
        value: '',
        disabled: false,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: 'lname',
        label: 'Apellidos',
        value: '',
        disabled: false,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: 'birth_date',
        label: 'Fecha de Nacimiento',
        value: '',
        disabled: true,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: 'phone',
        label: 'Teléfono',
        value: 0,
        disabled: false,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Correo',
        value: 0,
        disabled: true,
        order: 0,
        options: [],
        verfication: false,
      })
    ],
  };
};

export const experience_questionaire = () => {
  return {
    title: 'Ingreasa Experiencia Anterior o experiencia relevante',
    subtitle: null,
    questions: [
      new TextboxQuestion({
        key: 'prev_position',
        label: 'Título del empleo',
        value: 0,
        disabled: false,
        order: 0,
        options: [],
        verfication: false,
      }),
      new TextboxQuestion({
        key: 'prev_employer',
        label: 'Empresa',
        value: 0,
        disabled: false,
        order: 0,
        options: [],
        verfication: false,
      }),
    ],
  };
};

export const application_questionaire = () => {
  return {
    title: 'Añadir un CV',
    subtitle: null,
    questions: [
      new UploadFileQuestion({
        key: 'resume_url',
        label: 'Subir CV',
        value: '',
        disabled: false,
        order: 0,
        options: [
          { key: 'uploaded', value: false },
          { key: 'file_type', value: 'pdf' },
          { key: 'file_name', value: '' },
        ],
        required: true,
        verfication: false,
      }),
    ],
  };
};

export const employee_questionaires = (): IQuestion[] => {
  const questions = [application_questionaire(), experience_questionaire()];
  return questions;
};

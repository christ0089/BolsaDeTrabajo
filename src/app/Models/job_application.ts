import { IUserData } from './user';

export interface IExtraQuestions {
  question: string;
  anwser: string;
}

export interface IExtraDocuments {
  document: string;
  url: string;
}

export interface IPrevEmployer {
  name: string;
  position: string;
}

export interface IJobApplication {
  personal_info: IUserData;
  cv_url: string;
  extra_questions: IExtraQuestions[];
  extra_documents: IExtraDocuments[];
  preve_employer: IPrevEmployer;
}

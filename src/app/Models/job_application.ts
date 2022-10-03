import { Timestamp } from '@firebase/firestore';
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
  personal_data: IUserData;
  id: string;
  formData: any;
  createdAt: Timestamp;
}

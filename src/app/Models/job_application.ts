import { Timestamp } from '@firebase/firestore';
import { IEmployer } from './employer';
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
  employeer_data: IEmployer,
  id: string;
  formData: any;
  createdAt: Timestamp;
}

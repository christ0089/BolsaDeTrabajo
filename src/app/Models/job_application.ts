import { Timestamp } from '@firebase/firestore';
import { IEmployer } from './employer';
import { IJobPosition } from './job_postition';
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
  employer: IEmployer,
  job_position: IJobPosition,
  id: string;
  formData: any;
  createdAt: Timestamp;
}

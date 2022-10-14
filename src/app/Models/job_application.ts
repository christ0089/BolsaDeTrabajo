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

export type JobStatus = 'applied' | 'notified' | 'contracted' | 'dismissed';

export interface IJobApplication {
  personal_data: IUserData;
  employer: IEmployer;
  job_position: IJobPosition;
  status: JobStatus;
  id: string;
  formData: any;
  createdAt: Timestamp;
}

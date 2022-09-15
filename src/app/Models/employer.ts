import { IAddress } from './job_postition';

export type Industry = ''; //TODO: List All industry types;
export interface IEmployer {
  name: string;
  active: boolean;
  description: string;
  prof_img: string;
  address: IAddress;
  contact_phone: string;
  contact_email: string;
  industry: string;
}

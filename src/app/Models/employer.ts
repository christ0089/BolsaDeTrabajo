import { IAddress } from './job_postition';

export type EmployeeRange = '1 a 10' | '10 a 25' | '30 a 100' | '100+';

export type Industry = ''; //TODO: List All industry types;
export interface IEmployer {
  id: string;
  company_img: string;
  company_name: string;
  contact_phone: string;
  contact_email: string;
  active: boolean;
  createdAt? : any
  description: string;
  address: IAddress;
  street: string;
  industry: string;
  employee_rage: EmployeeRange;
  status: 'pending' | 'approved';
}

import { IEmployer } from './employer';
import { IUserData } from './user';

export interface IRequirements {
  [name: string]: string;
}
export interface IAddress {
  city: string;
  state: string;
  zip: string;
  street: string;
  coords: any; // TODO: Firebase GeoTypings
}

export type PositionType = 'half_time' | 'full_time' | 'internship' | "tempory" | "apprenticeship";

export type WorkHoursTypes = "8_horus" | "10_hours" | "12_hours" | "morning_shift" | "night_shift" | "guard" | "includes_holidays" | "includes_weekends" | "flexible"
 | "only_weeknds";

 export type BonusTypes = "productivity_bonus" | "punctuality_bonus" | "monthly_bonus" | "yearly_bonus" | "quarter_bonus";

export interface IJobPosition {
  name: string;
  employer: IEmployer;
  description: String;
  requirements: IRequirements[];
  createdDate: any;
  address: IAddress;
  payment_expectation: number[];
  position_type: PositionType;
  workhours_type: WorkHoursTypes[];
  bonus_type?: BonusTypes[];
  benefits: string[];
  bonueses: string[];
  compensations: string[];
  remote? : boolean;
  tags: string[]
}



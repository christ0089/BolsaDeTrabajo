import { Timestamp } from '@firebase/firestore';
import { IEmployer } from './employer';

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

export type WorkHoursTypes = "8_hours" | "10_hours" | "12_hours" | "morning_shift" | "night_shift" | "guard" | "includes_holidays" | "includes_weekends" | "flexible"
 | "only_weeknds";

 export type BonusTypes = "productivity_bonus" | "punctuality_bonus" | "monthly_bonus" | "yearly_bonus" | "quarter_bonus";

export interface IJobPosition {
  id?: string;
  name: string;
  applied: boolean;
  favorite?: boolean;
  employer: IEmployer;
  description: string;
  requirements: IRequirements[];
  createdAt: Timestamp;
  expiration_date: Timestamp,
  address: IAddress;
  payment_expectation: number[];
  position_type: PositionType;
  workhours_type: WorkHoursTypes[];
  bonus_type?: BonusTypes[];
  benefits: string[];
  compensations: string[];
  remote? : boolean;
  tags: string[]
}

export interface IFavorite {
  active : boolean;
  addedOn: Timestamp;
  id: string;
}


export class JobPosition implements IJobPosition {
  id!: string;
  applied: boolean = false;
  remote!: boolean;
  name: string;
  employer: IEmployer;
  description: string;
  requirements: IRequirements[];
  createdAt: Timestamp;
  expiration_date: Timestamp = Timestamp.fromDate(new Date(Date.now()));
  address: IAddress;
  payment_expectation: number[];
  position_type: PositionType;
  workhours_type: WorkHoursTypes[];
  bonus_type: BonusTypes[];
  benefits: string[];
  compensations: string[];
  tags: string[];

  constructor(
    name: string,
    description: string,
    payment_expectation: number[],
    employer: IEmployer,
    address: IAddress,
    position_type: PositionType,
    workhours_type: WorkHoursTypes[] = [],
    bonus_type: BonusTypes[] = [],
    benefits: string[] = [],
    createdAt: Timestamp = Timestamp.now(),
    tags: string[] = [],
    compensations: string[] = [],
    requirements: IRequirements[] = []
  ) {
    this.name = name;
    this.employer = employer;
    this.description = description;
    this.requirements = requirements;
    this.createdAt = createdAt;
    this.address = address;
    this.description = description;
    this.bonus_type = bonus_type || [];
    this.payment_expectation = payment_expectation;
    this.tags = tags || [];
    this.benefits = benefits || [];
    this.compensations = compensations || [];
    this.workhours_type = workhours_type;
    this.position_type = position_type;
  }

  get positionInfo() {
    const work_hours_type = this.workhours_type.map((w) => {
      return { [w]: true };
    });
    const benefits = this.benefits.map((w) => {
      return { [w]: true };
    });

    const bonus_type = this.bonus_type.map((w) => {
      return { [w]: true };
    });

    console.log(bonus_type);
    return [
      {
        name: this.name,
        description: this.description,
        payment_expectation_min: this.payment_expectation[0],
        payment_expectation_max: this.payment_expectation[1],
        expiration_date: this.expiration_date.toDate()
      },
      {
        position_type: this.position_type,
      },
      ...work_hours_type,
      ...bonus_type,
      ...benefits,
    ];
  }
}


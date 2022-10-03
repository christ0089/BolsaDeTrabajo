export type Role = 'admin' | 'operator' | 'employeer';

export interface IUserData {
  uid: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  country_code?: string;
  user_role: Role;
}

export class User implements IUserData {
  uid!: string;
  fname!: string;
  lname!: string;
  email!: string;
  phone!: string;
  user_role!: Role;

  constructor(
    uid: string,
    lname: string,
    fname: string,
    email: string,
    phone: string,
    user_role: Role
  ) {
    this.uid = uid;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.user_role = user_role;
    this.phone! = phone;
  }

  get fullName() {
    return this.fname + this.lname;
  }

  get isAdmin() {
    return this.user_role === 'admin';
  }

  get isEmployer() {
    return this.user_role === 'employeer';
  }
  get isOperator() {
    return this.user_role === 'operator';
  }
}

export interface Location {}

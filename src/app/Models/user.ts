export type Role = 'admin' | 'operator' | 'employeer';

export interface IUserData {
  uid: string;
  name: string;
  last_names: string;
  email: string;
  user_role: Role;
}

export class User implements IUserData {
  uid!: string;
  name!: string;
  last_names!: string;
  email!: string;
  user_role!: Role;

  constructor(
    uid: string,
    name: string,
    last_names: string,
    email: string,
    user_role: Role
  ) {
    this.uid = uid;
    this.name = name;
    this.last_names = last_names;
    this.email = email;
    this.user_role = user_role;
  }

  get fullName() {
    return this.name + this.last_names;
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

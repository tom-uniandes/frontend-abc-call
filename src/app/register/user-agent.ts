export class UserAgent {
  name: string;
  email: string;
  idNumber: string;
  phoneNumber: string;
  company: string;

  constructor(
    name: string,
    email: string,
    idNumber: string,
    phoneNumber: string,
    company: string,
  ) {
    this.name = name;
    this.email = email;
    this.idNumber = idNumber;
    this.phoneNumber = phoneNumber;
    this.company = company;
  }
}

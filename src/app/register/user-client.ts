export class UserClient {
  name: string;
  email: string;
  idNumber: string;
  idType: string;
  phoneNumber: string;
  company: string;

  constructor(
    name: string,
    email: string,
    idNumber: string,
    idType: string,
    phoneNumber: string,
    company: string,
  ) {
    this.name = name;
    this.email = email;
    this.idNumber = idNumber;
    this.idType = idType;
    this.phoneNumber = phoneNumber;
    this.company = company;
  }

}

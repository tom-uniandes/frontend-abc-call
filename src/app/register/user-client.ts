export class UserClient {
  name: string;
  email: string;
  idNumber: string;
  idType: string;
  phoneNumber: string;
  company: string;
  rol: string;
  password: string;

  constructor(
    name: string,
    email: string,
    idNumber: string,
    idType: string,
    phoneNumber: string,
    company: string,
    rol: string,
    password: string
  ) {
    this.name = name;
    this.email = email;
    this.idNumber = idNumber;
    this.idType = idType;
    this.phoneNumber = phoneNumber;
    this.company = company;
    this.rol = rol;
    this.password = password;
  }
}

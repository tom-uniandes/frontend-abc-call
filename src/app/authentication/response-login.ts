export class ResponseLogin {
  token: string;
  rol: string;
  company: string;

  constructor(
    token: string,
    rol: string,
    company: string
  ) {
    this.token = token;
    this.rol = rol;
    this.company = company;
  }

}

export class ResponseLogin {
  token: string;
  rol: string;
  company: string;
  plan: string;

  constructor(
    token: string,
    rol: string,
    company: string,
    plan: string
  ) {
    this.token = token;
    this.rol = rol;
    this.company = company;
    this.plan = plan;
  }

}

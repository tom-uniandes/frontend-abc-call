export class ResponseAuthorization {
  rol: string;
  company: string;
  plan: string;

  constructor(
    rol: string,
    company: string,
    plan: string
  ) {
    this.rol = rol;
    this.company = company;
    this.plan = plan;
  }

}

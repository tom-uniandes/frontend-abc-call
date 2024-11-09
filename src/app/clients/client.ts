export class Client {
    id: string;
    name: string;
    id_type: string;
    id_number: string;
    email: string;
    phoneNumber: string;
    plan: string;
    rol: string;
    company: string;
  
    constructor(
      id: string,
      name: string,
      id_type: string,
      id_number: string,
      email: string,
      phoneNumber: string,
      plan: string,
      rol: string,
      company: string
    ) {
      this.id = id;
      this.name = name;
      this.id_type = id_type;
      this.id_number = id_number;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.plan = plan;
      this.rol = rol;
      this.company = company;
    }
}
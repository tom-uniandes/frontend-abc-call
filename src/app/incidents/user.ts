export class User{
    id: number;
    phone: string;
    name: string;
    email: string;
    company: string;

    constructor(id: number, phone: string, name: string, email: string, company: string){
        this.id = id;
        this.phone = phone;
        this.name = name;
        this.email = email;
        this.company = company;
    }
}
export class User{
    id: number;
    phone: string;
    name: string;
    email: string;

    constructor(id: number, phone: string, name: string, email: string) {
        this.id = id;
        this.phone = phone;
        this.name = name;
        this.email = email;
    }
}
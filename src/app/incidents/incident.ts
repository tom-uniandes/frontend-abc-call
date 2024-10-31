export class Incident {
    id: number;
    type: string;
    description: string;
    date: Date;
    userId: number;
    channel: string;

    constructor(id: number, type: string, description: string, date: Date, userId: number, channel: string) {
        this.id = id;
        this.type = type;
        this.description = description;
        this.date = date;
        this.userId = userId;
        this.channel = channel;
    }
}
export class Incident {
    id: number;
    type: string;
    description: string;
    date: Date;
    userId: number;
    channel: string;
    agentId: string;
    company: string;
    solved: boolean = false;

    constructor(id: number, type: string, description: string, date: Date, userId: number, channel: string, agentId: string, company: string, solved: boolean){
        this.id = id;
        this.type = type;
        this.description = description;
        this.date = date;
        this.userId = userId;
        this.channel = channel;
        this.agentId = agentId;
        this.company = company;
        this.solved = solved;
    }
}
export class IncidentPublic {
  id: number;
  type: string;
  description: string;
  date: Date;
  solved: boolean;

  constructor(id: number, type: string, description: string, date: Date, solved: boolean){
      this.id = id;
      this.type = type;
      this.description = description;
      this.date = date;
      this.solved = solved;
  }
}

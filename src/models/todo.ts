import { Priority, Status } from "../types/enums.js";

export class Todo{
    title:string;
    description:string;
    status:Status;
    priority:Priority;
    due_date:Date;
    constructor(   title:string,
    description:string,
    status:Status,
    priority:Priority,
    due_date:Date){
   this.title = title;
   this.description=description;
    this.status=status;
    this.priority=priority;
    this.due_date=due_date;
    }
}
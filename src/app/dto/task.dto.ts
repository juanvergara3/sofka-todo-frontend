export class TaskDto {

    readonly title: string;
    readonly description: string;
    readonly completed: boolean;
    readonly dueDate: Date;
    readonly list: string;

    constructor(title: string, description: string, completed: boolean, dueDate: string, list: string) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.dueDate = new Date(dueDate);
        this.list = list;
    }
}

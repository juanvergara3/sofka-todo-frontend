export class ListDto {
    readonly title: string;
    readonly color: string;

    constructor(title: string, color: string) {
        this.title = title;
        this.color = color;
    }
}

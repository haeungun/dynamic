export class Schedule {
    event: string;
    auth;

    constructor(event, auth) {
        this.event = event;
        this.auth = auth;
    }
}
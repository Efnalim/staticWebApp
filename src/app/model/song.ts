export class Song {

    constructor() {
        this.id = "";
        this.songName = "";
        this.records = [];
    }

    id: string;
    songName: string;
    records: {
        date: Date;
        performer: string;
    }[];
} 
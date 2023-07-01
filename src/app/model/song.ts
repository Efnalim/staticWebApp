export class Song {

    constructor() {
        this.id = "";
        this.songName = "";
        this.newestRecordDate;
        this.records = [];
    }

    id: string;
    songName: string;
    newestRecordDate: Date | undefined;
    records: {
        date: Date;
        performer: string;
    }[];
} 
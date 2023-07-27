export class Song {

    constructor() {
        this.id = "";
        this.songName = "";
        this.songNumber = "";
        this.newestRecordDate;
        this.records = [];
    }

    id: string;
    songName: string;
    songNumber: string;
    newestRecordDate: Date | undefined;
    records: {
        date: Date;
        performer: string;
    }[];
} 
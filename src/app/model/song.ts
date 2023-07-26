export class Song {

    constructor() {
        this.id = "";
        this.songName = "";
        this.songNumber = NaN;
        this.newestRecordDate;
        this.records = [];
    }

    id: string;
    songName: string;
    songNumber: number;
    newestRecordDate: Date | undefined;
    records: {
        date: Date;
        performer: string;
    }[];
} 
export class Song {
    
    constructor() {
        this.id = "";
        this.songName = "";
        this.songNumber = "";
        this.newestRecordDate;
        this.records = [];
        this.playedThisYearTimes = 0;
    }
    
    id: string;
    songName: string;
    songNumber: string;
    newestRecordDate: Date | undefined;
    playedThisYearTimes: number;
    records: {
        date: Date;
        performer: string;
    }[];
} 
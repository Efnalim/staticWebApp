export class Song {
    
    constructor() {
        this.id = "";
        this.songName = "";
        this.songNumber = "";
        this.newestRecordDate;
        this.records = [];
        this.rehearsers = [];
        this.playedThisYearTimes = 0;
        this.type = SongType.WORSHIP_SONGS;
    }
    
    id: string;
    songName: string;
    songNumber: string;
    newestRecordDate: Date | undefined;
    playedThisYearTimes: number;
    type: SongType;
    rehearsers: string[];
    records: {
        date: Date;
        performer: string;
    }[];
} 

export enum SongType {
    WORSHIP_SONGS = "worship_songs",
    HYMNS = "hymns",
}

export const hymnsPerformers: string[] = [
    "Anička",
    "Eliška",
    "Jani",
    "Jirka",
    "Milan"
]

export const worshipSongsPerformers: string[] = [
    "OG",
    "NG",
    "MIX",
    "mládež"
]
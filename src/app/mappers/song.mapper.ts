import { Song } from "../model/song"

export class SongMapper {
    mapToDomain(json: any): Song {
        let retVal = new Song();
        retVal.id = json._id;
        retVal.songName = json.name;
        if(!json.records) return retVal;
        retVal.records = json.records.map((record: any) => {
            return { date: new Date(record.date), performer: record.performerID}
        }).sort((a: {
            date: Date;
            performer: string;
        }, b: {
            date: Date;
            performer: string;
        }) => b.date.getTime() - a.date.getTime());

        retVal.newestRecordDate = new Date(Math.max.apply(null, retVal.records.map(record => record.date.getTime())));
        return retVal;
    }
}

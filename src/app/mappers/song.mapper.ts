import { Song } from "../model/song"

export class SongMapper {
    mapToDomain(json: any): Song {
        let retVal = new Song();
        retVal.id = json._id;
        retVal.songName = json.name;
        if(!json.records) return retVal;
        retVal.records = json.records.map((record: any) => {
            return { date: new Date(record.date), performer: record.performerID}
        });
        return retVal;
    }
}

import { Song } from "../model/song"

export class SongMapper {
    mapToDomain(json: any): Song {
        let retVal = new Song();
        retVal.id = json._id;
        retVal.songName = json.name;
        retVal.songNumber = json.number;
        if(!json.records) return retVal;
        
        retVal.records = sortRecords(json.records.map((record: any) => {
            return { date: new Date(record.date), performer: record.performerID}
        }))

        if(retVal.records.length == 0 ) {
            retVal.newestRecordDate = undefined;
        } else {
            retVal.newestRecordDate = new Date(Math.max.apply(null, retVal.records.map(record => record.date.getTime())));
            if(!(retVal.newestRecordDate instanceof Date)) {
                retVal.newestRecordDate = undefined;
            }
        }
        return retVal;
    }

    mapToFrom(song: Song): any {
        
    }
}

export function sortRecords(records: { date: Date; performer: string; }[]): { date: Date; performer: string; }[] {
    return records.sort((
        a: { date: Date; performer: string; }, 
        b: { date: Date; performer: string; }
    ) => b.date.getTime() - a.date.getTime());
}

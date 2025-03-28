import { Song } from "../model/song"

export class SongMapper {
    mapToDomain(json: any): Song {
        let retVal = new Song();
        retVal.id = json._id;
        retVal.songName = json.name;
        retVal.songNumber = json.number;
        if(!json.records) return retVal;
        
        retVal.records = sortRecords(json.records.map((record: any) => {
            return { date: new Date(record.date), performer: record.performer}
        }))

        if(retVal.records.length == 0 ) {
            retVal.newestRecordDate = undefined;
        } else {
            retVal.newestRecordDate = new Date(Math.max.apply(null, retVal.records.map(record => record.date.getTime())));
            if(!(retVal.newestRecordDate instanceof Date)) {
                retVal.newestRecordDate = undefined;
            }

            let compareDate = new Date();
            compareDate.setFullYear(compareDate.getFullYear() - 1);
            const compareDateValue = compareDate.getTime();
            retVal.playedThisYearTimes = retVal.records.filter((record) => record.date.getTime() > compareDateValue).length;
        }

        let rehearsers = new Set<string>();
        retVal.records.forEach(record => {
            if (record.date.getFullYear() < 2022) {
                rehearsers.add(record.performer)
            }
        })
        retVal.rehearsers = Array.from(rehearsers);
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

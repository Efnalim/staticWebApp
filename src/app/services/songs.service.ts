import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Song } from '../model/song';
import { SongMapper } from '../mappers/song.mapper';

@Injectable()
export class SongsService {
  ROOT_URL = 'https://eu-central-1.aws.data.mongodb-api.com/app/songapiapp-cehyq/endpoint/songs';
  private mapper: SongMapper;

  constructor(private http: HttpClient) {
    this.mapper = new SongMapper();
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<JSON[]>(`${this.ROOT_URL}`)
      .pipe(map((response: any) => 
        response
          .map((song: any) => this.mapper.mapToDomain(song))
          .sort((a: Song, b: Song) => {
            if(a.newestRecordDate == undefined || b.newestRecordDate == undefined) return true;
            return a.newestRecordDate > b.newestRecordDate;
          })));
  }
}
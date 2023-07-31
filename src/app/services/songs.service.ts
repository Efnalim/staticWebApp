import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Song } from '../model/song';
import { SongMapper } from '../mappers/song.mapper';

@Injectable()
export class SongsService {
  ROOT_URL =
    'https://eu-central-1.aws.data.mongodb-api.com/app/songapiapp-cehyq/endpoint/songs';
  private mapper: SongMapper;

  constructor(private http: HttpClient) {
    this.mapper = new SongMapper();
  }

  public getAllSongs(): Observable<Song[]> {
    return this.http.get<JSON[]>(`${this.ROOT_URL}`).pipe(
      map((response: any) =>
        response
          .map((song: any) => this.mapper.mapToDomain(song))
          .sort((a: Song, b: Song) => {
            if (
              a.newestRecordDate == undefined 
            ) return true;
            if (
              b.newestRecordDate == undefined 
            ) return false;
            return a.newestRecordDate.getTime() < b.newestRecordDate.getTime();
          })
      )
    );
  }

  public postNewSong(song: Song): Observable<Song> {
    return this.http
      .post<JSON[]>(`${this.ROOT_URL}`, this.mapSongToCreateSongDTO(song))
      .pipe(map((response: any) => this.mapper.mapToDomain(response)));
  }

  public updateSong(song: Song): Observable<JSON[]> {
    return this.http
      .put<JSON[]>(`${this.ROOT_URL}`, this.mapSongToUpdateSongDTO(song));
  }

  private mapSongToCreateSongDTO(song: Song): CreateSongDTO {
    let dto = new CreateSongDTO();
    dto.name = song.songName;
    dto.number = song.songNumber;
    dto.records = []
    return dto;
  }

  private mapSongToUpdateSongDTO(song: Song): UpdateSongDTO {
    let dto = new UpdateSongDTO();
    dto._id = song.id;
    dto.name = song.songName;
    dto.number = song.songNumber;
    dto.records = song.records.map(rec => {return {date: rec.date.toISOString(), performer: rec.performer}})
    return dto;

  }
}
class CreateSongDTO {
  constructor() {
    this.name = '';
    this.number = '';
    this.records = [];
  }

  name: string;
  number: string;
  records: {
    date: string;
    performer: string;
  }[];
}

class UpdateSongDTO {
  constructor() {
    this._id = ''
    this.name = '';
    this.number = '';
    this.records = [];
  }

  _id: string;
  name: string;
  number: string;
  records: {
    date: string;
    performer: string;
  }[];
}

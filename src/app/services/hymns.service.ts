import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Song, SongType } from '../model/song';
import { SongMapper } from '../mappers/song.mapper';

@Injectable()
export class HymnsService {
  ROOT_URL =
    'https://eu-central-1.aws.data.mongodb-api.com/app/songapiapp-cehyq/endpoint/hymns';
  private mapper: SongMapper;

  constructor(private http: HttpClient) {
    this.mapper = new SongMapper();
  }

  public getAllSongs(): Observable<Song[]> {
    return this.http.get<JSON[]>(`${this.ROOT_URL}`).pipe(
      map((response: any) =>
        response
          .map((song: any) => this.mapper.mapToDomain(song))
          .map((song: Song) => {
            song.type = SongType.HYMNS
            return song
          })
          .sort((a: Song, b: Song) => {
            if (
              a.songNumber == undefined
            ) return true;
            if (
              b.songNumber == undefined 
            ) return false;
            return Number(a.songNumber) < Number(b.songNumber);
          })
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

  public deleteSong(song: Song): Observable<JSON[]> {
    return this.http
      .put<JSON[]>(`${this.ROOT_URL}`, { delete: true, _id: song.id });
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

    dto.records = song.records.map(rec => {return {date: rec.date, performer: rec.performer}})
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
    date: Date;
    performer: string;
  }[];
}

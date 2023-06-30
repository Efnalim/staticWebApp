import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SongsService {
  ROOT_URL = 'https://eu-central-1.aws.data.mongodb-api.com/app/songapiapp-cehyq/endpoint/songs';

  constructor(private http: HttpClient) {}

  getAllSongs() {
    return this.http.get<JSON>(`${this.ROOT_URL}`)
  }
}
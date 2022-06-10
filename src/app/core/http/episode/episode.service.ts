import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReqEpisodes, IResEpisode, IResEpisodes } from './episode.interface';
import { Cacheable } from 'ts-cacheable';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(protected http: HttpClient) {}

  @Cacheable()
  episodes(request: IReqEpisodes, params: any): Observable<IResEpisodes> {
    const httpParams = {
      params: new HttpParams()
        .set('page', params ? params.pageIndex + 1 : 1)
        .set('name', request && request.name ? request.name : '')
        .set('episode', request && request.episode ? request.episode : ''),
    };

    return this.http.get<IResEpisodes>(
      environment.api + '/episode/',
      httpParams
    );
  }

  @Cacheable()
  episode(episodeId: number): Observable<IResEpisode> {
    const url = environment.api + `/episode/${episodeId}`;
    return this.http.get<IResEpisode>(url);
  }
}

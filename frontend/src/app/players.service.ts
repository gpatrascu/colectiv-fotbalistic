// Angular service to fetch players from API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

export interface GroupInfo{
  groupId: string;
  players: Player[];
}
export interface Player {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class PlayersService {

  constructor(private http: HttpClient) {}

  getPlayers(groupId: string): Observable<Player[]> {
    return this.http.get<GroupInfo>(`/api/group/${groupId}/players`)
      .pipe(map(groupInfo => groupInfo.players));
  }
}

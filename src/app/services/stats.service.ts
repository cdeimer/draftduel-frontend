import { Injectable } from '@angular/core';
import { mockPlayerPool } from '../mock_data/mock-player-pool';
import { Roster } from '../classes/roster';

export interface Player {
  id: string;
  name: string;
  position: string;
  season: number;
  team: string;
  fantasy_points: number;
  games_played: number;
  score?: number;
}

export interface PlayerPool {
  [key: string]: Player[];
  qbs: Player[];
  rbs: Player[];
  wrs: Player[];
  tes: Player[];
}

const totalPlayerPool: PlayerPool = mockPlayerPool;

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  numQBs: number = 2;
  numRBs: number = 4;
  numWRs: number = 4;
  numTEs: number = 2;

  constructor() {}

  // return a list of players from the mock player pool, randomly choosing a number of players from each position
  getMockDraftPool() {
    return {
      qbs: this.getRandomPlayers(totalPlayerPool.qbs, this.numQBs),
      rbs: this.getRandomPlayers(totalPlayerPool.rbs, this.numRBs),
      wrs: this.getRandomPlayers(totalPlayerPool.wrs, this.numWRs),
      tes: this.getRandomPlayers(totalPlayerPool.tes, this.numTEs),
    };
  }

  private getRandomPlayers(player_list: Player[], number_to_select: number) {
    let selected_players: Player[] = [];
    while (selected_players.length < number_to_select) {
      const random_index = Math.floor(Math.random() * player_list.length);
      const player = player_list[random_index];
      if (!selected_players.includes(player)) {
        selected_players.push(player);
      }
    }
    return selected_players;
  }

  // calculate stats for player pool.
  // to do this, take each player from the pool and grab their stats from one random game from that season
  // populate the player object's score field with the fantasy points from that game
  // return the updated player pool
  getScoresForPlayerPool(player_pool: PlayerPool) {
    let all_players = [
      ...player_pool.qbs,
      ...player_pool.rbs,
      ...player_pool.wrs,
      ...player_pool.tes,
    ];
    all_players.forEach((player) => {
      //player.score = this.getRandomGame(player).fantasy_points;
      // for now, just generate a random score from 0.0 to 30.0, rounded to 2 decimal places
      player.score = Math.round(Math.random() * 30 * 100) / 100;
    });
  }

  // get scores for roster
  getScoresForRoster(roster: Roster) {
    roster.players.forEach((player) => {
      player.score = Math.round(Math.random() * 30 * 100) / 100;
    });
  }
}

import { Injectable } from '@angular/core';
import { Player, PlayerPool, StatsService } from './stats.service';
import { Roster } from '../classes/roster';

export interface GameState {
  gameId: string;
  currentPlayer: number;
  draftPool: PlayerPool;
  playerOneRoster: Roster;
  playerTwoRoster: Roster;
}

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  constructor(private statsService: StatsService) {}

  generateGameState(): GameState {
    return {
      gameId: '123',
      currentPlayer: 1,
      draftPool: this.statsService.getMockDraftPool(),
      playerOneRoster: new Roster(),
      playerTwoRoster: new Roster(),
    };
  }

  removePlayerFromDraftPool(
    draftPool: PlayerPool,
    playerId: string
  ): PlayerPool {
    return {
      qbs: draftPool.qbs.filter((player) => player.id !== playerId),
      rbs: draftPool.rbs.filter((player) => player.id !== playerId),
      wrs: draftPool.wrs.filter((player) => player.id !== playerId),
      tes: draftPool.tes.filter((player) => player.id !== playerId),
    };
  }

  addPlayerToRoster(roster: PlayerPool, player: Player): PlayerPool {
    // add player to the correct list in the roster based on position
    return {
      qbs: player.position === 'QB' ? [...roster.qbs, player] : roster.qbs,
      rbs: player.position === 'RB' ? [...roster.rbs, player] : roster.rbs,
      wrs: player.position === 'WR' ? [...roster.wrs, player] : roster.wrs,
      tes: player.position === 'TE' ? [...roster.tes, player] : roster.tes,
    };
  }

  // togglePlayer(gameState: GameState): GameState {
  //   return {
  //     gameId: gameState.gameId,
  //     currentPlayer: gameState.currentPlayer === 1 ? 2 : 1,
  //   };
  // }
}

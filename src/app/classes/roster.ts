import { Player } from '../services/stats.service';

export class Roster {
  qb_limit: number;
  rb_limit: number;
  wr_limit: number;
  te_limit: number;
  players: Player[];

  constructor(
    qb_limit: number = 1,
    rb_limit: number = 2,
    wr_limit: number = 2,
    te_limit: number = 1
  ) {
    this.qb_limit = qb_limit;
    this.rb_limit = rb_limit;
    this.wr_limit = wr_limit;
    this.te_limit = te_limit;
    this.players = [];
  }

  // add a player to the roster if the team has room for a player of that position
  addPlayer(player: Player) {
    console.log('Adding player to roster: ', player.name);
    if (this.players.length < 6) {
      if (
        (player.position === 'QB' &&
          this.players.filter((p) => p.position === 'QB').length <
            this.qb_limit) ||
        (player.position === 'RB' &&
          this.players.filter((p) => p.position === 'RB').length <
            this.rb_limit) ||
        (player.position === 'WR' &&
          this.players.filter((p) => p.position === 'WR').length <
            this.wr_limit) ||
        (player.position === 'TE' &&
          this.players.filter((p) => p.position === 'TE').length <
            this.te_limit)
      ) {
        this.players.push(player);
      } else {
        console.log('Cannot add player to roster');
      }
    }
  }

  // get total score of all players on roster
  getTotalScore(): number {
    return this.players.reduce((acc, p) => acc + (p.score ?? 0), 0);
  }

  // get list of qbs
  getQbs(): Player[] {
    return this.players.filter((p) => p.position === 'QB');
  }

  // get list of rbs
  getRbs(): Player[] {
    return this.players.filter((p) => p.position === 'RB');
  }

  // get list of wrs
  getWrs(): Player[] {
    return this.players.filter((p) => p.position === 'WR');
  }

  // get list of tes
  getTes(): Player[] {
    return this.players.filter((p) => p.position === 'TE');
  }

  // return a list of positions that the roster still needs to fill
  getPositionsNeeded(): string[] {
    let positions_needed: string[] = [];
    if (
      this.players.filter((p) => p.position === 'QB').length < this.qb_limit
    ) {
      positions_needed.push('QB');
    }
    if (
      this.players.filter((p) => p.position === 'RB').length < this.rb_limit
    ) {
      positions_needed.push('RB');
    }
    if (
      this.players.filter((p) => p.position === 'WR').length < this.wr_limit
    ) {
      positions_needed.push('WR');
    }
    if (
      this.players.filter((p) => p.position === 'TE').length < this.te_limit
    ) {
      positions_needed.push('TE');
    }
    return positions_needed;
  }
}

import { Component, Input } from '@angular/core';
import { PlayerPool } from '../../services/stats.service';
import { RosterEntryComponent } from '../roster-entry/roster-entry.component';
import { NgForOf, NgIf } from '@angular/common';
import { GameState } from '../../services/game-state.service';
import { EmptyRosterEntryComponent } from '../roster-entry/empty-roster-entry/empty-roster-entry.component';
import { Roster } from '../../classes/roster';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [RosterEntryComponent, EmptyRosterEntryComponent, NgForOf],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.scss',
})
export class RosterComponent {
  @Input() gameState!: GameState;
  positionList = ['QB', 'RB', 'WR', 'TE'];
  rosters: Roster[] = [];

  constructor() {}

  ngOnInit() {
    this.rosters = [
      this.gameState.playerOneRoster,
      this.gameState.playerTwoRoster,
    ];
  }
}

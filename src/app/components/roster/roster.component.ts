import { Component, Input } from '@angular/core';
import { PlayerPool } from '../../services/stats.service';
import { RosterEntryComponent } from '../roster-entry/roster-entry.component';
import { NgForOf } from '@angular/common';
import { GameState } from '../../services/game-state.service';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [RosterEntryComponent, NgForOf],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.scss',
})
export class RosterComponent {
  @Input() gameState!: GameState;
}

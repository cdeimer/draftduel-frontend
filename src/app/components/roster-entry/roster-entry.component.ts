import { Component, Input } from '@angular/core';
import { Player } from '../../services/stats.service';

@Component({
  selector: 'app-roster-entry',
  standalone: true,
  imports: [],
  templateUrl: './roster-entry.component.html',
  styleUrl: './roster-entry.component.scss',
})
export class RosterEntryComponent {
  @Input() player!: Player;
}

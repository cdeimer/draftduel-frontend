import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { RosterComponent } from './components/roster/roster.component';
import { GameState, GameStateService } from './services/game-state.service';
import { StatsService } from './services/stats.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    JsonPipe,
    PlayerCardComponent,
    NgFor,
    NgIf,
    RosterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'draftduel-frontend';
  gameState: GameState;
  constructor(
    private gameStateService: GameStateService,
    private statsService: StatsService
  ) {
    this.gameState = this.gameStateService.generateGameState();
  }

  // trigger a score calculation for roster when the draft is finished
  // use the getScoresForPlayerPool method from the stats service
  calculateScores() {
    console.log('Calculating scores...');
    if (this.draftIsFinished()) {
      this.statsService.getScoresForRoster(this.gameState.playerOneRoster);
      this.statsService.getScoresForRoster(this.gameState.playerTwoRoster);
      console.log('Scores calculated!');
      alert(
        'Player One Score: ' +
          this.gameState.playerOneRoster.getTotalScore() +
          '\n' +
          'Player Two Score: ' +
          this.gameState.playerTwoRoster.getTotalScore()
      );
    } else {
      console.log('Draft is not finished');
    }
  }

  // function to detect if the draft is finished
  draftIsFinished(): boolean {
    return (
      this.gameState.playerOneRoster.getPositionsNeeded().length === 0 &&
      this.gameState.playerTwoRoster.getPositionsNeeded().length === 0
    );
  }
}

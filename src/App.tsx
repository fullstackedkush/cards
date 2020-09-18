import React from 'react';
import './App.css';
import DeckModule from './modules/Deck';
import HandModule from './modules/Hand';
import Deck from './components/Deck';
import { Player } from './react-app-env.d';
import Hand from './components/Hand';
import getWinner from './helpers/getWinner';

export interface AppProps {
  deck: DeckModule;
  hand: HandModule;
  dealerHand: HandModule;
}

export interface AppState {
  turn: Player;
  deck: DeckModule;
  hand: HandModule;
  dealerHand: HandModule;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      deck: props.deck,
      hand: props.hand,
      dealerHand: props.dealerHand,
      turn: 'player',
    };

    this.onHit = this.onHit.bind(this);
    this.reset = this.reset.bind(this);
    this.onStick = this.onStick.bind(this);
  }

  private onHit() {
    const { hand } = this.state;
    hand.draw();

    this.setState({
      hand,
    });
  }

  private onStick() {
    const { hand, dealerHand } = this.state;

    dealerHand.turnHoleCard();
    while (dealerHand.score < hand.score && !dealerHand.bust) {
      dealerHand.draw();
    }
    this.setState({
      turn: 'dealer',
      dealerHand,
    });
  }

  get winner(): Player | 'draw' | false {
    const { hand, dealerHand, turn } = this.state;
    if (turn === 'player' || dealerHand.score < hand.score) return hand.score > 21 ? 'dealer' : false;

    return getWinner(hand, dealerHand);
  }

  private reset() {
    const { deck, hand, dealerHand } = this.state;
    deck.new();
    hand.new(deck);
    dealerHand.new(deck, true);
    this.setState({
      deck,
      hand,
      dealerHand,
    });
  }

  render() {
    const {
      deck, hand, dealerHand,
    } = this.state;
    const { winner } = this;
    return (
      <div className="App">
        <Deck count={deck.count} />
        <Hand cards={dealerHand.cards} score={dealerHand.score} player="dealer" />
        <Hand cards={hand.cards} score={hand.score} player="player" />
        <div>
          {!winner && (
          <>
            <button type="button" onClick={this.onHit}>Hit!</button>
            <button type="button" onClick={this.onStick}>Stick!</button>
          </>
          )}
          {winner && <h1>{`${winner === 'draw' ? 'nobody' : winner} wins!`}</h1>}
          <button type="button" onClick={this.reset}>Reset!</button>
        </div>
      </div>
    );
  }
}

export default App;

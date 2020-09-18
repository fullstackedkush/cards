import { Card } from '../react-app-env.d';
import calcScore from '../helpers/calcScore';
import Deck from './Deck';

class Hand {
  public cards: Card[] = [];

  private deck!: Deck;

  constructor(deck: Deck, dealer?: boolean) {
    this.new(deck, dealer);
  }

  get score(): number {
    return this.cards.reduce(calcScore, 0);
  }

  get bust(): boolean {
    return this.score > 21;
  }

  get hasBlackJack(): boolean {
    return !!this.cards.find((v) => ['spade', 'club'].includes(v.suit) && v.value === 'jack');
  }

  get hasAceWin(): boolean {
    const { cards, score } = this;
    return score === 21 && cards.length === 2 && !!cards.find((v) => v.value === 'ace');
  }

  get hasHole(): boolean {
    return !!this.cards.find(({ hole }) => hole);
  }

  public new(deck: Deck, dealer?: boolean) {
    this.deck = deck;
    this.cards = [];
    this.draw(dealer);
    this.draw();
  }

  public draw(hole?: boolean) {
    this.cards.push({ ...this.deck.draw(), hole });
  }

  public turnHoleCard() {
    this.cards = this.cards.map((v) => ({ ...v, hole: false }));
  }
}

export default Hand;

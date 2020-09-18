import {
  Card, cardValues, Suit, suits,
} from '../react-app-env.d';

export default class Deck {
  private cards: Card[] = [];

  constructor() {
    this.new();
  }

  get count(): number {
    return this.cards.length;
  }

  public new() {
    this.cards = [];

    cardValues.forEach((value) => {
      suits.forEach((suit: Suit) => {
        this.cards.push({ value, suit });
      });
    });

    this.cards.sort(() => 0.5 - Math.random());
  }

  public draw(): Card {
    return this.cards.pop()!;
  }
}

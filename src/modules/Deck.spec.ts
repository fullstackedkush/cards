import Deck from './Deck';
import { Card } from '../react-app-env.d';

describe('Class for Deck', () => {
  const deck = new Deck();
  let drawn: Card;

  it('Deck has 52 cards on construct', () => {
    expect(deck.count).toEqual(52);
  });

  it('Can draw a card', () => {
    drawn = deck.draw();
    expect(deck.count).toEqual(51);
  });

  it('Should create a new deck, deck should be randomised', () => {
    deck.new();
    expect(deck.count).toEqual(52);
    const firstCard = deck.draw();
    expect(drawn).not.toStrictEqual(firstCard);
  });
});

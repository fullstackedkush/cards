import Hand from './Hand';
import { Card } from '../react-app-env.d';
import Deck from './Deck';

describe('Class for Hand', () => {
  let hand: Hand;
  const deck = new Deck();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should draw 2 cards on construct', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'heart', value: 'ace' } as Card);

    hand = new Hand(deck);

    expect(hand.score).toEqual(12);
  });

  it('Should have a black jack', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'jack' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'heart', value: 10 } as Card);

    hand = new Hand(deck);

    expect(hand.hasBlackJack).toEqual(true);
  });

  it('Should draw a card and go bust', () => {
    hand.draw();

    expect(hand.bust).toEqual(true);
  });

  it('Should have hole card', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 7 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 8 } as Card);
    hand = new Hand(deck, true);

    expect(hand.score).toEqual(8);

    expect(hand.hasHole).toEqual(true);
  });

  it('Should turn hole card', () => {
    hand.turnHoleCard();

    expect(hand.score).toEqual(15);
    expect(hand.hasHole).toEqual(false);
  });
});

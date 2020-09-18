import Deck from '../modules/Deck';
import Hand from '../modules/Hand';
import { Card } from '../react-app-env.d';
import getWinner from './getWinner';

describe('Get Winner test', () => {
  let hand: Hand;
  let dealerHand: Hand;
  const deck = new Deck();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Dealer wins with higher than player', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 3 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 5 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    expect(hand.score).toEqual(13);
    expect(dealerHand.score).toEqual(15);
    expect(getWinner(hand, dealerHand)).toEqual('dealer');
  });

  it('Dealer wins with blackjack', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'jack' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'heart', value: 'ace' } as Card);

    dealerHand = new Hand(deck);
    hand = new Hand(deck);
    expect(getWinner(hand, dealerHand)).toEqual('dealer');
  });

  it('Dealer wins with ace and 21', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 2 } as Card);

    dealerHand = new Hand(deck);
    hand = new Hand(deck);
    hand.draw();
    expect(getWinner(hand, dealerHand)).toEqual('dealer');
  });

  it('Player wins because dealers score is higher', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'diamond', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'club', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    dealerHand.draw();
    expect(hand.score).toEqual(20);
    expect(dealerHand.score).toEqual(22);
    expect(getWinner(hand, dealerHand)).toEqual('player');
  });

  it('Player wins with blackjack', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'jack' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 'queen' } as Card)
      .mockReturnValueOnce({ suit: 'heart', value: 'ace' } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    expect(getWinner(hand, dealerHand)).toEqual('player');
  });

  it('Player wins with ace and 21', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'heart', value: 10 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'club', value: 2 } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    dealerHand.draw();
    expect(getWinner(hand, dealerHand)).toEqual('player');
  });

  it('Draw same score', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 10 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'heart', value: 'queen' } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    expect(getWinner(hand, dealerHand)).toEqual('draw');
  });

  it('Draw with black jack', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'jack' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'club', value: 'jack' } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    expect(getWinner(hand, dealerHand)).toEqual('draw');
  });

  it('Draw with black ace', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 9 } as Card)
      .mockReturnValueOnce({ suit: 'club', value: 'ace' } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    expect(getWinner(hand, dealerHand)).toEqual('draw');
  });

  it('Draw with black ace and jack', () => {
    deck.draw = jest.fn()
      .mockReturnValueOnce({ suit: 'spade', value: 'ace' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 'jack' } as Card)
      .mockReturnValueOnce({ suit: 'spade', value: 'jack' } as Card)
      .mockReturnValueOnce({ suit: 'club', value: 'ace' } as Card);

    hand = new Hand(deck);
    dealerHand = new Hand(deck);
    expect(getWinner(hand, dealerHand)).toEqual('draw');
  });
});

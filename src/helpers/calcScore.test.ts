import { cardValues } from '../react-app-env.d';
import calcScore from './calcScore';

describe('Calc Cards', () => {
  it('Should calculate score with hole as 0', () => {
    expect(calcScore(0, { value: 1, hole: true, suit: 'spade' })).toEqual(0);
  });

  it('Should calculate all number cards as value', () => {
    cardValues.filter((v) => typeof v !== 'string').forEach((value) => {
      expect(calcScore(0, { value, suit: 'spade' })).toEqual(value);
    });
  });

  it('Should calculate all face cards as 10', () => {
    cardValues.filter((v) => ['queen', 'king', 'jack'].includes(v as string)).forEach((value) => {
      expect(calcScore(0, { value, suit: 'spade' })).toEqual(10);
    });
  });

  it('Should calculate an ace as 11 or 1 depending if the number were to make the player bust', () => {
    expect(calcScore(0, { value: 'ace', suit: 'spade' })).toEqual(11);
    expect(calcScore(10, { value: 'ace', suit: 'spade' })).toEqual(21);
    expect(calcScore(11, { value: 'ace', suit: 'spade' })).toEqual(12);
  })
});

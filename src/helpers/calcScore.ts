import { Card } from '../react-app-env.d';

const calcScore = (currentScore: number, { value, hole }: Card) => {
  let score = currentScore;
  if (hole) return score;

  if (value === 'ace') {
    score += ((score + 11) > 21) ? 1 : 11;
  } else if (typeof value === 'string') {
    score += 10;
  } else {
    score += value;
  }

  return score;
};

export default calcScore;

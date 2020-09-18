import React from 'react';
import { Player, Card as CardProps } from '../react-app-env.d';
import Card from './Card';

type HandProps = {
  cards: CardProps[];
  player: Player;
  score: number
};

const Hand: React.FC<HandProps> = ({ cards, player, score }) => (
  <>
    <h3>{`${player}s cards: ${score}`}</h3>
    {cards.map((card) => <Card {...card} key={`${card.suit}: ${card.value}`} />)}
  </>
);

export default Hand;

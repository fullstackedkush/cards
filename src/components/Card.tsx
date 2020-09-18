import React from 'react';
import { Card as CardProps } from '../react-app-env.d';

const Card: React.FC<CardProps> = ({ value, suit, hole }) => {
  const card = value === 'ace' ? 1 : value;
  const src = `${process.env.PUBLIC_URL}${
    hole ? '/SVG-cards/png/1x/back.png' : `/SVG-cards/png/1x/${suit}_${card}.png`
  }`;
  return (
    <img
      alt={`${suit}: ${value}`}
      src={src}
    />
  );
};

export default Card;

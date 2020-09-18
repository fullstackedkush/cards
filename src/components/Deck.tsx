import React from 'react';

export interface DeckProps {
  count: number
}

const Deck: React.FC<DeckProps> = ({ count }) => (
  <>
    <h2>{`The deck: ${count} card${count !== 1 && 's'}`}</h2>
    {count > 0 && (
    <img alt="deck" src={`${process.env.PUBLIC_URL}/SVG-cards/png/1x/back.png`} />
    )}
  </>
);

export default Deck;

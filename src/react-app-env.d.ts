/// <reference types="react-scripts" />
export type Player = 'player' | 'dealer';
  type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<infer ElType>
    ? ElType
    : never;

export const cardValues = ['ace', 'jack', 'queen', 'king', 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const suits = ['club', 'heart', 'diamond', 'spade'];
export type CardValue = ElementType<typeof cardValues>;
export type Suit = ElementType<typeof suits>;
export interface Card {
  value: CardValue;
  suit: Suit
  hole?: boolean
}

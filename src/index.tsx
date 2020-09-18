import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Deck from './modules/Deck';
import Hand from './modules/Hand';

const deck: Deck = new Deck();
const hand: Hand = new Hand(deck);
const dealerHand = new Hand(deck, true);

ReactDOM.render(
  <React.StrictMode>
    <App deck={deck} hand={hand} dealerHand={dealerHand} />
  </React.StrictMode>,
  document.getElementById('root'),
);

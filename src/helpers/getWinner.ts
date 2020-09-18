import Hand from '../modules/Hand';

const getWinner = (playerHand: Hand, dealerHand: Hand) => {
  const draw = playerHand.score === dealerHand.score;
  switch (true) {
    case dealerHand.score > playerHand.score && dealerHand.score <= 21:
    case draw && !playerHand.hasBlackJack && dealerHand.hasBlackJack:
    case draw && !playerHand.hasAceWin && !playerHand.hasBlackJack && dealerHand.hasAceWin:
      return 'dealer';
    case draw && !playerHand.hasBlackJack && !dealerHand.hasBlackJack
    && !playerHand.hasAceWin && !dealerHand.hasAceWin:
    case draw && playerHand.hasBlackJack && dealerHand.hasBlackJack:
    case draw && playerHand.hasAceWin && dealerHand.hasAceWin
    && !playerHand.hasBlackJack && !dealerHand.hasBlackJack:
    case draw && playerHand.hasAceWin && dealerHand.hasAceWin
    && playerHand.hasBlackJack && dealerHand.hasBlackJack:
      return 'draw';
    default:
      return 'player';
  }
};

export default getWinner;

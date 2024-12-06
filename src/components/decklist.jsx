import React from 'react';
import { useDeckContext } from '../provider/DeckBuild';

function CardDeck() {
  const { deck, removeCard } = useDeckContext();
  return (
    <div id="deckContainerWrapper">
      <h3>Your Card Collection</h3>
      <div id="deckList">
        {Object.keys(deck).map((cardName) => (
            
          <div key={cardName} className="cardItem">
            <p>{deck[cardName][0].colors}</p>
            <img src={deck[cardName][0].imageUrl} alt={deck[cardName][0].name} />
            <p>{cardName}</p>
            <p>Total: {deck[cardName].length}</p>
            <button 
              className="deleteButton" 
              onClick={() => removeCard(cardName)}>
              Remove Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardDeck;


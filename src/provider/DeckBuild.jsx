import React, { createContext, useContext, useEffect, useState } from 'react';

const DeckContext = createContext();
const maxCards = 4;

export function DeckProvider({ children }) {
    const [deck, setDeck] = useState({});
    const addCard = (card) => {
        const newDeck = { ...deck };
        const cardName = card.name;
        if (!newDeck[cardName]) {
            newDeck[cardName] = [];
        }

        if (card.type ==='Basic Land'){
            newDeck[cardName].push(card);
            return;
        }

        if (newDeck[cardName].length >= maxCards){
            return;
        } else {
            newDeck[cardName].push(card);
             
        }
        setDeck(newDeck)
    };

    const removeCard = (name) => {
        if (!deck[name]){
            return;
        }

        const newDeck = { ...deck };
        const cards = newDeck[name];
        if (cards.length == 1){
            delete newDeck[name];
        } else {
            cards.pop();
        }
        setDeck(newDeck)
    };

    

    return (
        <DeckContext.Provider value={{ deck: deck, addCard, removeCard}}>
            {children}
        </DeckContext.Provider>
    );
};

export function useDeckContext() {
    return useContext(DeckContext);
};
import { useContext,useEffect, useState } from "react"
import { SelectedContext } from "../App.jsx";
import CardDeck from "../components/decklist.jsx"
import AddCard from "./AddCard.jsx";
function DeckPanel() {
    const {selected} = useContext(SelectedContext)
    
    if (!selected || selected.length === 0) {
        return <div className="content">Нет выбранных карт.</div>;
    }
   return <div className="content">
        <AddCard selected={selected}/>
        <CardDeck/>
    </div>
}

export {DeckPanel}
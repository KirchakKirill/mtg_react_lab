import {useContext, useEffect, useState,useCallback, useRef} from "react";
import {Mtg} from "../api/mtg.js";
import { SelectedContext } from "../App.jsx";




const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };

function CardList() {
    const [cards, setCards] = useState([]);
    const [cardf,setCard] = useState('')
    const {setSelected} = useContext(SelectedContext)
    

    const debouncedSearchQuery = useDebounce(cardf, 500);

    function handleSearch(event) {
        setCard(event.target.value)
    }

    function handleClick(event) {
        const clickedElement = event.target.getAttribute('id')
        const clickedCard =  cards.filter((card)=>card.id === clickedElement)
        setSelected(clickedCard)
    }

    // const fetchCards = useCallback(async () => {
    //     let index = Math.floor(Math.random() * 100) + 1;
    //     console.log(index)        
    //     const response = await fetch(`https://api.magicthegathering.io/v1/cards?page=${index}`)
    //     const data = await response.json()
    //     const cardsData = data.cards

    //     if(cards) setCards(cards=>[...cards,...cardsData])
    //     else setCards(cardsData)
    //   }, [])

    
    useEffect(() => {

        
            const mtg = new Mtg();
            mtg.loadCards(debouncedSearchQuery) 
            .then((loadedCards) => {
                console.log(loadedCards)
                setCards(loadedCards)
            });
        
        

    }, [debouncedSearchQuery]); 
    

   return <div id="menu">
        <label htmlFor="filter" style={{fontSize: 20,fontWeight: "bold"}}>Search Card</label>
        <input id="filter" type='text' className="control" value={cardf} onChange={handleSearch}></input>
        <h2>Cards</h2>
        <div id="listContainer">
            {cards.map((card) => {
            return <li id = {card.id} key={card.id} onClick={handleClick}>{card.name}</li>
            })}
        </div>
    </div>
}
export {CardList}
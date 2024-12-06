import { useState,useEffect, useRef, createContext } from 'react';
import './App.css'
import {CardList} from "./components/CardList.jsx";
import {DeckPanel} from "./components/DeckPanel.jsx";
import {StatisticsPanel} from "./components/StatisticsPanel.jsx";
import { DeckProvider } from './provider/DeckBuild.jsx';

export const SelectedContext = createContext()

const SelectedContextProvider = ({children})=>{
    const [selected,setSelected] = useState(undefined)

    return (
        <SelectedContext.Provider value={{selected,setSelected}}>
            {children}
        </SelectedContext.Provider>
    )
}

function App() {

  return (
      <>
          <header>
              <h1>MTG Deck Builder</h1>
          </header>
          <main className="main">
              <SelectedContextProvider>
              <DeckProvider>
              <CardList />
              <DeckPanel />
              <StatisticsPanel/>
              </DeckProvider>
              </SelectedContextProvider>
             
          </main>
      </>
  )
}

export default App

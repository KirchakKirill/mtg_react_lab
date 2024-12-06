import { useDeckContext } from "../provider/DeckBuild.jsx";

export default function AddCard({selected}){
    const {addCard} = useDeckContext()
    return <><div id="cardsContainer">
        <h1 className='contentHeader'>
            <div className="card">
                <img src={selected[0].imageUrl} alt="Card image" />
            </div>
            <div className="card-body">
                <div className="card-text">
                    <p> {selected[0].text}</p>
                </div>
            </div>
        </h1>
    </div><button onClick={() => addCard(selected[0])}>Add card</button></>
}
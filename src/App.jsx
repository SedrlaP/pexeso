import { useState, useEffect } from 'react'

const DEFAULT_NUM_OF_PAIRS = 4 
const NUM_OF_ROWS = 2
const NUM_OF_COLS = 2

function App() {
  const [cards, setCards] = useState([])

  class Card {
    constructor(value) {
      this.value = value
      this.turned = true
    }
  }

  useEffect(() => {

    generateCards(2)
  
  }, [])

  // generuje karty podle počtu párů

  function generateCards(numOfPairs) {
    console.log("function runs")
    for (let i = 0; i < numOfPairs; i++) {
      setCards(prevState => [...prevState, new Card(i), new Card(i)])
    }    
  }

  console.log("karty", cards)


  const gameArray = []

  function setGameArray(columns, rows) { 
  
    for (let i = 0; i < columns; i++) {
      
      gameArray[i] = [];
      
      for (let j = 0; j < rows; j++) {

        gameArray[i][j] = cards[(i+j)+(gameArray.length-1)]
      
      }
    }
  }
  
setGameArray(NUM_OF_COLS, NUM_OF_ROWS)

function handleCardClick(card) {

}

const gameElements = gameArray.map(x => 
  <div className='row'>
    { x.map((card, idx) => 
    <div className='card' key={idx}>
      {card ? card.value : "" }
    </div>
    )}
  </div>
  )

  return (
    <>
      <div className='container'>
        {gameElements}
      </div>
    </>
  )
}

export default App




import { useState, useEffect } from 'react'

const DEFAULT_NUM_OF_PAIRS = 4 
const NUM_OF_ROWS = 2
const NUM_OF_COLS = 2

function App() {
  const [cards, setCards] = useState([])

  class Card {
    constructor(id, value) {
      this.id = id
      this.value = value
      this.turned = true
    }
  }

  useEffect(() => {

    generateCards(4)
  
  }, [])

  // generuje karty podle počtu párů

  function generateCards(numOfPairs) {
    console.log("function runs")
     
    for (let i = 0; i < numOfPairs; i++) {
      const id = 0
      setCards(prevState => [...prevState, new Card(id, i), new Card(id, i)])
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

function handleCardClick(event) {
  console.log(event.target.firstChild.data)

}

const gameElements = gameArray.map(x => 
  <div className='row'>
    { x.map((card, idx) => card ?
    <div onClick={(e) => handleCardClick(e)} className='card' key={idx}>
      { card.value }
    </div>
    : "")}
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




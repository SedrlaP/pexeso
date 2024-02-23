import { useState, useEffect } from 'react'

const DEFAULT_NUM_OF_PAIRS = 4 
const NUM_OF_ROWS = 2
const NUM_OF_COLS = 2

function App() {
  const [numOfCards, setNumOfCards] = useState(DEFAULT_NUM_OF_PAIRS * 2)
  const [cards, setCards] = useState([])

  class Card {
    constructor(value) {
      this.value = value
      this.turned = false
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

        gameArray[i][j] = []
      
      }
    }
  }
  
  setGameArray(NUM_OF_COLS, NUM_OF_ROWS)

  gameArray.map(x => x.map(y => console.log(y)))
  let a = 0
  let b = 0
  const gameElements = gameArray.map(x => <div className='row'>{ x.map(y => <div className='card' key={b++}>{a++}</div>)}</div>)

  return (
    <>
      <div className='container'>
        {gameElements}
      </div>
    </>
  )
}

export default App




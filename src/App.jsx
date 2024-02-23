import { useState, useEffect } from "react"

const DEFAULT_NUM_OF_PAIRS = 4
const NUM_OF_ROWS = 2
const NUM_OF_COLS = 4

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

    let id = 0
    for (let i = 0; i < numOfPairs; i++) {
      setCards((prevState) => [
        ...prevState,
        new Card((id += 1), i),
        new Card((id += 1), i),
      ])
    }
  }

  console.log("karty", cards)

  const gameArray = []

  function setGameArray(rows, columns) {
    const newCards = cards.map((x) => x)
    console.log(newCards)
    for (let i = 0; i < rows; i++) {
      gameArray[i] = []
      for (let j = 0; j < columns; j++) {
        gameArray[i][j] = newCards.shift()
      }
    }
  }

  setGameArray(NUM_OF_ROWS, NUM_OF_COLS)

  function handleCardClick(card) {
    console.log(card)
    // otoceni karty podle id kliknute karty
    // po otoceni 2 smazat nebo otocit zpet
  }

  const gameElements = gameArray.map((x) => (
    <div className="row">
      {x.map((card, idx) =>
        card ? (
          <div onClick={() => handleCardClick(card)} className="card" key={idx}>
            {card.value}
          </div>
        ) : (
          ""
        )
      )}
    </div>
  ))

  return (
    <>
      <div className="container">{gameElements}</div>
    </>
  )
}

export default App

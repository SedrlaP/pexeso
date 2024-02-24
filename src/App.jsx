import { useState, useEffect } from "react"

const DEFAULT_NUM_OF_PAIRS = 4
const NUM_OF_ROWS = 2
const NUM_OF_COLS = 4

function App() {
  const [cards, setCards] = useState([])

  /*class Card {
    constructor(id, value) {
      this.id = id
      this.value = value
      this.turned = true
    }
  }*/

  useEffect(() => {
    generateCards(4)
  }, [])

  // generuje karty podle počtu párů

  function generateCards(numOfPairs) {
    console.log("function runs")

    let rid = 0
    for (let i = 0; i < numOfPairs; i++) {
      setCards((prevState) => [
        ...prevState,
        { id: (rid += 1), value: i, turned: true },
        { id: (rid += 1), value: i, turned: true },
      ])
    }
  }

  console.log("karty", cards)

  const gameArray = []

  // generuje 2D pole a vyplní je kartami

  function setGameArray(rows, columns) {
    const newCards = cards.map((x) => x)
    for (let i = 0; i < rows; i++) {
      gameArray[i] = []
      for (let j = 0; j < columns; j++) {
        gameArray[i][j] = newCards.shift()
      }
    }
  }

  setGameArray(NUM_OF_ROWS, NUM_OF_COLS)

  // najde kartu, na kterou uživatel klikl a "otočí ji"

  function handleCardClick(card) {
    setCards((prevState) =>
      prevState.map((x) => {
        return card.id === x.id ? { ...x, turned: !card.turned } : { ...x }
      })
    )

    // otoceni karty podle id kliknute karty otocenou kartu pridat do noveho pole if pole.length 2 >
    // po otoceni 2 smazat (filter podle ID karty z noveho pole vuci cards poli) nebo otocit zpet
  }

  const gameElements = gameArray.map((x) => (
    <div className="row">
      {x.map((card, idx) =>
        card ? (
          <div
            onClick={() => handleCardClick(card)}
            className={"card " + (card.turned ? "show" : "hidden")}
            key={idx}
          >
            {card.turned ? card.value : ""}
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

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
        { id: (rid += 1), value: i, turned: false },
        { id: (rid += 1), value: i, turned: false },
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
    // po otoceni 2 smazat (filter podle ID karty z noveho pole vuci cards poli nebo otocit zpet
  }

  const turnedCards = cards.filter((x) => x.turned === true)
  if (turnedCards.length === 2) {
    console.log("otocene 2 karty")
    checkTurnedCards(turnedCards[0], turnedCards[1])
  }

  // zkontroluje otočené karty, pokud jsou stejné smaže je z pole karet, pokud ne otočí se zpět

  function checkTurnedCards(firstCard, secondCard) {
    firstCard.value === secondCard.value
      ? // smaže otočené karty z pole karet
        setCards((prevState) =>
          prevState.filter((x) => x.value != firstCard.value)
        )
      : // otočí karty zpět
        setCards((prevState) =>
          prevState.map((x) =>
            x.id === firstCard.id || x.id === secondCard.id
              ? { ...x, turned: !x.turned }
              : { ...x }
          )
        )
  }

  console.log("otoceno", turnedCards)

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

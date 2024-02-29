import { useState, useEffect } from "react"

const DEFAULT_NUM_OF_PAIRS = 4
const NUM_OF_ROWS = 2
const NUM_OF_COLS = 4

function App() {
  const [cards, setCards] = useState([])
  const [gameStarted, setGameStarted] = useState(false)

  /*class Card {
    constructor(id, value) {
      this.id = id
      this.value = value
      this.turned = true
    }
  }
  
  

function findClosestPair(num) {
  const sqNum = Math.sqrt(num)
  let lower = Math.floor(sqNum)
  let upper = Math.ceil(sqNum)

  if (lower * upper === num) {
    return [lower, upper]
  } else {
    while (lower > 1) {
      lower--;
      if (num % lower === 0) {
      upper = num / lower
        return [lower, upper]
      }
    }
    while (true) {
      upper++;
      if (num % upper === 0) {
      lower = num / upper
        return [lower, upper]
      }
      if (lower * upper > num) {
        return null;
      }
    }
  }
}
  
  */

  useEffect(() => {
    generateCards(4)
  }, [])

  // generuje karty podle počtu párů

  function generateCards(numOfPairs) {
    console.log("function runs")
    setCards([])
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
    if (turnedCards.length === 2) return

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
    setTimeout(() => {
      checkTurnedCards(turnedCards[0], turnedCards[1])
    }, "1000");
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
      { gameStarted ? 
        <div className="container">{gameElements}</div>
       : <button onClick={() => setGameStarted(true)}>START</button>}
    </>
  )
}

export default App

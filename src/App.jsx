import { useState, useEffect } from "react"
import StartGameScreen from "./components/startGameScreen"
import EndGameScreen from "./components/endGameScreen"

const DEFAULT_NUM_OF_PAIRS = 4
const NUM_OF_ROWS = 2 
const NUM_OF_COLS = 4

function App() {
  const [cards, setCards] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameArray, setGameArray] = useState([])
  const [userInput, setUserInput] = useState(8)


// najde počet řádků a sloupců podle počtu karet

function findNumOfRowsAndColumns(target) {
    // Initialize variables to store the closest pair
    let closestPair = [1, target];

    // Iterate through potential factors up to the square root of the target
    for (let i = 2; i <= Math.sqrt(target); i++) {
        // Check if the current factor divides the target evenly
        if (target % i === 0) {
            // Calculate the other factor
            let otherFactor = target / i;
            // Check if this pair of factors is closer than the current closest pair
            if (Math.abs(i - otherFactor) < Math.abs(closestPair[0] - closestPair[1])) {
                closestPair = [i, otherFactor];
            }
        }
    }

    // Return the closest pair
    return closestPair;
}

  useEffect(() => {
    generateCards(userInput)
  }, [gameStarted])

  useEffect(() => {
    const [rows, cols] = findNumOfRowsAndColumns(userInput)
    getGameArray(rows, cols)
  }, [cards] )

  // generuje karty podle počtu párů

  function generateCards(numOfCards) {
    const numOfPairs = numOfCards / 2
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

  // generuje 2D pole a vyplní je kartami

  function getGameArray(rows, columns) {
    const arr = []
    const newCards = cards.map((x) => x)
    for (let i = 0; i < rows; i++) {
      arr[i] = []
      for (let j = 0; j < columns; j++) {
        arr[i][j] = newCards.shift()
      }
    }

    // uloží vyplněné 2D pole kartami 
    setGameArray(arr)
  }

  function handleCardClick(card) {

    // zabrání otočení více jak 2 karet v jednu chvíli
    if (turnedCards.length === 2) return

    // otočí kartu 
    setCards((prevState) =>
      prevState.map((x) => {
        return card.id === x.id ? { ...x, turned: !card.turned } : { ...x }
      })
    )
  }


  // uloží otočené karty
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
              ? { ...x, turned: false }
              : { ...x }
          )
        )
  }

  console.log("otoceno", turnedCards)

  console.log("gamearray", gameArray)

  function startGame(e) {
    e.preventDefault()
    setGameStarted(true)
  }

  function restartGame() {
    setGameStarted(false)
  }

  // vygeneruje elementy
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
      { !gameStarted ? 
        <StartGameScreen startGame={startGame} userInput={userInput} handleState={setUserInput}/>
        : 
        cards.length !== 0 ?
        <div className="container">{gameElements}</div> 
        :
        <EndGameScreen restartGame={restartGame}/>
       }
    </>
  )
}

export default App

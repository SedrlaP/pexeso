import { useState, useEffect } from "react"
import StartGameScreen from "./components/StartGameScreen"
import EndGameScreen from "./components/EndGameScreen"
import Timer from "./components/Timer"

const DEFAULT_NUMBER_OF_CARDS = 8

function App() {
  const [cards, setCards] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameArray, setGameArray] = useState([])
  const [userInput, setUserInput] = useState(DEFAULT_NUMBER_OF_CARDS)


// Najde počet řádků a sloupců podle počtu karet
function findNumOfRowsAndColumns(target) {
  if (target % 2 !== 0) {target += 1}
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
    return closestPair;
}
  useEffect(() => {
    generateCards(userInput)
    console.log("karticky", cards)
  }, [gameStarted])

  useEffect(() => {
    const [rows, cols] = findNumOfRowsAndColumns(userInput)
    getGameArray(rows, cols)
  }, [cards])


  // Generuje karty podle počtu párů

  function generateCards(numOfCards) {
    const numOfPairs = numOfCards / 2
    const cardsArr = []
    let rid = 0
    for (let i = 0; i < numOfPairs; i++) {
      cardsArr.push({ id: (rid += 1), value: i, turned: false })
      cardsArr.push({ id: (rid += 1), value: i, turned: false })
    }
   shuffleArray(cardsArr)
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    setCards(array)
}

  // Generuje 2D pole a vyplní je kartami

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


  // Uloží otočené karty
  const turnedCards = cards.filter((x) => x.turned === true)
  
  if (turnedCards.length === 2) {
    console.log("otocene 2 karty")
    setTimeout(() => {
      checkTurnedCards(turnedCards[0], turnedCards[1])
    }, "1000");
  }

  // Zkontroluje otočené karty, pokud jsou stejné smaže je z pole karet, pokud ne otočí se zpět

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

  function startGame(e) {
    e.preventDefault()
    setGameStarted(true)
  }

  function restartGame() {
    setGameStarted(false)
  }

  // Vygeneruje elementy
  const gameElements = gameArray.map((x) => (
    <div className="row">
      {x.map((card) =>
        card ? (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={"card " + (card.turned ? "show" : "hidden")}
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
        <> 
          <Timer timerStarted={gameStarted} numOfCards={cards.length}/>
          {
            cards.length > 0 ?          
            <div className="container">{gameElements}</div> 
            :
            <EndGameScreen restartGame={restartGame}/> 
          }  
        </>
      }
    </>
  )
}

export default App

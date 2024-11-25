import { useState, useEffect } from "react"
import StartGameScreen from "./components/StartGameScreen/StartGameScreen"
import EndGameScreen from "./components/EndGameScreen/EndGameScreen"
import Timer from "./components/Timer/Timer"

const DEFAULT_NUMBER_OF_CARDS = 8

function App() {
  const [cards, setCards] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [gameArray, setGameArray] = useState([])
  const [userInput, setUserInput] = useState(DEFAULT_NUMBER_OF_CARDS)


// find number of rows and columns base on number of cards
function findNumOfRowsAndColumns(target) {
  if (target % 2 !== 0) {target += 1}
    let closestPair = [1, target];

    // iterate through potential factors up to the square root of the target
    for (let i = 2; i <= Math.sqrt(target); i++) {
        // check if the current factor divides the target evenly
        if (target % i === 0) {
            // calculate the other factor
            let otherFactor = target / i;
            // check if this pair of factors is closer than the current closest pair
            if (Math.abs(i - otherFactor) < Math.abs(closestPair[0] - closestPair[1])) {
                closestPair = [i, otherFactor];
            }
        }
    }
    return closestPair;
}
  useEffect(() => {
    generateCards(userInput)
  }, [gameStarted])

  useEffect(() => {
    const [rows, cols] = findNumOfRowsAndColumns(userInput)
    getGameArray(rows, cols)
  }, [cards])


  // generate cards based on number of card pairs

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

  // generate 2D array and fill it with cards

  function getGameArray(rows, columns) {
    const arr = []
    const newCards = cards.map((x) => x)
    for (let i = 0; i < rows; i++) {
      arr[i] = []
      for (let j = 0; j < columns; j++) {
        arr[i][j] = newCards.shift()
      }
    }

    // save filled array 
    setGameArray(arr)
  }

  function handleCardClick(card) {

    // prevent flipping more than 2 cards at a time
    if (turnedCards.length === 2) return

    // flip card 
    setCards((prevState) =>
      prevState.map((x) => {
        return card.id === x.id ? { ...x, turned: true } : { ...x }
      })
    )
  }

  // save flipped cards
  const turnedCards = cards.filter((x) => x.turned === true)
  
  if (turnedCards.length === 2) {
    setTimeout(() => {
      checkTurnedCards(turnedCards[0], turnedCards[1])
    }, "1000");
  }

  // check if flipped cards are same, if they are delete them from array, if they are not flip them back

  function checkTurnedCards(firstCard, secondCard) {
    firstCard.value === secondCard.value
      ? // delete flipped cards from array
        setCards((prevState) =>
          prevState.filter((x) => x.value != firstCard.value)
        )
      : // flip cards back
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

  // generate card elements
  const gameElements = gameArray.map((x) => (
    <div className="flex">
      {x.map((card) =>
        card ? (
          <div
            key={card.id}
            onClick={() => handleCardClick(card)}
            className={"m-2 h-24 w-24 rounded-sm text-6xl cursor-pointer relative [perspective:1000px] transition-all duration-500 [transform-style:preserve-3d] " + (card.turned ? "[transform:rotateY(180deg)]" : "hover:scale-110")}
          >
            <div className="bg-card absolute inset-0 h-full w-full [backface-visibility:hidden]">
            </div>
            <div className="absolute inset-0 flex items-center justify-center h-full w-full bg-white px-12 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
              {card.value}
            </div>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  ))

  return (
    <>
      { 
        !gameStarted ? 
        <StartGameScreen startGame={startGame} userInput={userInput} handleState={setUserInput}/>
        : 
        <> 
          {  
            gameStarted && (cards.length > 0) ? 
            <button 
              onClick={restartGame} 
              className="bg-[#69C0E3] hover:bg-[#5BB9D1] py-1 px-2 rounded-lg"
            >
              Main menu
            </button>
            : <></>
          }
          <Timer timerStarted={gameStarted} numOfCards={cards.length}/>
            { 
              cards.length > 0 ?          
              <div className="flex flex-col">{gameElements}</div> 
              :
              <EndGameScreen restartGame={restartGame}/> 
            }  
        </>
      }
    </>
  )
}

export default App

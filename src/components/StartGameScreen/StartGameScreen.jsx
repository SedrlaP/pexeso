import { useState } from "react"


function StartGameScreen(props) {
  
    return (
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-4xl">MEMORY GAME</h1>
          <form className="flex flex-col justify-center items-center" onSubmit={props.startGame}>
            <label className="mt-4" htmlFor="userInput">Number of cards {props.userInput}</label>
            <input type="range" id="userInput" min="2" max="48" step="2" value={props.userInput} onChange={(e) => props.handleState(e.target.value)} /><br />
            <button type="submit" className="border py-2 px-4 rounded-lg bg-[#69C0E3] hover:bg-[#5BB9D1]">Start game</button>
          </form>
          <div className="flex flex-col mt-8">
            <h3 className="text-xl">How to play:</h3>
            <ul className="">
              <li className="text-lg lg:hidden">For the best experience, please switch your phone to landscape mode.</li>
              <li className="text-lg">Setting up the game:</li>
                <ol className="list-decimal ml-10">
                  <li>Select number of cards</li>
                  <li>Start the game</li>
                </ol>
              <li className="text-lg">Playing:</li>
                <ol className="list-decimal ml-10">
                  <li>Flip 2 cards to find the same symbol</li>
                  <li>If 2 cards match they will be removed from the field</li>
                  <li>If 2 cards don't match they will be flipped back</li>
                  <li>Continue until you find all the pairs</li>
                </ol>  
              <li className="text-lg">Goal: </li>
                <ol className="list-decimal ml-10">
                  <li>Match all pairs of cards as quickly as possible.</li>
                </ol>
            </ul>
          </div>
                    
        </div>
    )
}

export default StartGameScreen
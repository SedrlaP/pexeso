function StartGameScreen(props) {

    return (
        <div className="flex flex-col">
          <h1>MEMORY GAME</h1>
          <form className="flex flex-col justify-center items-center" onSubmit={props.startGame}>
            <label htmlFor="userInput">Number of cards {props.userInput}</label>
            <input type="range" id="userInput" min="2" max="100" step="2" value={props.userInput} onChange={(e) => props.handleState(e.target.value)} /><br />
            <button type="submit">START</button>
          </form>
        </div>
    )
}

export default StartGameScreen
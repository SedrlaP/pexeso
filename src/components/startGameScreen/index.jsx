function StartGameScreen(props) {

    return (
        <>
        <form onSubmit={props.startGame}>
          <input type="text" value={props.userInput} onChange={(e) => props.handleState(e.target.value)} />
          <button type="submit">START</button>
        </form>
        </>
    )
}

export default StartGameScreen
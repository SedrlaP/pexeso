function EndGameScreen(props) {
    return (
        <div className="flex flex-col">
            <div className="">All cards matched!</div>
            <button onClick={() => props.restartGame()}>RESTART</button>
        </div>
     )
}

export default EndGameScreen
function EndGameScreen(props) {
    return (
        <div className="container end">
            <div>GAME ENDED</div>
            <button onClick={() => props.restartGame()}>RESTART</button>
        </div>
     )
}

export default EndGameScreen
function EndGameScreen(props) {
    return (
        <>
            <div>GAME ENDED</div>
            <button onClick={() => props.restartGame()}>RESTART</button>
        </>
     )
}

export default EndGameScreen
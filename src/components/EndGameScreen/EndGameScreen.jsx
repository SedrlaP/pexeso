function EndGameScreen(props) {
    return (
        <div className="flex flex-col items-center">
            <div className="font-semibold text-4xl">Congratulations!</div>
            <button 
                onClick={() => props.restartGame()} 
                className="bg-[#69C0E3] hover:bg-[#5BB9D1] py-1 px-2 rounded-lg mt-4"
            >
                Main menu
            </button>
        </div>
     )
}

export default EndGameScreen
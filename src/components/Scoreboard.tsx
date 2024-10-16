type ScoreboardProps = {
    player1: number;
    player2: number;
    player2Active: boolean;
};

const Scoreboard = (props: ScoreboardProps) => {
    return (
        <div className="scoreboard">
            <div className={props.player2Active ? "" : "active"}>
                <h2>Player 1</h2>
                <p>{props.player1}</p>
            </div>
            <div className={props.player2Active ? "active" : ""}>
                <h2>Player 2</h2>
                <p>{props.player2}</p>
            </div>
        </div>
    );
};

export default Scoreboard;

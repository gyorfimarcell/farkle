type PlayerBoxProps = {
    round: number;
    selected: number;
    onHold: Function;
    onThrow: Function;
    onEndTurn: Function;
    hasSetAside: boolean;
};

const PlayerBox = (props: PlayerBoxProps) => {
    return (
        <div className="player-box">
            <div>
                <p>
                    Round: <span>{props.round}</span>
                </p>
                <p>
                    Selected: <span>{props.selected}</span>
                </p>
            </div>

            <div>
                <button
                    onClick={() => props.onHold()}
                    disabled={props.selected === 0}
                >
                    Hold
                </button>
                <button
                    onClick={() => props.onThrow()}
                    disabled={!props.hasSetAside}
                >
                    Roll again
                </button>
                <button
                    onClick={() => props.onEndTurn()}
                    disabled={!props.hasSetAside}
                >
                    Pass
                </button>
            </div>
        </div>
    );
};

export default PlayerBox;

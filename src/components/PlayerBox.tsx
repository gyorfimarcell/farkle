type PlayerBoxProps = {
    total: number;
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
            <p>total/2000</p>
            <p className="total">{props.total}</p>
            <p>
                round <span>{props.round}</span>
            </p>
            <p>
                selected <span>{props.selected}</span>
            </p>
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
    );
};

export default PlayerBox;

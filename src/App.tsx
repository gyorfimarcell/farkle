import { useEffect, useState } from "react";
import { DiceType, GuaranteedThrow, ScoreSelected, Throw } from "./DiceUtils";
import PlayerBox from "./components/PlayerBox";
import Dice from "./components/Dice";
import Scoreboard from "./components/Scoreboard";

function App() {
    const [player2Active, setPlayer2Active] = useState<boolean>(false);

    const [player1Total, setPlayer1Total] = useState<number>(0);
    const [player2Total, setPlayer2Total] = useState<number>(0);

    const [held, setHeld] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);
    const [hasSetAside, setHasSetAside] = useState<boolean>(false);
    const [dice, setDice] = useState<DiceType[]>(GuaranteedThrow(6));

    const [bustAnimation, setBustAnimation] = useState<boolean>(false);

    const selectDice = (i: number) => {
        const newList = [...dice];
        newList[i].seleced = !newList[i].seleced;
        setDice(newList);
    };

    const holdDice = () => {
        setHeld(held + selected);
        setDice(dice.filter((x) => !x.seleced));
        setHasSetAside(true);
    };

    const throwAgain = () => {
        const newDice = Throw(dice.length == 0 ? 6 : dice.length);
        setDice(newDice);
        setHasSetAside(false);

        if (ScoreSelected(newDice.map((x) => x.num)) == 0) {
            setBustAnimation(true);
            SwitchPlayer();
        }
    };

    const endTurn = () => {
        if (player2Active) setPlayer2Total(player2Total + held);
        else setPlayer1Total(player1Total + held);

        SwitchPlayer();
    };

    const SwitchPlayer = () => {
        setPlayer2Active(!player2Active);
        setHeld(0);
        setHasSetAside(false);
        setDice(GuaranteedThrow(6));
    };

    useEffect(() => {
        setSelected(
            ScoreSelected(dice.filter((x) => x.seleced).map((x) => x.num))
        );
    }, [dice]);

    return (
        <div>
            <Scoreboard
                player1={player1Total}
                player2={player2Total}
                player2Active={player2Active}
            />
            <PlayerBox
                round={held}
                selected={selected}
                onHold={() => holdDice()}
                onThrow={() => throwAgain()}
                onEndTurn={() => endTurn()}
                hasSetAside={hasSetAside}
            />
            <div className="dice-container">
                {dice.map((dice, i) => (
                    <Dice dice={dice} onClick={() => selectDice(i)} />
                ))}
            </div>
            <h1
                className={"bust-text " + (bustAnimation ? "active" : "")}
                onAnimationEnd={() => setBustAnimation(false)}
            >
                Bust
            </h1>
        </div>
    );
}

export default App;

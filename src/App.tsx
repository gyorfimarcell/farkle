import { useEffect, useState } from "react";
import { DiceType, GuaranteedThrow, ScoreSelected, Throw } from "./DiceUtils";
import PlayerBox from "./components/PlayerBox";
import Dice from "./components/Dice";

function App() {
    const [total, setTotal] = useState<number>(0);
    const [held, setHeld] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);
    const [hasSetAside, setHasSetAside] = useState<boolean>(false);
    const [dice, setDice] = useState<DiceType[]>(GuaranteedThrow(6));

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
        const newDice = Throw(dice.length);
        setDice(newDice);
        setHasSetAside(false);

        if (ScoreSelected(newDice.map((x) => x.num)) == 0) {
            alert("GAME OVER!");
        }
    };

    const endTurn = () => {
        setTotal(total + held);
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
            <PlayerBox
                total={total}
                round={held}
                selected={selected}
                onHold={() => holdDice()}
                onThrow={() => throwAgain()}
                onEndTurn={() => endTurn()}
                hasSetAside={hasSetAside}
            />
            <div>
                {dice.map((dice, i) => (
                    <Dice dice={dice} onClick={() => selectDice(i)} />
                ))}
            </div>
        </div>
    );
}

export default App;

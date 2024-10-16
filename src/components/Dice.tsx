import { DiceType } from "../DiceUtils";

type DiceProps = {
    dice: DiceType;
    onClick: Function;
};

const Dice = (props: DiceProps) => {
    return (
        <div
            className={"dice " + (props.dice.seleced ? "selected " : "")}
            onClick={() => props.onClick()}
        >
            {[...Array(props.dice.num)].map(() => (
                <div className="dot"></div>
            ))}
        </div>
    );
};

export default Dice;

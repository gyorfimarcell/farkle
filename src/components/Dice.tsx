import { DiceType } from "../DiceUtils";

type DiceProps = {
    dice: DiceType;
    onClick: Function;
};

const Dice = (props: DiceProps) => {
    return (
        <div
            className={"dice " + (props.dice.seleced ? "selected" : "")}
            onClick={() => props.onClick()}
        >
            <span>{props.dice.num}</span>
        </div>
    );
};

export default Dice;

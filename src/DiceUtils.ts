export type DiceType = {
    num: number;
    seleced: boolean;
};

export const Throw = (count: number) => {
    let dice: DiceType[] = [];
    for (let i = 0; i < count; i++) {
        dice.push({
            num: Math.floor(Math.random() * 6) + 1,
            seleced: false,
        });
    }
    return dice;
};

export const GuaranteedThrow = (count: number) => {
    let dice: DiceType[];
    do {
        dice = Throw(count);
    } while (ScoreSelected(dice.map((x) => x.num)) == 0);
    return dice;
};

export const ScoreSelected = (dice: number[]) => {
    let score = 0;
    for (const num of dice) {
        if (num == 1) {
            score += 100;
        } else if (num == 5) {
            score += 50;
        }

        //TODO: rest of scoring
    }

    return score;
};

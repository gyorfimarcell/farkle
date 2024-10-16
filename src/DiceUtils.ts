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

    let count = [0, 0, 0, 0, 0, 0];

    for (const num of dice) {
        count[num - 1]++;
    }

    // Full straight
    if (
        count[0] == 1 &&
        count[1] == 1 &&
        count[2] == 1 &&
        count[3] == 1 &&
        count[4] == 1 &&
        count[5] == 1
    ) {
        score = 1500;
        return score;
    }

    // Partial straight 1-5
    if (
        count[0] == 1 &&
        count[1] == 1 &&
        count[2] == 1 &&
        count[3] == 1 &&
        count[4] == 1
    ) {
        score = 500;
        return score;
    }

    // Partial straight 2-6
    if (
        count[1] == 1 &&
        count[2] == 1 &&
        count[3] == 1 &&
        count[4] == 1 &&
        count[5] == 1
    ) {
        score = 750;
        return score;
    }

    // X of kind
    for (let i = 0; i < 6; i++) {
        if (count[i] >= 3) {
            score = i == 0 ? 1000 : 100 * (i + 1);

            if (count[i] >= 4) {
                score *= 2;
            }
            if (count[i] >= 5) {
                score *= 2;
            }
            if (count[i] == 6) {
                score *= 2;
            }

            count[i] = 0;
        }
    }

    // Single 1
    score += count[0] * 100;

    // Single 5
    score += count[4] * 50;

    return score;
};

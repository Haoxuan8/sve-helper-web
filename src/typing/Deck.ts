export type Deck = {
    key?: string;
    id?: number;
    name?: string;
    craft: string;
    basic_deck?: {
        [cardNO: string]: number,
    },
    evo_deck?: {
        [cardNO: string]: number,
    },
    leader_card_no?: string;
}

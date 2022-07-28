import {Craft} from "@/typing/Card";

export type Deck = {
    key?: string;
    id?: number;
    name?: string;
    craft: Craft;
    basic_deck?: {
        [cardNO: string]: number | undefined,
    },
    evo_deck?: {
        [cardNO: string]: number | undefined,
    },
    leader_card_no?: string;
}

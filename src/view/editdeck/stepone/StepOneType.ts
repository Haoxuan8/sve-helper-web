import {Craft} from "@/typing/Card";

export enum EditDeckType {
    craft,
    deckCode,
}

export type NextClickValueType = {
    type: EditDeckType;
    craft: Craft;
}

export type StepOnePageProps = {
    onNextClick: (value: NextClickValueType) => void;
}

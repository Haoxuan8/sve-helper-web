import {Card} from "@/typing/Card";
import {split} from "lodash";

export const buildCard = (card: Card | undefined, cardNo: string | undefined): { card_no: string, from: string } => {
    if (card) return card;
    else {
        return {
            from: split(cardNo, "-")?.[0] ?? "",
            card_no: cardNo ?? "",
        }
    }
}

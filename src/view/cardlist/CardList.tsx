import React, {FC, useState} from "react";
import {NativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, Button} from "@mui/material";
import {useRequest} from "ahooks";
import CardService from "@/service/card/CardService";
import {Card} from "@/typing/Card";

export type CardListProps = {} & NativeProps;

const defaultProps = {}

const CardList: FC<CardListProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [cardList, setCardList] = useState<Card[]>([]);
    const [total, setTotal] = useState(0);

    const {loading, run} = useRequest(CardService.getCardListAsync, {
        manual: true,
        onSuccess: (result, params) => {
            setCardList(p => [...p, ...result.list]);
            setTotal(result.total);
        }
    })

    return (
        <Box sx={{my: 2, backgroundColor: "#CFE8FC"}}>
            {
                cardList.map(card => {
                    return (
                        <div key={card.card_no}>
                            {card.name_jp}
                        </div>
                    )
                })
            }
            <Button
                onClick={() => {
                    run({pageable: {limit: 10, offset: cardList.length}})
                }}
            >
                click to fetch
            </Button>
        </Box>
    )
}

export default CardList;

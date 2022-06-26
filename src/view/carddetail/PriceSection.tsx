import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useEffect, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Typography, Paper, Box, Skeleton} from "@mui/material";
import {Card} from "@/typing/Card";
import {useRequest} from "ahooks";
import CardService from "@/service/card/CardService";

export type PriceSectionProps = {
    card: Card;
} & NativeProps;

const defaultProps = {};

const PriceSection: FC<PriceSectionProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [price, setPrice] = useState<string>();

    const {loading, run} = useRequest(CardService.getCardPriceAsync, {
        manual: true,
        onSuccess: (result) => {
            setPrice(result);
        }
    });

    useEffect(() => {
        run({card_no: props.card.card_no});
    }, [props.card.card_no]);

    return withNativeProps(
        props,
        <Paper elevation={3}>
            <Box sx={{p: 2}}>
                <Typography variant="body1">
                    <div className="flex items-center">
                        <div className="mr-2">遊々亭 —</div>
                        <div className="flex-auto">
                            {
                                loading
                                    ? (<Skeleton animation="wave" height={32}/>)
                                    : `${price}日元`
                            }
                        </div>
                    </div>
                </Typography>
            </Box>
        </Paper>
    )
}

export default PriceSection;

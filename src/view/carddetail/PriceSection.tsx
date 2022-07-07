import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useEffect, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Typography, Paper, Box, Skeleton} from "@mui/material";
import {Card} from "@/typing/Card";
import {useRequest} from "ahooks";
import CardService, {PriceDetail} from "@/service/card/CardService";
import _ from "lodash";

export type PriceSectionProps = {
    card: Card;
} & NativeProps;

const defaultProps = {};

const renderUUTStock = (text: string | undefined): string => {
    if (_.isEmpty(text)) return "";
    else return `库存：${text}`;
}

const PriceSection: FC<PriceSectionProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [price, setPrice] = useState<PriceDetail>();

    const {loading, run} = useRequest(CardService.getCardPriceDetailAsync, {
        manual: true,
        onSuccess: (result) => {
            setPrice(result);
        }
    });

    useEffect(() => {
        run({card_no: props.card.card_no});
    }, [props.card.card_no]);

    const uut = price?.uut;
    const uutPrice = uut?.price;
    const uutStock = uut?.stock;

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
                                    ? (
                                        <Skeleton animation="wave" height={32} />)
                                    : (
                                        <>
                                            <span className="mr-6">
                                                  {_.isEmpty(uutPrice) ? "暂无价格" : `${uutPrice}日元`}
                                            </span>
                                            <span>
                                                  {renderUUTStock(uutStock)}
                                            </span>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </Typography>
            </Box>
        </Paper>
    )
}

export default PriceSection;

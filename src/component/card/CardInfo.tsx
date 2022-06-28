import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC} from "react";
import {Card as MuiCard, CardContent, Typography} from "@mui/material"
import {mergeProps} from "@/util/withDefaultProps";
import {Card, cardTypeName} from "@/typing/Card";

export type CardInfoProps = {
    card: Card;
    onClick: () => void;
} & NativeProps;

const defaultProps = {};

const CardInfo: FC<CardInfoProps> = (p) => {
    const props = mergeProps(defaultProps, p);

    return withNativeProps(
        props,
        <MuiCard
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={props.onClick}
            variant="outlined"
        >
            <CardContent>
                <Typography variant="h6">
                    {props.card.name_cn}
                </Typography>
                <Typography variant="caption" component="div">
                    {props.card.name_jp}
                </Typography>
                <Typography variant="caption" component="div">
                    {props.card.card_no}
                </Typography>
                <Typography variant="caption" component="div">
                    {cardTypeName[props.card.card_type]}
                </Typography>
            </CardContent>
        </MuiCard>
    )
}

export default CardInfo;

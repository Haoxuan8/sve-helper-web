import React, {FC, useRef, useState} from "react";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {Card, CardBase} from "@/typing/Card";
import {buildCard} from "@/component/card/util";
import SearchIcon from "@mui/icons-material/Search";
import {
    Popover,
    Box,
    IconButton,
    CircularProgress,
    Typography, Container, PopoverActions
} from "@mui/material";
import classNames from "classnames";
import {useRequest} from "ahooks";
import CardService from "@/service/card/CardService";
import {get, isEmpty} from "lodash";

export type CardPreviewPopoverProps = {
    cardNo?: string;
    card?: Card;
    visible: boolean;
} & NativeProps;

const defaultProps = {};

const DetailContent: FC<{ card: Card | CardBase }> = (props) => {
    if (get(props.card, "id") == null) {
        return (
            <Box sx={{p: 2}}>
                <CircularProgress />
            </Box>
        )
    } else {
        const card = props.card as Card;
        const desc = isEmpty(card.desc_cn) ? card.desc_jp : card.desc_cn;
        return (
            <Container maxWidth="sm">
                <Box sx={{py: 2, minWidth: 300}}>
                    <Typography variant="body1" gutterBottom={false}>
                        {card.name_cn}
                    </Typography>
                    <Typography variant="caption" component="div">
                        {card.name_jp}
                    </Typography>
                    <Typography variant="caption" component="div">
                        {card.card_no}
                    </Typography>
                    <Typography sx={{mt: 1}} variant="caption" component="div">
                        {desc}
                    </Typography>
                </Box>
            </Container>
        )
    }
}

const CardPreviewPopover: FC<CardPreviewPopoverProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const popoverRef = useRef<PopoverActions | null>(null);
    const [card, setCard] = useState<Card | CardBase>(buildCard(props.card, props.cardNo));
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const {loading, run} = useRequest(CardService.getCardDetailAsync, {
        manual: true,
        onSuccess: (result) => {
            setCard(result);
        },
    })

    return withNativeProps(
        props,
        <Box
            className={classNames(props.visible ? "opacity-100" : "opacity-0", "transition")}
        >
            <IconButton
                onClick={(e) => {
                    if (props.visible) {
                        if (get(card, "id") == null) {
                            run({card_no: card.card_no});
                        }
                        setAnchorEl(e.currentTarget);
                    }
                }}
            >
                <SearchIcon sx={{color: "#FFF"}} />
            </IconButton>
            <Popover
                open={anchorEl != null}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                action={popoverRef}
            >
                <DetailContent
                    card={card}
                />
            </Popover>
        </Box>
    );
}

export default CardPreviewPopover;

import React, {FC, useMemo, useRef} from "react";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {Deck} from "@/typing/Deck";
import skin1 from "@/asset/image/skin1.png";
import HideOnScroll from "@/component/hideonscroll/HideOnScroll";
import {
    AppBar,
    Box,
    Button,
    Container, Grid,
    IconButton,
    Toolbar, Tooltip, Typography
} from "@mui/material";
import {isEmpty} from "lodash";
import {flow, omitBy, keys, values, sum} from "lodash/fp";
import CloseIcon from "@mui/icons-material/Close";
import {craftName} from "@/typing/Card";
import CardCover from "@/component/card/CardCover";
import CardPreviewPopover from "@/component/card/CardPreviewPopover";
import {useHover} from "ahooks";
import classNames from "classnames";

export type DeckReviewProps = {
    deck: Deck;
    onClose: () => void;
} & NativeProps;

const defaultProps = {};

const PreviewAndCount: FC<{ count: number, cardNo: string }> = (props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const isHovering = useHover(ref);

    return (
        <Box
            ref={ref}
            className={classNames("h-full w-full relative transition", {"bg-black/30": isHovering})}
        >
            <Box className="absolute top-0 right-0">
                <CardPreviewPopover
                    cardNo={props.cardNo}
                    visible={isHovering}
                />
            </Box>
            <Box
                className="absolute right-0 bottom-0 py-1 px-4 text-white text-xl md:text-2xl bg-black/50 rounded-tl-xl font-bold"
            >
                {props.count}
            </Box>
        </Box>
    )
}

const DeckReview: FC<DeckReviewProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const ref = useRef<HTMLDivElement>(null);
    const [basicDeckKeys, evoDeckKeys, basicDeckCount, evoDeckCount]: [string[], string[], number, number] = useMemo(() => {
        const getKeys = flow([omitBy(values => values == null || values === 0), keys]);
        const getCount = flow([values, sum]);
        return [getKeys(props.deck.basic_deck), getKeys(props.deck.evo_deck), getCount(props.deck.basic_deck), getCount(props.deck.evo_deck)];
    }, [props.deck]);

    return withNativeProps(
        props,
        <div ref={ref} className="h-full w-full overflow-auto">
            <div
                className="bg-auto bg-top min-h-screen py-0.5"
                style={{backgroundImage: `url(${skin1})`}}
            >
                <HideOnScroll window={() => ref.current}>
                    <AppBar
                        sx={{
                            backgroundColor: "transparent",
                            boxShadow: "none"
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start" onClick={props.onClose}
                                sx={{mr: 2}}
                            >
                                <CloseIcon sx={{fontSize: 32}} />
                            </IconButton>
                            <Box sx={{flexGrow: 1}} />
                            <Tooltip arrow title="计划开发中">
                                <span>
                                    <Button
                                        disabled
                                        variant="contained"
                                    >
                                        保存为图片
                                    </Button>
                                </span>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
                <Container maxWidth="lg">
                    {
                        !isEmpty(props.deck.name) && (
                            <Box>
                                <Typography
                                    variant="h6"
                                    component="span"
                                >
                                    卡组名称：{props.deck.name}
                                </Typography>
                                {
                                    !isEmpty(props.deck.key) && (
                                        <Typography
                                            variant="body1"
                                            component="span"
                                            sx={{ml: 2}}
                                        >
                                            卡组code：{props.deck.key}
                                        </Typography>
                                    )
                                }
                            </Box>
                        )
                    }
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        职业：{craftName[props.deck.craft]}
                    </Typography>
                    {
                        !isEmpty(props.deck.leader_card_no) && (
                            <Box sx={{mt: 2}}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                >
                                    主战者
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} md={2}>
                                        <CardCover
                                            cardNo={props.deck.leader_card_no}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        )
                    }
                    {
                        !isEmpty(basicDeckKeys) && (
                            <Box sx={{mt: 2}}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                >
                                    基本卡组 {basicDeckCount}/50
                                </Typography>
                                <Grid container spacing={2}>
                                    {
                                        basicDeckKeys.map(key => {
                                            const count = props.deck.basic_deck?.[key] ?? 0;
                                            return (
                                                <Grid xs={4} md={2} key={key} item>
                                                    <CardCover
                                                        cardNo={key}
                                                    >
                                                        <PreviewAndCount
                                                            cardNo={key}
                                                            count={count}
                                                        />
                                                    </CardCover>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>
                        )
                    }
                    {
                        !isEmpty(evoDeckKeys) && (
                            <Box sx={{mt: 2}}>
                                <Typography
                                    variant="h6"
                                    component="div"
                                >
                                    进化卡组 {evoDeckCount}/10
                                </Typography>
                                <Grid container spacing={2}>
                                    {
                                        evoDeckKeys.map(key => {
                                            const count = props.deck.evo_deck?.[key] ?? 0;
                                            return (
                                                <Grid xs={4} md={2} key={key} item>
                                                    <CardCover
                                                        cardNo={key}
                                                    >
                                                        <PreviewAndCount
                                                            cardNo={key}
                                                            count={count}
                                                        />
                                                    </CardCover>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            </Box>
                        )
                    }
                </Container>
            </div>
        </div>
    );
}

export default DeckReview;

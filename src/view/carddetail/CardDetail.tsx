import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import skin1 from "@/asset/image/skin1.png";
import {
    AppBar,
    Container,
    Grid,
    IconButton,
    Toolbar,
    Paper, Box, Typography, Stack, CircularProgress
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import HideOnScroll from "@/component/hideonscroll/HideOnScroll";
import {Card, CardDetailType, cardTypeName, rareName} from "@/typing/Card";
import {useRequest} from "ahooks";
import CardService from "@/service/card/CardService";
import CardCover from "@/component/card/CardCover";
import _ from "lodash";
import PriceSection from "@/view/carddetail/PriceSection";
import {useConfigContext} from "@/context/ConfigContextProvider";
import {Masonry} from "@mui/lab";
import CardInfo from "@/component/card/CardInfo";

export type CardDetailProps = {
    card?: Card,
    onClose: () => void;
} & NativeProps;

const defaultProps = {};

const renderText = (str: string | number | null): string => {
    if (str === "" || str == null || str === -1) return "-";
    else return `${str}`;
}

const CardDetail: FC<CardDetailProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const ref = useRef<HTMLDivElement>(null);
    const [cardDetail, setCardDetail] = useState<CardDetailType | undefined>(props.card);
    const [config] = useConfigContext();

    const cardDetailStackRef = useRef<CardDetailType[]>([]);

    const {loading, run} = useRequest(CardService.getCardDetailAsync, {
        manual: true,
        onSuccess: (result) => {
            cardDetailStackRef.current.push(result);
            setCardDetail(result);
        }
    });

    const handleBack = () => {
        cardDetailStackRef.current.pop();
        setCardDetail(_.last(cardDetailStackRef.current));
    }

    const handleNext = (d: Card) => {
        setCardDetail(d);
        if (ref.current) {
            ref.current.scrollTop = 0;
        }
        run({card_no: d.card_no});
    }

    useEffect(() => {
        if (props.card?.card_no) {
            run({card_no: props.card.card_no});
        }
        return () => {
            cardDetailStackRef.current = [];
        }
    }, []);

    if (cardDetail == null) {
        props.onClose();
        return null;
    }

    const desc = _.isEmpty(cardDetail.desc_cn) ? cardDetail.desc_jp : cardDetail.desc_cn;

    return withNativeProps(
        props,
        <div className="h-full w-full overflow-auto" ref={ref}>
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
                            {
                                cardDetailStackRef.current.length > 1 && (
                                    <IconButton
                                        edge="start" onClick={handleBack}
                                        sx={{mr: 2}}
                                    >
                                        <ArrowBackIosNewIcon sx={{fontSize: 24}} />
                                    </IconButton>
                                )
                            }
                            <IconButton
                                edge="start" onClick={props.onClose}
                                sx={{mr: 2}}
                            >
                                <CloseIcon sx={{fontSize: 32}} />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Paper elevation={3}>
                                        <Box sx={{p: 2}}>
                                            {
                                                !config.disableCardCover && (
                                                    <CardCover
                                                        card={cardDetail}
                                                        style={{marginBottom: 8}}
                                                    />
                                                )
                                            }
                                            <Typography
                                                variant="h6"
                                                component="div"
                                            >
                                                {cardDetail.name_cn}
                                                <Typography
                                                    sx={{ml: 1}}
                                                    variant="caption"
                                                >
                                                    {cardDetail.card_no}
                                                </Typography>
                                            </Typography>
                                            <Typography
                                                variant="caption" gutterBottom
                                                component="div"
                                            >
                                                {cardDetail.name_jp}
                                            </Typography>
                                            <div className="flex flex-wrap mb-2">
                                                <Typography
                                                    sx={{mr: 2}}
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    ?????????{renderText(cardDetail.cost)}
                                                </Typography>
                                                <Typography
                                                    sx={{mr: 2}}
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    ????????????{renderText(cardDetail.attack)}
                                                </Typography>
                                                <Typography
                                                    sx={{mr: 2}}
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    ????????????{renderText(cardDetail.life)}
                                                </Typography>
                                            </div>
                                            <div className="flex flex-wrap">
                                                <Typography
                                                    sx={{mr: 2}}
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    ?????????{renderText(cardTypeName[cardDetail.card_type])}
                                                </Typography>
                                                <Typography
                                                    sx={{mr: 2}}
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    ?????????{renderText(cardDetail.type)}
                                                </Typography>
                                                <Typography
                                                    sx={{mr: 2}}
                                                    variant="body1"
                                                    component="div"
                                                >
                                                    ????????????{renderText(rareName[cardDetail.rare])}
                                                </Typography>
                                            </div>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <PriceSection card={cardDetail} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={2}>
                                {
                                    !_.isEmpty(desc) && (
                                        <Grid item xs={12}>
                                            <Paper elevation={3}>
                                                <Box sx={{p: 2}}>
                                                    <Typography
                                                        variant="h6"
                                                        gutterBottom
                                                    >
                                                        ??????
                                                    </Typography>
                                                    <Typography
                                                        className="whitespace-pre-line"
                                                        variant="body1"
                                                    >
                                                        {desc}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    )
                                }
                                {
                                    loading
                                        ? (
                                            <div
                                                className="w-full flex justify-center my-4"
                                            >
                                                <CircularProgress />
                                            </div>
                                        )
                                        : null
                                }
                                {
                                    !_.isEmpty(cardDetail.qas) && (
                                        <Grid item xs={12}>
                                            <Paper elevation={3}>
                                                <Box sx={{p: 2}}>
                                                    <Typography
                                                        variant="h6"
                                                        gutterBottom
                                                    >
                                                        ??????QA
                                                    </Typography>
                                                    {
                                                        _.map(cardDetail.qas, it => {
                                                            return (
                                                                <Typography
                                                                    variant="body1"
                                                                    gutterBottom
                                                                    sx={{mb: 2}}
                                                                    key={it.no}
                                                                >
                                                                    <div
                                                                        className="mb-0.5"
                                                                    >
                                                                        <span>Q{it.no}???</span>
                                                                        {_.isEmpty(it.question_cn) ? it.question_jp : it.question_cn}
                                                                    </div>
                                                                    <div>A???{_.isEmpty(it.answer_cn) ? it.answer_jp : it.answer_cn}</div>
                                                                </Typography>
                                                            )
                                                        })
                                                    }
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    )
                                }
                                {
                                    !_.isEmpty(cardDetail.related_cards) && (
                                        <Grid item xs={12}>
                                            <Paper elevation={3}>
                                                <Box sx={{p: 2}}>
                                                    <Typography
                                                        variant="h6"
                                                        gutterBottom
                                                    >
                                                        ????????????
                                                    </Typography>
                                                    {
                                                        config.disableCardCover
                                                            ? (
                                                                <Masonry
                                                                    columns={{
                                                                        xs: 2,
                                                                        md: 3
                                                                    }}
                                                                >
                                                                    {
                                                                        _.map(cardDetail.related_cards, it => {
                                                                            return (
                                                                                <CardInfo
                                                                                    key={it.id}
                                                                                    onClick={() => handleNext(it)}
                                                                                    card={it}
                                                                                />
                                                                            )
                                                                        })
                                                                    }
                                                                </Masonry>
                                                            )
                                                            : (
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                >
                                                                    {
                                                                        _.map(cardDetail.related_cards, it => {
                                                                            return (
                                                                                <Grid
                                                                                    xs={4}
                                                                                    md={3}
                                                                                    item
                                                                                    key={it.card_no}
                                                                                >
                                                                                    <CardCover
                                                                                        onClick={() => handleNext(it)}
                                                                                        card={it}
                                                                                    />
                                                                                </Grid>
                                                                            )
                                                                        })
                                                                    }
                                                                </Grid>
                                                            )
                                                    }
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Toolbar />
            </div>
        </div>
    )
}

export default CardDetail;

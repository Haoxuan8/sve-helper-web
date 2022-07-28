import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {Deck} from "@/typing/Deck";
import {
    Box,
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup, Typography
} from "@mui/material";
import CardFilter, {getParams} from "@/component/card/CardFilter";
import {Card, CardType, Craft} from "@/typing/Card";
import CardCover from "@/component/card/CardCover";
import CardCount from "@/view/print/CardCount";
import LoadMore from "@/component/loadmore/LoadMore";
import {useRequest} from "ahooks";
import LoadingButton from "@mui/lab/LoadingButton";
import {EditDeckSection} from "@/view/editdeck/steptwo/StepTwoType";
import CardService from "@/service/card/CardService";
import {sum, values, flow} from "lodash/fp";
import DeckService from "@/service/deck/DeckService";
import NameConfirmDialog from "@/view/editdeck/steptwo/NameConfirmDialog";
import Alert from "@/component/alert";
import useRouteModal from "@/hook/useRouteModal";
import DeckReview from "@/view/deckreview/DeckReview";

export type StepTwoProps = {
    initialValues?: Deck;
    onPrevPageClick: () => void;
    onAdded: (key: string) => void;
} & NativeProps;

const defaultProps = {};

const MAX_COUNT = 3;
const LIMIT = 24;

const StepTwo: FC<StepTwoProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [confirmName, setConfirmName] = useState<string | null>(null);
    const [selectedSection, setSelectedSection] = useState(EditDeckSection.leader);
    const [cardList, setCardList] = useState<Card[]>([]);
    const [total, setTotal] = useState(0);
    const [deck, setDeck] = useState<Deck | undefined>(props.initialValues);
    const deckReviewRouteModal = useRouteModal("deck-review");
    const valuesRef = useRef<any>(null);
    const {
        loading,
        run,
        runAsync
    } = useRequest(selectedSection === EditDeckSection.leader ? CardService.getCardListAsync : CardService.getBuildDeckCardListAsync, {
        manual: true,
        onSuccess: (result, params: any) => {
            setCardList(p => [...p, ...result.list]);
            setTotal(result.total);
        }
    });

    const {
        loading: submitting,
        run: addDeck
    } = useRequest(DeckService.addDeckAsync, {
        manual: true,
        onSuccess: (key, params: any) => {
            Alert.show({
                severity: "success",
                children: `添加成功，key:${key}`,
            })
            props.onAdded(key);
        }
    })

    const hasMore = useMemo(() => {
        return cardList.length < total;
    }, [cardList, total]);

    const getFindParams = (values: any) => ({
        ...getParams(values),
        is_evo: selectedSection === EditDeckSection.evoDeck,
        craft: [deck?.craft, Craft.Neutral],
    })

    const onSubmit = async (values: any) => {
        setCardList([]);
        valuesRef.current = values;
        await runAsync({
            ...getFindParams(values),
            pageable: {
                limit: LIMIT,
                offset: 0,
            },
        });
    }

    const basicDeck = deck?.basic_deck ?? {};
    const evoDeck = deck?.evo_deck ?? {};
    const getCountFlow = flow([values, sum]);

    const deckDisabled = useMemo(() => {
        if (deck == null) return true;
        return deck.leader_card_no == null || getCountFlow(deck.basic_deck) <= 40;
    }, [deck]);

    useEffect(() => {
        setCardList([]);
        setTotal(0);
        if (selectedSection === EditDeckSection.leader) {
            run({
                card_type: [CardType.Leader],
                craft: [deck?.craft],
                pageable: {
                    limit: LIMIT,
                    offset: 0,
                }
            })
        }
    }, [selectedSection]);

    if (deck == null) return null;

    const onCardCountChange = (card: Card, prevCount: number, isUp: boolean) => {
        if (selectedSection === EditDeckSection.leader) {
            setDeck({
                ...deck,
                leader_card_no: isUp ? card.card_no : undefined,
            });
        } else if (selectedSection === EditDeckSection.basicDeck) {
            if (getCountFlow(basicDeck) < 50) {
                setDeck({
                    ...deck,
                    basic_deck: {
                        ...basicDeck,
                        [card.card_no]: isUp ? prevCount + 1 : prevCount === 1 ? undefined : prevCount - 1,
                    }
                });
            }
        } else if (selectedSection === EditDeckSection.evoDeck) {
            if (getCountFlow(evoDeck) < 10) {
                setDeck({
                    ...deck,
                    evo_deck: {
                        ...evoDeck,
                        [card.card_no]: isUp ? prevCount + 1 : prevCount === 1 ? undefined : prevCount - 1,
                    }
                });
            }
        }
    }

    return withNativeProps(
        props,
        <Box sx={{my: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Box className="md:sticky md:top-14 flex flex-col">
                        <Box className="flex justify-center">
                            <RadioGroup
                                row
                                value={selectedSection}
                                onChange={e => {
                                    if (!loading) setSelectedSection(parseInt(e.target.value))
                                }}
                            >
                                <FormControlLabel
                                    value={EditDeckSection.leader}
                                    control={<Radio />}
                                    label="主战者"
                                />
                                <FormControlLabel
                                    value={EditDeckSection.basicDeck}
                                    control={<Radio />}
                                    label="基本卡组"
                                />
                                <FormControlLabel
                                    value={EditDeckSection.evoDeck}
                                    control={<Radio />}
                                    label="进化卡组"
                                />
                            </RadioGroup>
                        </Box>
                        <Box className="mt-4 flex items-center">
                            <Typography
                                variant="body1"
                                component="div"
                                sx={{mr: 2}}
                            >
                                基本卡组{getCountFlow(basicDeck)}/50
                            </Typography>
                            <Typography
                                variant="body1"
                                component="div"
                            >
                                进化卡组{getCountFlow(evoDeck)}/10
                            </Typography>
                            <Button
                                sx={{ml: "auto", width: 100}}
                                variant="contained"
                                onClick={deckReviewRouteModal.show}
                            >
                                预览
                            </Button>
                        </Box>
                        <Box className="mt-4">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={props.onPrevPageClick}
                                    >
                                        上一步
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <LoadingButton
                                        fullWidth
                                        variant="contained"
                                        disabled={deckDisabled}
                                        loading={submitting}
                                        onClick={() => setConfirmName(deck.name ?? "")}
                                    >
                                        完成
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            selectedSection !== EditDeckSection.leader && (
                                <CardFilter
                                    buildDeck
                                    buildEvoDeck={selectedSection === EditDeckSection.evoDeck}
                                    className="mt-4 md:max-h-[75vh] md:overflow-auto md:relative"
                                    onSubmit={onSubmit}
                                />
                            )
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {
                            cardList.map(it => {
                                let count = 0;
                                if (selectedSection === EditDeckSection.leader) {
                                    count = deck.leader_card_no === it.card_no ? 1 : 0;
                                } else if (selectedSection === EditDeckSection.basicDeck) {
                                    count = basicDeck[it.card_no] ?? 0;
                                } else if (selectedSection === EditDeckSection.evoDeck) {
                                    count = evoDeck[it.card_no] ?? 0;
                                }
                                return (
                                    <Grid
                                        key={it.id}
                                        item
                                        xs={4}
                                    >
                                        <CardCover
                                            card={it}
                                        >
                                            <CardCount
                                                count={count}
                                                max={selectedSection === EditDeckSection.leader ? 1 : MAX_COUNT}
                                                onAddClick={() => onCardCountChange(it, count, true)}
                                                onDecClick={() => onCardCountChange(it, count, false)}
                                            />
                                        </CardCover>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                    <LoadMore
                        loading={loading}
                        hasMore={hasMore}
                        loadMore={() => {
                            const values = valuesRef.current;
                            run({
                                ...getFindParams(values),
                                pageable: {
                                    limit: LIMIT,
                                    offset: cardList.length,
                                },
                            })
                        }}
                    />
                </Grid>
            </Grid>
            <NameConfirmDialog
                visible={confirmName != null}
                onClose={() => setConfirmName(null)}
                onOk={(name) => {
                    setConfirmName(null);
                    addDeck({
                        name,
                        craft: deck.craft,
                        leader_card_no: deck.leader_card_no,
                        basic_deck: deck.basic_deck,
                        evo_deck: deck.evo_deck,
                    });
                }}
            />
            <deckReviewRouteModal.Modal>
                <DeckReview deck={deck} onClose={deckReviewRouteModal.close} />
            </deckReviewRouteModal.Modal>
        </Box>
    );
}

export default StepTwo;

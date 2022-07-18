import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, Grid} from "@mui/material";
import CardCover from "@/component/card/CardCover";
import {Card} from "@/typing/Card";
import CardFilter, {getParams} from "@/component/card/CardFilter";
import LoadMore from "@/component/loadmore/LoadMore";
import {useRequest} from "ahooks";
import CardService from "@/service/card/CardService";
import PrintInfoSection from "@/view/print/PrintInfoSection";
import {groupBy, flow, mapValues, size} from "lodash/fp";
import {findIndex, pullAt, clone} from "lodash";
import CardCount from "@/view/print/CardCount";
import Alert from "@/component/alert";

export type PrintProps = {} & NativeProps;

const defaultProps = {};

const LIMIT = 24;

const Print: FC<PrintProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [cardList, setCardList] = useState<Card[]>([]);
    const [cards, setCards] = useState<Card[]>([]);
    const [total, setTotal] = useState(0);
    const valuesRef = useRef<any>(null);
    const {loading, run, runAsync} = useRequest(CardService.getCardListAsync, {
        manual: true,
        onSuccess: (result, params: any) => {
            setCardList(p => [...p, ...result.list]);
            setTotal(result.total);
        }
    });

    useEffect(() => {
        Alert.show({
            children: (
                <div>
                    这是一个正在开发的功能，若遇到bug请至意见箱进行反馈。
                </div>
            ),
            severity: "info",
        })
    }, []);

    const cardCountByCardNO = useMemo(() => {
        return flow(
            groupBy((card: Card) => card.card_no),
            mapValues((values: Card[]) => size(values)),
        )(cards);
    }, [cards]);

    const hasMore = useMemo(() => {
        return cardList.length < total;
    }, [cardList, total]);

    const onSubmit = async (values: any) => {
        setCardList([]);
        valuesRef.current = values;
        await runAsync({
            ...getParams(values),
            pageable: {
                limit: LIMIT,
                offset: 0,
            },
        });
    }

    return withNativeProps(
        props,
        <Box sx={{my: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <PrintInfoSection className="pb-4" cards={cards} />
                    <CardFilter
                        className="mt-4 md:mt-0 md:sticky md:top-20 md:max-h-[80vh] md:overflow-auto md:relative"
                        onSubmit={onSubmit}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box>
                        <Grid container spacing={2}>
                            {
                                cardList.map(it => {
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
                                                    count={cardCountByCardNO[it.card_no] ?? 0}
                                                    onAddClick={() => {
                                                        setCards(p => [...p, it]);
                                                    }}
                                                    onDecClick={() => {
                                                        setCards(p => {
                                                            const newValue = clone(p);
                                                            const index = findIndex(newValue, itt => itt.card_no === it.card_no);
                                                            pullAt(newValue, index);
                                                            return newValue;
                                                        });
                                                    }}
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
                                    ...getParams(values),
                                    pageable: {
                                        limit: LIMIT,
                                        offset: cardList.length,
                                    },
                                })
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Print;

import React, {FC, useMemo, useRef, useState} from "react";
import {NativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {
    Box,
    Grid,
} from "@mui/material";
import {useRequest} from "ahooks";
import CardService from "@/service/card/CardService";
import {
    Card,
} from "@/typing/Card";
import CardCover from "@/component/card/CardCover";
import LoadMore from "@/component/loadmore/LoadMore";
import useRouteModal from "@/hook/useRouteModal";
import CardDetail from "@/view/carddetail/CardDetail";
import {useConfigContext} from "@/context/ConfigContextProvider";
import CardInfo from "@/component/card/CardInfo";
import {Masonry} from "@mui/lab";
import CardFilter, {getParams} from "@/component/card/CardFilter";

export type CardListProps = {} & NativeProps;

const defaultProps = {};

const LIMIT = 24;

const CardList: FC<CardListProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [config] = useConfigContext();
    const [cardList, setCardList] = useState<Card[]>([]);
    const [total, setTotal] = useState(0);
    const valuesRef = useRef<any>(null);
    const cardDetailRouteModal = useRouteModal("card-detail");

    const {loading, run, runAsync} = useRequest(CardService.getCardListAsync, {
        manual: true,
        onSuccess: (result, params: any) => {
            setCardList(p => [...p, ...result.list]);
            setTotal(result.total);
        }
    });

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

    const onCardClick = (card: Card) => {
        cardDetailRouteModal.show({
            card,
        });
    }

    return (
        <Box sx={{my: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <CardFilter
                        className="mt-4 md:mt-0 md:sticky md:top-20 md:max-h-[80vh] md:overflow-auto md:relative"
                        onSubmit={onSubmit}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box>
                        {
                            config.disableCardCover
                                ? (
                                    <Masonry columns={{xs: 2, md: 3}}>
                                        {
                                            cardList.map(it => {
                                                return (
                                                    <CardInfo
                                                        key={it.id}
                                                        onClick={() => onCardClick(it)}
                                                        card={it}
                                                    />
                                                )
                                            })
                                        }
                                    </Masonry>
                                )
                                : (
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
                                                            onClick={() => onCardClick(it)}
                                                            card={it}
                                                        />
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                )
                        }
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
            <cardDetailRouteModal.Modal>
                <CardDetail
                    onClose={cardDetailRouteModal.close}
                />
            </cardDetailRouteModal.Modal>
        </Box>
    )
}

export default CardList;

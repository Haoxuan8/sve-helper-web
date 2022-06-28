import React, {FC, useMemo, useRef, useState} from "react";
import {NativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {
    Box,
    Button,
    Collapse,
    Container,
    Grid,
    MenuItem,
    Paper
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {useRequest} from "ahooks";
import CardService from "@/service/card/CardService";
import {
    Card,
    Category,
    categoryName,
    Craft,
    craftName,
    Rare,
    rareName
} from "@/typing/Card";
import {Field, Form} from "react-final-form";
import TextField from "@/component/formfield/TextField";
import Select from "@/component/formfield/Select";
import CardCover from "@/component/card/CardCover";
import LoadMore from "@/component/loadmore/LoadMore";
import useRouteModal from "@/hook/useRouteModal";
import CardDetail from "@/view/carddetail/CardDetail";
import {useConfigContext} from "@/context/ConfigContextProvider";
import CardInfo from "@/component/card/CardInfo";
import {Masonry} from "@mui/lab";

export type CardListProps = {} & NativeProps;

const defaultProps = {};

const nopArr: any[] = [];

const crafts = [Craft.Forest, Craft.Sword, Craft.Rune, Craft.Dragon, Craft.Nightmare, Craft.Haven, Craft.Neutral];
const rares = [Rare.BR, Rare.BRP, Rare.SR, Rare.SRP, Rare.GR, Rare.GRP, Rare.LG, Rare.SL, Rare.UR, Rare.SP];
const categories = [Category.BP02, Category.BP01, Category.SD01, Category.SD02, Category.SD03, Category.SD04, Category.SD05, Category.SD06];

const LIMIT = 24;

const getParams = (values: any) => {
    return {
        name: values.name,
        craft: values.craft,
        rare: values.rare,
        from: values.from,
    }
}

const CardList: FC<CardListProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [config] = useConfigContext();
    const [cardList, setCardList] = useState<Card[]>([]);
    const [total, setTotal] = useState(0);
    const [moreFilter, setMoreFilter] = useState(false);
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
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, submitting, form, values}) => {
                    return (
                        <Paper elevation={3} sx={{p: 2}}>
                            <Box
                                noValidate onSubmit={handleSubmit}
                                component="form" autoComplete="off"
                            >
                                <Grid container spacing={2} rowSpacing={1}>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            fullWidth
                                            name="name"
                                            component={TextField}
                                            label="卡名"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Field
                                            fullWidth
                                            name="from"
                                            component={Select}
                                            label="所属卡包"
                                            formControlProps={{fullWidth: true}}
                                            multiple
                                            initialValue={nopArr}
                                        >
                                            {
                                                categories.map(it => {
                                                    return (
                                                        <MenuItem
                                                            key={it}
                                                            value={it}
                                                        >
                                                            {categoryName[it]}
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Collapse in={moreFilter}>
                                            <Grid
                                                container spacing={2}
                                                rowSpacing={1}
                                            >
                                                <Grid item xs={12} md={6}>
                                                    <Field
                                                        fullWidth
                                                        name="rare"
                                                        component={Select}
                                                        label="稀有度"
                                                        formControlProps={{fullWidth: true}}
                                                        multiple
                                                        initialValue={nopArr}
                                                    >
                                                        {
                                                            rares.map(it => {
                                                                return (
                                                                    <MenuItem
                                                                        key={it}
                                                                        value={it}
                                                                    >
                                                                        {rareName[it]}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <Field
                                                        fullWidth
                                                        multiple
                                                        initialValue={nopArr}
                                                        name="craft"
                                                        component={Select}
                                                        label="职业"
                                                        formControlProps={{fullWidth: true}}
                                                    >
                                                        {
                                                            crafts.map(it => {
                                                                return (
                                                                    <MenuItem
                                                                        key={it}
                                                                        value={it}
                                                                    >
                                                                        {craftName[it]}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Field>
                                                </Grid>
                                            </Grid>
                                        </Collapse>
                                    </Grid>
                                    <Grid
                                        sx={{my: 1}} xs={12}
                                        className="flex justify-center"
                                    >
                                        <Button
                                            onClick={() => setMoreFilter(p => !p)}
                                        >
                                            更多筛选条件
                                            {moreFilter
                                                ? <RemoveIcon />
                                                : <AddIcon />}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Container maxWidth="md">
                                            <Grid
                                                container spacing={2}
                                                rowSpacing={1}
                                            >
                                                <Grid item xs={6}>
                                                    <Button
                                                        fullWidth
                                                        type="button"
                                                        variant="outlined"
                                                        onClick={form.reset}
                                                        disabled={submitting}
                                                    >
                                                        重置
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <LoadingButton
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        type="submit"
                                                        loading={submitting}
                                                    >
                                                        搜索
                                                    </LoadingButton>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    )
                }}
            />
            <Box sx={{my: 4}}>
                {
                    config.disableCardCover
                        ? (
                            <Masonry columns={{xs: 2, md: 3, lg: 4}}>
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
                                                md={3}
                                                lg={2}
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
            <cardDetailRouteModal.Modal>
                <CardDetail
                    onClose={cardDetailRouteModal.close}
                />
            </cardDetailRouteModal.Modal>
        </Box>
    )
}

export default CardList;

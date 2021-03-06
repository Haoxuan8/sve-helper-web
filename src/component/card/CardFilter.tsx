import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useMemo, useState} from "react";
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
import {Field, Form} from "react-final-form";
import TextField from "@/component/formfield/TextField";
import Select from "@/component/formfield/Select";
import {
    Ability,
    abilityName,
    CardType,
    cardTypeName,
    Category,
    categoryName,
    Craft,
    craftName,
    Rare,
    rareName
} from "@/typing/Card";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckboxGroup from "@/component/formfield/CheckboxGroup";
import SelectList from "@/component/formfield/SelectList";
import {filter, flatMap, reject, includes} from "lodash";

const crafts = [Craft.Forest, Craft.Sword, Craft.Rune, Craft.Dragon, Craft.Nightmare, Craft.Haven, Craft.Neutral].map(it => ({
    label: craftName[it],
    value: it,
}));
const rares = [Rare.BR, Rare.BRP, Rare.SR, Rare.SRP, Rare.GR, Rare.GRP, Rare.LG, Rare.SL, Rare.UR, Rare.SP].map(it => ({
    label: rareName[it],
    value: it,
}));
const categories = [Category.BP02, Category.BP01, Category.SD01, Category.SD02, Category.SD03, Category.SD04, Category.SD05, Category.SD06].map(it => ({
    label: categoryName[it],
    value: it,
}));
const costs = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(it => ({
    label: it === 8 ? `${it}+` : `${it}`,
    value: `${it}`,
}));
const abilities = [Ability.Fanfare, Ability.LastWord, Ability.Startup, Ability.Evolve, Ability.Evolving, Ability.Storm, Ability.Rush, Ability.Guard,
    Ability.Drain, Ability.Kill, Ability.DAttack, Ability.Pressure, Ability.Aura, Ability.Scarlet, Ability.Awaken, Ability.NCharge, Ability.SCharge, Ability.Stack,
    Ability.EarthMystery, Ability.Quick,];


const cardTypes = [...[CardType.Follower, CardType.FollowerEvo, CardType.Spell, CardType.Amulet, CardType.Leader].map(it => ({
    label: cardTypeName[it],
    value: it,
})), {label: "Token", value: "Token"}];

const nopArr: any[] = [];

export type CardFilterProps = {
    onSubmit: (values: any) => Promise<void>;
    buildDeck?: boolean;
    buildEvoDeck?: boolean;
} & NativeProps;

const defaultProps = {
    buildDeck: false,
    buildEvoDeck: false,
};

export const getParams = (values: any) => {
    const getArray = (v: any) => v == null ? undefined : [v];
    const card_type = flatMap(values.cardType, type => {
        if (type === "Token") return [CardType.FollowerToken, CardType.SpellToken, CardType.AmuletToken];
        return [type];
    })
    return {
        name: values.name,
        craft: values.craft,
        rare: values.rare,
        from: values.from,
        ability: getArray(values.ability),
        cost: values.cost ? values.cost.map((it: string) => parseInt(it)) : null,
        card_type,
    }
}

const CardFilter: FC<CardFilterProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [moreFilter, setMoreFilter] = useState(false);

    const raresMemo = useMemo(() => {
        if (props.buildDeck) {
            return reject(rares, rare => includes([Rare.BRP, Rare.SRP, Rare.GRP, Rare.SL], rare.value));
        } else return rares;
    }, [props.buildDeck]);

    const cardTypesMemo = useMemo(() => {
        if (props.buildDeck) {
            return filter(cardTypes, cardType => includes([CardType.Follower, CardType.Spell, CardType.Amulet], cardType.value));
        }
        return cardTypes;
    }, [props.buildDeck]);

    return withNativeProps(
        props,
        <Form
            onSubmit={props.onSubmit}
            render={({handleSubmit, submitting, form, values}) => {
                return (
                    <Paper
                        className={props.className}
                        elevation={3}
                        sx={{p: 0}}
                    >
                        <Box
                            noValidate onSubmit={handleSubmit}
                            component="form" autoComplete="off"
                        >
                            <Grid
                                sx={{p: 2, pb: 0}}
                                container
                                spacing={2}
                            >
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="name"
                                        component={TextField}
                                        label="??????"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        name="from"
                                        component={SelectList}
                                        native
                                        label="????????????"
                                        formControlProps={{fullWidth: true}}
                                        multiple
                                        options={categories}
                                        initialValue={nopArr}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Collapse in={moreFilter}>
                                        <Grid
                                            container spacing={2}
                                        >
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="ability"
                                                    component={Select}
                                                    label="??????"
                                                    formControlProps={{fullWidth: true}}
                                                >
                                                    {abilities.map(it => (
                                                        <MenuItem
                                                            key={it}
                                                            value={it}
                                                        >
                                                            {abilityName[it]}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </Grid>
                                            {
                                                !props.buildEvoDeck && (
                                                    <Grid item xs={12}>
                                                        <Field
                                                            fullWidth
                                                            name="cardType"
                                                            component={CheckboxGroup}
                                                            label="????????????"
                                                            formControlProps={{fullWidth: true}}
                                                            options={cardTypesMemo}
                                                            initialValue={nopArr}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="rare"
                                                    component={CheckboxGroup}
                                                    label="?????????"
                                                    formControlProps={{fullWidth: true}}
                                                    options={raresMemo}
                                                    initialValue={nopArr}
                                                />
                                            </Grid>
                                            {
                                                !props.buildDeck && (
                                                    <Grid item xs={12}>
                                                        <Field
                                                            fullWidth
                                                            initialValue={nopArr}
                                                            name="craft"
                                                            component={CheckboxGroup}
                                                            label="??????"
                                                            options={crafts}
                                                            formControlProps={{fullWidth: true}}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            {
                                                !props.buildEvoDeck && (
                                                    <Grid item xs={12}>
                                                        <Field
                                                            fullWidth
                                                            initialValue={nopArr}
                                                            name="cost"
                                                            component={CheckboxGroup}
                                                            label="??????"
                                                            options={costs}
                                                            formControlProps={{fullWidth: true}}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                    </Collapse>
                                </Grid>
                                <Grid
                                    sx={{mt: 1}} xs={12}
                                    className="flex justify-center"
                                >
                                    <Button
                                        onClick={() => setMoreFilter(p => !p)}
                                    >
                                        ??????????????????
                                        {moreFilter
                                            ? <RemoveIcon />
                                            : <AddIcon />}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Container
                                sx={{p: 2, zIndex: 1}}
                                className="md:sticky md:bottom-0"
                                maxWidth="md"
                            >
                                <Grid
                                    container spacing={2}
                                    rowSpacing={1}
                                >
                                    <Grid item xs={6}>
                                        <Box
                                            sx={{background: "#FFF"}}
                                        >
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                type="button"
                                                onClick={form.reset}
                                                disabled={submitting}
                                            >
                                                ??????
                                            </Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <LoadingButton
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            loading={submitting}
                                        >
                                            ??????
                                        </LoadingButton>
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                    </Paper>
                )
            }}
        />
    )
}

export default CardFilter;

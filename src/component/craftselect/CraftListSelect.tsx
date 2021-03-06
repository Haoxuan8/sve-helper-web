import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, Grid} from "@mui/material";
import {Craft} from "@/typing/Card";
import CraftIcon from "@/component/icon/CraftIcon";

export type CraftListSelectProps = {
    value: Craft | null;
    onSelect: (craft: Craft) => void;
} & NativeProps;

const defaultProps = {};

const crafts: Craft[] = [Craft.Forest, Craft.Sword, Craft.Rune, Craft.Dragon, Craft.Nightmare, Craft.Haven]

const CraftListSelect: FC<CraftListSelectProps> = (p) => {
    const props = mergeProps(defaultProps, p);

    return withNativeProps(
        props,
        <Box>
            <Grid spacing={2} rowSpacing={6} container>
                {
                    crafts.map(craft => {
                        return (
                            <Grid
                                className="flex items-center justify-center"
                                key={craft}
                                item
                                xs={4}
                            >
                                <CraftIcon
                                    active={props.value === craft}
                                    onClick={() => props.onSelect(craft)}
                                    className="cursor-pointer"
                                    hoverActive
                                    craft={craft}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default CraftListSelect;

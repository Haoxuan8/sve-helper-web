import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, Grid} from "@mui/material";
import {Craft} from "@/typing/Card";

export type CraftListSelectProps = {} & NativeProps;

const defaultProps = {};

const crafts: Craft[] = [Craft.Forest, Craft.Sword, Craft.Rune, Craft.Dragon, Craft.Nightmare, Craft.Haven]

const CraftListSelect: FC<CraftListSelectProps> = (p) => {
    const props = mergeProps(defaultProps, p);

    return withNativeProps(
        props,
        <Box>
            <Grid spacing={2} container>
                {
                    crafts.map(craft => {
                        return (
                            <Grid key={craft} item xs={4}>
                                craft
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default CraftListSelect;

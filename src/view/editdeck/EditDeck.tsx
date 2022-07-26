import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useEffect, useMemo, useRef, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, RadioGroup, Radio, FormControlLabel} from "@mui/material";
import {useSpringRef, useTransition, animated, useSprings} from "react-spring";
import {usePrevious} from "ahooks";
import CraftListSelectPage from "@/view/editdeck/CraftListSelectPage";

export type EditDeckProps = {} & NativeProps;

const defaultProps = {}

enum EditDeckType {
    craft,
    deckCode,
}

const pages: FC[] = [
    CraftListSelectPage,
    CraftListSelectPage,
]

const EditDeck: FC<EditDeckProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [selectedType, setSelectedType] = useState<number>(EditDeckType.craft);
    const prevSelectType = usePrevious(selectedType);

    const reverse = useMemo(() => {
        if (prevSelectType != null && prevSelectType > selectedType) return true;
        return false;
    }, [selectedType]);

    const transRef = useSpringRef();
    const transitions = useTransition(selectedType, {
        ref: transRef,
        keys: null,
        from: {
            opacity: 0,
            transform: `translate3d(${reverse ? "-100%" : "100%"},0,0)`
        },
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: {
            opacity: 0,
            transform: `translate3d(${reverse ? "75%" : "-75%"},0,0)`
        },
    });

    useEffect(() => {
        transRef.start();
    }, [selectedType])

    return withNativeProps(
        props,
        <Box>
            <Box sx={{mt: 8}} className="flex justify-center">
                <RadioGroup
                    row
                    value={selectedType}
                    onChange={e => setSelectedType(parseInt(e.target.value))}
                >
                    <FormControlLabel
                        value={EditDeckType.craft}
                        control={<Radio />}
                        label="职业"
                    />
                    <FormControlLabel
                        value={EditDeckType.deckCode}
                        control={<Radio />}
                        label="卡组代码"
                    />
                </RadioGroup>
            </Box>
            <Box sx={{mt: 2}} className="relative">
                {transitions((style, i) => {
                    const Page = pages[i];
                    return (
                        <animated.div
                            className="absolute top-0 left-0 right-0"
                            style={{...style}}
                        >
                            <Page />
                        </animated.div>
                    )
                })}
            </Box>
        </Box>
    )
}

export default EditDeck;

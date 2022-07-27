import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useMemo, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import usePageSwitch from "@/hook/usePageSwitch";
import {Box, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import CraftListSelectPage from "@/view/editdeck/stepone/CraftListSelectPage";
import EnterCodePage from "@/view/editdeck/stepone/EnterCodePage";
import {
    EditDeckType, NextClickValueType,
} from "@/view/editdeck/stepone/StepOneType";

export type StepOneProps = {
    onNextPageClick: (value: NextClickValueType) => void;
} & NativeProps;

const defaultProps = {};

export const StepOne: FC<StepOneProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [selectedType, setSelectedType] = useState<number>(EditDeckType.craft);

    const pages: FC[] = useMemo(() => [
        () => <CraftListSelectPage onNextClick={props.onNextPageClick} />,
        () => <EnterCodePage onNextClick={props.onNextPageClick} />,
    ], []);
    const {elem} = usePageSwitch(selectedType, pages);

    return withNativeProps(
        props,
        <Box sx={{mt: 8}}>
            <Box className="flex justify-center">
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
                {elem}
            </Box>
        </Box>
    )
}

export default StepOne;

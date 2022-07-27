import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useMemo, useRef, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box} from "@mui/material";
import usePageSwitch from "@/hook/usePageSwitch";
import StepOne from "@/view/editdeck/stepone/StepOne";
import {
    EditDeckType,
    NextClickValueType
} from "@/view/editdeck/stepone/StepOneType";
import StepTwo from "@/view/editdeck/steptwo/StepTwo";
import {Deck} from "@/typing/Deck";
import {useLatest} from "ahooks";
import StepThree from "@/view/editdeck/stepthree/StepThree";

export type EditDeckProps = {} & NativeProps;

const defaultProps = {};

const EditDeck: FC<EditDeckProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [step, setStep] = useState<number>(0);
    const [initialDeck, setInitialDeck] = useState<Deck>();
    const initialDeckRef = useLatest(initialDeck);
    const addedKey = useRef<string>("");

    const onStepOneNextPageClick = (value: NextClickValueType) => {
        if (value.type === EditDeckType.craft) {
            setInitialDeck({craft: value.craft});
            setStep(p => p + 1);
        } else if (value.type === EditDeckType.deckCode) {
            setStep(p => p + 1);
        }
    }

    const onStepTwoPrevPageClick = () => {
        setStep(p => p - 1);
    }

    const onStepTwoAdded = (key: string) => {
        addedKey.current = key;
        setStep(p => p + 1);
    }

    const pages: FC[] = useMemo(() => [
        () => <StepOne onNextPageClick={onStepOneNextPageClick} />,
        () => <StepTwo
            initialValues={initialDeckRef.current}
            onPrevPageClick={onStepTwoPrevPageClick}
            onAdded={onStepTwoAdded}
        />,
        () => <StepThree deckKey={addedKey.current} />
    ], []);

    const {elem} = usePageSwitch(step, pages);

    return withNativeProps(
        props,
        <Box className="relative">
            {elem}
        </Box>
    )
}

export default EditDeck;

import React, {FC} from "react";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import {Box} from "@mui/material";

export type StepThreeProps = {
    deckKey: string;
} & NativeProps;

const defaultProps = {};

const StepThree: FC<StepThreeProps> = (p) => {
    const props = mergeProps(defaultProps, p);

    return withNativeProps(
        props,
        <Box>
            添加成功！
            请保存卡组Code：{props.deckKey}
        </Box>
    );
}

export default StepThree;

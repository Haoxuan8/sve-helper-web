import {NativeProps, withNativeProps} from "@/util/nativeProps";
import {mergeProps} from "@/util/withDefaultProps";
import React, {FC, useState} from "react";
import {Box, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Card} from "@/typing/Card";
import {getPDF} from "@/view/print/PrintUtil";
import {useUnmountedRef} from "ahooks";
import Alert from "@/component/alert";

export type PrintInfoSectionProps = {
    cards: Card[],
} & NativeProps;

const defaultProps = {};

const PrintInfoSection: FC<PrintInfoSectionProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [loading, setLoading] = useState(false);
    const unmountRef = useUnmountedRef();

    const onPrintClick = async () => {
        setLoading(true);
        try {
            const pdf = await getPDF(props.cards);
            pdf.save("sve-print.pdf");
            if (!unmountRef.current) setLoading(false);
        } catch (e) {
            Alert.error({
                children: JSON.stringify(e),
            })
        } finally {

        }
    }

    return withNativeProps(
        props,
        <Box>
            <Box className="flex flex-row">
                <Typography variant="h6" gutterBottom component="span">
                    已选卡牌：{p.cards.length}
                </Typography>
                <Box className="flex-auto" />
                <LoadingButton
                    disabled={p.cards.length === 0}
                    variant="contained"
                    loading={loading}
                    onClick={onPrintClick}
                >
                    保存为PDF
                </LoadingButton>
            </Box>
        </Box>
    )
}

export default PrintInfoSection;

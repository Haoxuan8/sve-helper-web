import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";

export type SettingProps = {} & NativeProps;

const defaultProps = {};

const Setting: FC<SettingProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    return withNativeProps(
        props,
        <Box sx={{my: 2}}>
            <Paper sx={{overflow: "hidden"}}>
                <Box
                    className="text-sm"
                    sx={{
                        px: 2,
                        py: 1,
                        backgroundColor: "primary.main",
                        color: "#FFF",
                    }}
                >
                    设置
                </Box>
                <Accordion
                    expanded={expanded === "cardList"}
                    onChange={handleExpandedChange("cardList")}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography>
                            卡牌列表相关设置
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        待开发
                    </AccordionDetails>
                </Accordion>
            </Paper>
        </Box>
    )
}

export default Setting;

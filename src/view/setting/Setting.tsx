import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useState} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {useConfigContext} from "@/context/ConfigContextProvider";
import {themeColorMap, ThemeColorType} from "@/typing/Theme";
import createPalette from "@mui/material/styles/createPalette";

export type SettingProps = {} & NativeProps;

const defaultProps = {};

const colors = [
    {label: "默认", value: ThemeColorType.main},
    {label: "菲林", value: ThemeColorType.sora},
    {label: "奥契丝", value: ThemeColorType.grey},
]

const Setting: FC<SettingProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [expanded, setExpanded] = useState<string | false>("basic");
    const [config, setConfig] = useConfigContext();

    const handleExpandedChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    return withNativeProps(
        props,
        <Box sx={{my: 2}}>
            <Box
                className="transition-colors text-sm rounded-t-md"
                sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                }}
            >
                设置
            </Box>
            <Accordion
                expanded={expanded === "basic"}
                onChange={handleExpandedChange("basic")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        基础设置
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <Typography variant="body2">
                            主题颜色
                        </Typography>
                        <Select
                            sx={{mt: 2, minWidth: 150}}
                            value={config.primaryColorType}
                            onChange={e => {
                                setConfig({
                                    primaryColorType: e.target.value,
                                });
                            }}
                        >
                            {
                                colors.map(color => {
                                    const palette = createPalette({primary: {main: themeColorMap[color.value]}});
                                    return (
                                        <MenuItem
                                            key={color.value}
                                            value={color.value}
                                            sx={{
                                                backgroundColor: `${themeColorMap[color.value]} !important`,
                                                color: `${palette.primary.contrastText} !important`
                                            }}
                                        >
                                            {color.label}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === "cardList"}
                onChange={handleExpandedChange("cardList")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        卡牌列表设置
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormControlLabel
                        control={
                            <Checkbox
                                defaultChecked={config.disableCardCover}
                                onChange={e => {
                                    setConfig({
                                        disableCardCover: e.target.checked,
                                    })
                                }}
                            />}
                        label="不显示卡图"
                    />
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default Setting;

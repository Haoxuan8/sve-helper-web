import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, Grid} from "@mui/material";
import MainButton from "@/view/home/MainButton";
import StyleIcon from "@mui/icons-material/Style";
import SettingsIcon from "@mui/icons-material/Settings";

export type HomeProps = {} & NativeProps;

const defaultProps = {};

const Home: FC<HomeProps> = (p) => {
    const props = mergeProps(defaultProps, p);

    return withNativeProps(
        props,
        <Box sx={{my: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <MainButton
                        Icon={StyleIcon}
                        title="卡牌列表"
                        desc="查询卡牌、点击卡牌查看卡牌详情（关联QA、关联卡牌、实时价格）"
                        path="/card-list"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MainButton
                        Icon={SettingsIcon}
                        title="设置"
                        desc="各种设置、配置（待扩充）"
                        path="/setting"
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home;

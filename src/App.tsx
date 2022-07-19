import React, {FC, useMemo, useState} from "react";
import {
    AppBar,
    Box,
    Button, Container, Fab,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import HideOnScroll from "@/component/hideonscroll/HideOnScroll";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HomeIcon from '@mui/icons-material/Home';
import config from "@/config";
import getLazyComp from "@/util/getLazyComp";
import {Navigate, Route, Routes, useNavigate} from "react-router";
import _ from "lodash";
import skin1 from "@/asset/image/skin1.png";
import BackTop from "@/component/backtop/BackTop";
import MenuDrawer from "@/MenuDrawer";

export type AppProps = {}

const App: FC<AppProps> = props => {

    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const routeComps = useMemo(() => {
        return _.map(config.routes, route => {
            const Comp = getLazyComp(route.component);

            return (
                <Route
                    key={route.key}
                    path={`${route.key}/*`}
                    element={<Comp />}
                />
            )
        })
    }, []);

    return (
        <div id="app">
            <HideOnScroll>
                <AppBar>
                    <Toolbar className="transition-colors">
                        <IconButton
                            color="inherit"
                            aria-label="menu"
                            edge="start"
                            sx={{mr: 2}}
                            onClick={() => setMenuVisible(true)}
                        >
                            <MenuIcon sx={{fontSize: 28}} />
                        </IconButton>
                        <Typography
                            sx={{flexGrow: 1}}
                            variant="h6"
                            component="div"
                        >
                            SVEApp
                        </Typography>
                        <IconButton
                            color="inherit"
                            edge="end"
                            onClick={() => navigate("/home")}
                        >
                            <HomeIcon sx={{fontSize: 28}} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <div
                className="bg-auto bg-top min-h-screen py-0.5"
                style={{backgroundImage: `url(${skin1})`}}
            >
                <Toolbar id="back-to-top-anchor" />
                <Container maxWidth="lg">
                    <Routes>
                        {routeComps}
                        <Route
                            key="/"
                            path="/"
                            element={<Navigate
                                replace
                                to="/home"
                            />}
                        />
                    </Routes>
                </Container>
            </div>
            <MenuDrawer
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
            />
            <BackTop>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </BackTop>
        </div>
    )
}

export default App;

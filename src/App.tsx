import React, {FC, useMemo} from "react";
import {
    AppBar,
    Box,
    Button, Container,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";
import HideOnScroll from "@/component/hideonscroll/HideOnScroll";
import MenuIcon from "@mui/icons-material/Menu";
import config from "@/config";
import getLazyComp from "@/util/getLazyComp";
import {Navigate, Route, Routes} from "react-router";
import _ from "lodash";
import skin1 from "@/asset/image/skin1.png";

export type AppProps = {}

const App: FC<AppProps> = props => {

    const routeComps = useMemo(() => {
        return _.map(config.menus, route => {
            const Comp = getLazyComp(route.component);

            return (
                <Route
                    key={route.key}
                    path={route.key}
                    element={<Comp />}
                />
            )
        })
    }, []);

    return (
        <div id="app">
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography
                            sx={{flexGrow: 1}}
                            variant="h6"
                            component="div"
                        >
                            SHADOWVERSE
                        </Typography>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-label="menu"
                            sx={{display: {md: "none"}}}
                        >
                            <MenuIcon sx={{fontSize: 32}} />
                        </IconButton>
                        <Box sx={{display: {xs: "none", md: "flex"}}}>
                            {
                                config.menus.map(it => {
                                    return (
                                        <Button
                                            key={it.key}
                                            onClick={() => {
                                            }}
                                            sx={{color: "white",}}
                                        >
                                            <Typography
                                                variant="h6"
                                                component="div"
                                            >
                                                {it.name}
                                            </Typography>
                                        </Button>
                                    )
                                })
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <div
                className="bg-auto bg-top min-h-screen"
                style={{backgroundImage: `url(${skin1})`}}
            >
                <Toolbar />
                <Container maxWidth="lg">
                    <Routes>
                        {routeComps}
                        <Route
                            key="/"
                            path="/"
                            element={<Navigate
                                replace
                                to={`/${_.head(config.menus)?.key}`}
                            />}
                        />
                    </Routes>
                </Container>
            </div>
        </div>
    )
}

export default App;
